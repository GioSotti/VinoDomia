<script setup lang="ts">
import type {TableColumn} from "~/utils/table";
import {ORDER_STATUS_TONE, type OrderStatus} from "~/utils/status";

const supplier = ref([
  {
    id: 0,
    name: "Fournisseur A",
    phone: "0612345678",
    postalAddress: "123 Rue de la Paix, 75001 Paris",
    email: "fournisseurA@mail.com"
  }, {
    id: 1,
    name: "Fournisseur B",
    phone: "0698765432",
    postalAddress: "456 Avenue des Champs, 69001 Lyon",
    email: "fournisseurB@mail.com"
  },
  {
    id: 2,
    name: "Fournisseur C",
    phone: "0687654321",
    postalAddress: "789 Boulevard de la Mer, 13001 Marseille",
    email: "fournisseurC@mail.com"
  }]);

const destinations = ref([
  {
    id: 0,
    name: "Entrepôt A",
    address: "123 Rue de la Paix, 75001 Paris"
  },
  {
    id: 1,
    name: "Entrepôt B",
    address: "456 Avenue des Champs, 69001 Lyon"
  },
  {
    id: 2,
    name: "Entrepôt C",
    address: "789 Boulevard de la Mer, 13001 Marseille"
  }
]);

const itemsList = ref<{ id: number; name: string; price: number }[]>([
  {id: 0, name: "Produit 1", price: 50},
  {id: 1, name: "Produit 2", price: 100},
  {id: 2, name: "Produit 3", price: 75},
  {id: 3, name: "Produit 4", price: 150},
  {id: 4, name: "Produit 5", price: 40},
  {id: 5, name: "Produit 6", price: 120},
  {id: 6, name: "Produit 7", price: 60}
]);

const itemValue = ref(itemsList.value[0]!
);

const purchaseOrders = ref([
  {
    id: 1,
    supplier: supplier.value[0]?.name ?? "Nom innaccessible",
    date: '2024-06-01',
    total: 0,
    status: 'En cours',
    destination: destinations.value[0] ?? {id: 0, name: "Destination innaccessible", address: "Adresse innaccessible"},
    items: [
      {
        quantity: 4,
        item: itemsList.value[0]!
      },
      {
        quantity: 1,
        item: itemsList.value[1]!
      }
    ]
  },
  {
    id: 2,
    supplier: supplier.value[1]?.name ?? "Nom innaccessible",
    date: '2024-06-05',
    total: 0,
    status: 'Livré',
    destination: destinations.value[1] ?? {id: 0, name: "Destination innaccessible", address: "Adresse innaccessible"},
    items: [
      {
        quantity: 4,
        item: itemsList.value[2]!
      },
      {
        quantity: 3,
        item: itemsList.value[3]!
      }
    ]
  },
  {
    id: 3,
    supplier: supplier.value[2]?.name ?? "Nom innaccessible",
    date: '2024-06-10',
    total: 0,
    status: 'Annulé',
    destination: destinations.value[2] ?? {id: 0, name: "Destination innaccessible", address: "Adresse innaccessible"},
    items: [
      {
        quantity: 2,
        item: itemsList.value[4]!
      },
      {
        quantity: 3,
        item: itemsList.value[5]!
      },
      {
        quantity: 1,
        item: itemsList.value[6]!
      }
    ]
  }
]);

purchaseOrders.value = purchaseOrders.value.map(purchaseOrder => {
  const total = purchaseOrder.items.reduce((acc, entry) => acc + entry.quantity * entry.item.price, 0);
  return {...purchaseOrder, total};
});

type ItemEntry = {
  quantity: number;
  item: { id: number; name: string; price: number };
};

const modalClientDetails = ref<{
  id: number;
  supplier: string;
  date: string;
  total: number;
  status: string;
  destination: { id: number; name: string; address: string };
  items: ItemEntry[];
}>({
  id: 0,
  supplier: '',
  date: '',
  total: 0,
  status: '',
  destination: {
    id: 0,
    name: "",
    address: "",
  },
  items: []
});

const modalCreationPurchaseOrder = ref(false);

const query = ref("");

