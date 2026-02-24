<script setup lang="ts">
import {ref} from "vue";
import {parsePrice} from "~/utils/parsePriceUtils";

const purchaseOrders = ref([
  {
    id: 1,
    supplier: 'Fournisseur A',
    date: '2024-06-01',
    total: 1500.01,
    status: 'En cours',
    items: [
      {name: 'Produit 1', quantity: 10, price: 50},
      {name: 'Produit 2', quantity: 5, price: 100}
    ]
  },
  {
    id: 2,
    supplier: 'Fournisseur B',
    date: '2024-06-05',
    total: 2500.50,
    status: 'Livré',
    items: [
      {name: 'Produit 3', quantity: 20, price: 75},
      {name: 'Produit 4', quantity: 10, price: 150}
    ]
  },
  {
    id: 3,
    supplier: 'Fournisseur C',
    date: '2024-06-10',
    total: 1000.00,
    status: 'Annulé', items: [{
      name: 'Produit 5', quantity: 15, price: 40
    }, {
      name: 'Produit 6', quantity: 8, price: 120
    }, {
      name: 'Produit 7', quantity: 12, price: 60
    }]
  }
]);

const modalClientDetails = ref({
  id: 0,
  supplier: '',
  date: '',
  total: 0,
  status: '',
  items: []
});

const modalCreationPurchaseOrder = ref(false);

const value = ref("");

const openModal = (client: {
  id: number;
  supplier: string;
  date: string;
  total: number;
  status: string;
  items: { name: string; quantity: number; price: number }[];
}) => {
  modalClientDetails.value = JSON.parse(JSON.stringify(client));
  modalCreationPurchaseOrder.value = true;
}

const closeModal = () => {
  modalCreationPurchaseOrder.value = false;
  modalClientDetails.value = {
    id: purchaseOrders.value.length,
    supplier: '',
    date: '',
    total: 0,
    status: '',
    items: []
  };
}

const deletePurchaseOrder = (purchaseOrderId: number) => {
  purchaseOrders.value = purchaseOrders.value.filter(purchaseOrder => purchaseOrder.id !== purchaseOrderId);
}

const savePurchaseOrder = () => {
  const existingClientIndex = purchaseOrders.value.findIndex(purchaseOrder => purchaseOrder.id === modalClientDetails.value.id);
  if (existingClientIndex !== -1) {
    purchaseOrders.value[existingClientIndex] = {...modalClientDetails.value};
  } else {
    purchaseOrders.value.push({...modalClientDetails.value});
  }
  closeModal();
}

</script>

<template>
  <Overlay :focus-page="0" :focus-under-page="2">
    <!-- Page content -->
    <div class="flex flex-col w-full p-8 gap-5 h-full">
      <h1 class="text-black font-bold text-3xl">Bon de commande</h1>
      <BaseCard variant="none" rounded="md"
                class="px-5 py-4 bg-white border border-gray-300/50 flex flex-col w-full h-150 gap-2">
        <div class="flex flex-row w-full gap-4 items-center mb-6">
          <BaseInput
              v-model="value"
              rounded="md"
              placeholder="Rechercher un bon de commande..."
          />
          <BaseButton size="md" variant="primary" class="w-fit flex gap-2">
            <Icon name="ic:baseline-search" class="size-5"/>
            Rechercher
          </BaseButton>
          <span class="h-full w-0.5 bg-gray-500"></span>
          <BaseButton size="md" variant="primary" class="w-fit flex"
                      @click="modalCreationPurchaseOrder = !modalCreationPurchaseOrder">
            <Icon name="ic:round-add-circle-outline" class="size-5"/>
            Ajouter un client
          </BaseButton>
        </div>
        <span class="w-full h-px bg-gray-300"></span>
        <div class="flex flex-col gap-4 text-black overflow-auto w-full">
          <div v-for="(purchaseOrder) in purchaseOrders" :key="purchaseOrder.id"
               class="flex flex-col w-full justify-between">
            <div class="flex flex-row w-full gap-4 items-center justify-between pr-2">
              <div class="flex flex-col">
                <h3 class="text-black font-light">Fournisseurs :</h3>
                <h2 class="text-black">{{ purchaseOrder.supplier }}</h2>
              </div>
              <div class="flex flex-col">
                <h3 class="text-black font-light">Date :</h3>
                <h2 class="text-black">{{ purchaseOrder.date }}</h2>
              </div>
              <div class="flex flex-col">
                <h3 class="text-black font-light">Total : </h3>
                <h2 class="text-black">{{ parsePrice(purchaseOrder.total, "€") }}</h2>
              </div>
              <div class="flex flex-col">
                <h3 class="text-black font-light">Status :</h3>
                <h2 class="text-black">{{ purchaseOrder.status }}</h2>
              </div>
              <div class="flex flex-col">
                <h3 class="text-black font-light">Items :</h3>
                <h2>{{ purchaseOrder.items?.length }}</h2>
              </div>
              <div class="flex flex-row gap-2">
                <BaseButton size="sm" variant="primary" @click.stop="openModal(purchaseOrder)">
                  <Icon name="ic:baseline-edit" class="size-4"/>
                </BaseButton>
                <BaseButton size="sm" variant="destructive" @click.stop="deletePurchaseOrder(purchaseOrder.id)">
                  <Icon name="ic:baseline-delete" class="size-4"/>
                </BaseButton>
              </div>
            </div>
          </div>
        </div>
      </BaseCard>
    </div>
  </Overlay>
  <Modal :is-visible="modalCreationPurchaseOrder" @close-modal="closeModal" @save-modal="savePurchaseOrder"
         :firstButtonText="'Save'" :secondButtonText="'Cancel'">
    <div class="flex flex-col w-full h-140 gap-4 overflow-auto px-4 py-2">
      <h2 class="text-black font-bold text-2xl mb-4">Créer un nouveau bon de commande</h2>

    </div>
  </Modal>
</template>

<style scoped>

</style>