const columns: TableColumn[] = [
  {key: "id", label: "N°"},
  {key: "supplier", label: "Fournisseur"},
  {key: "date", label: "Date", hideBelow: "md"},
  {key: "items", label: "Articles", align: "right", hideBelow: "lg"},
  {key: "status", label: "Statut"},
  {key: "total", label: "Total", align: "right"},
];

const filteredOrders = computed(() => filterRows(purchaseOrders.value, query.value, ["supplier", "status", "date"]));

const isEditing = computed(() => purchaseOrders.value.some(o => o.id === modalClientDetails.value.id));

const orderNumber = (id: number) => `BC-${String(id).padStart(4, "0")}`;
const itemCount = (items: ItemEntry[]) => items.reduce((acc, entry) => acc + entry.quantity, 0);
const modalTotal = computed(() => modalClientDetails.value.items.reduce((acc, e) => acc + e.quantity * e.item.price, 0));

const newOrder = () => {
  closeModal();
  modalClientDetails.value.status = "En cours";
  modalCreationPurchaseOrder.value = true;
};

const openModal = (client: {
  id: number;
  supplier: string;
  date: string;
  total: number;
  status: string;
  destination: {
    id: number;
    name: string;
    address: string;
  };
  items: ItemEntry[];
}) => {
  const cloned: any = JSON.parse(JSON.stringify(client));
  cloned.items = (cloned.items || []).map((entry: any) => ({
    quantity: (entry && typeof entry.quantity === 'number') ? entry.quantity : 1,
    item: entry.item
  }));
  modalClientDetails.value = cloned;
  modalCreationPurchaseOrder.value = true;
}

const closeModal = () => {
  modalCreationPurchaseOrder.value = false;
  modalClientDetails.value = {
    id: Math.max(0, ...purchaseOrders.value.map(o => o.id)) + 1,
    supplier: '',
    date: '',
    total: 0,
    status: '',
    destination: {
      id: 0,
      name: "",
      address: "",
    },
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
  purchaseOrders.value = purchaseOrders.value.map(purchaseOrder => {
    const total = purchaseOrder.items.reduce((acc, entry) => acc + entry.quantity * entry.item.price, 0);
    return {...purchaseOrder, total};
  });
}

const addItem = () => {
  modalClientDetails.value.items.push({quantity: 1, item: itemValue.value!});
}

const removeItemAt = (index: number) => {
  modalClientDetails.value.items.splice(index, 1);
}
</script>

<template>
  <AppOverlay>
    <AppPage eyebrow="Cave" title="Bons de commande">
      <template #actions>
        <AppButton icon="plus" @click="newOrder">Nouveau bon de commande</AppButton>
      </template>

      <AppTable :columns="columns" :rows="filteredOrders" :row-key="o => o.id"
                :count-label="['bon de commande', 'bons de commande']" empty-label="Aucun bon de commande ne correspond à la recherche.">
        <template #toolbar>
          <AppSearchField v-model="query" placeholder="Rechercher un fournisseur, un statut…" class="max-w-[460px]"/>
        </template>
        <template #cell-id="{ row }">
          <span class="text-[13px] font-medium text-taupe">{{ orderNumber(row.id) }}</span>
        </template>
        <template #cell-supplier="{ row }">
          <div class="flex flex-col">
            <span class="font-medium">{{ row.supplier }}</span>
            <span class="text-[13px] text-taupe">{{ row.destination.name }}</span>
          </div>
        </template>
        <template #cell-date="{ row }">
          <span class="whitespace-nowrap text-brun tabular-nums">{{ formatDate(row.date) }}</span>
        </template>
        <template #cell-items="{ row }">
          <span class="text-brun tabular-nums">{{ itemCount(row.items) }}</span>
        </template>
        <template #cell-status="{ row }">
          <AppBadge :tone="ORDER_STATUS_TONE[row.status as OrderStatus] ?? 'neutre'">{{ row.status }}</AppBadge>
        </template>
        <template #cell-total="{ row }">
          <span class="whitespace-nowrap font-medium tabular-nums">{{ formatEuro(row.total) }}</span>
        </template>
        <template #actions="{ row }">
          <AppIconButton icon="pencil" label="Modifier" @click="openModal(row)"/>
          <AppIconButton icon="trash" label="Supprimer" tone="danger" @click="deletePurchaseOrder(row.id)"/>
        </template>
      </AppTable>
    </AppPage>

    <AppModal :is-visible="modalCreationPurchaseOrder"
              :title="isEditing ? `Bon de commande ${orderNumber(modalClientDetails.id)}` : 'Nouveau bon de commande'"
              @close-modal="closeModal" @save-modal="savePurchaseOrder">
      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-4 sm:flex-row">
          <AppField label="Fournisseur">
            <BaseSelect v-model="modalClientDetails.supplier" placeholder="Choisir un fournisseur…">
              <BaseSelectItem v-for="s in supplier" :key="s.id" :value="s.name">{{ s.name }}</BaseSelectItem>
            </BaseSelect>
          </AppField>
          <AppField label="Date" class="sm:max-w-48">
            <BaseInput v-model="modalClientDetails.date" type="date" rounded="md"/>
          </AppField>
        </div>
        <div class="flex flex-col gap-4 sm:flex-row">
          <AppField label="Destination">
            <BaseSelect v-model="modalClientDetails.destination" placeholder="Choisir une destination…">
              <BaseSelectItem v-for="destination in destinations" :key="destination.id" :value="destination">
                {{ destination.name }} - {{ destination.address }}
              </BaseSelectItem>
            </BaseSelect>
          </AppField>
          <AppField label="Statut" class="sm:max-w-48">
            <BaseSelect v-model="modalClientDetails.status" placeholder="Statut…">
              <BaseSelectItem value="En cours">En cours</BaseSelectItem>
              <BaseSelectItem value="Livré">Livré</BaseSelectItem>
              <BaseSelectItem value="Annulé">Annulé</BaseSelectItem>
            </BaseSelect>
          </AppField>
        </div>

        <div class="flex flex-col gap-3 pt-2">
          <h3 class="m-0 font-serif text-lg font-normal">Articles</h3>
          <div class="flex flex-col gap-3 sm:flex-row">
            <BaseSelect v-model="itemValue" placeholder="Choisir un produit…" class="w-full">
              <BaseSelectItem v-for="item in itemsList" :key="item.id" :value="item">
                {{ item.name }} - {{ formatEuro(item.price) }}
              </BaseSelectItem>
            </BaseSelect>
            <AppButton variant="secondary" icon="plus" @click="addItem">Ajouter</AppButton>
          </div>

          <div class="overflow-hidden rounded-[10px] border border-lin">
            <p v-if="modalClientDetails.items.length === 0" class="m-0 px-4 py-6 text-center text-sm text-taupe">
              Aucun article pour l'instant.
            </p>
            <div v-for="(entry, key) in modalClientDetails.items" :key="key"
                 class="flex flex-wrap items-center gap-3 border-t border-lin px-4 py-3 first:border-t-0">
              <div class="flex min-w-0 flex-[1_1_160px] flex-col">
                <span class="font-medium">{{ entry.item.name }}</span>
                <span class="text-[13px] text-taupe">{{ formatEuro(entry.item.price) }} l'unité</span>
              </div>
              <div class="w-28">
                <BaseInputNumber v-model="entry.quantity" rounded="md" placeholder="Qté" :min="1" aria-label="Quantité"/>
              </div>
              <span class="w-24 text-right font-medium tabular-nums">{{ formatEuro(entry.item.price * entry.quantity) }}</span>
              <AppIconButton icon="trash" label="Retirer l'article" tone="danger" @click="removeItemAt(key)"/>
            </div>
            <div v-if="modalClientDetails.items.length" class="flex justify-between border-t border-lin bg-ivoire px-4 py-3">
              <span class="text-sm font-medium uppercase tracking-[0.12em] text-taupe">Total</span>
              <span class="font-serif text-xl tabular-nums">{{ formatEuro(modalTotal) }}</span>
            </div>
          </div>
        </div>
      </div>
    </AppModal>
  </AppOverlay>
</template>
