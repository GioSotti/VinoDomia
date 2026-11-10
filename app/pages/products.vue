<script setup lang="ts">
import {ref} from "vue";

const modalCreationProduct = ref(false);

const value = ref("");

const modalProductsDetails = ref({
  id: 0,
  reference: "",
  family: "",
  suppliers: "",
  designation: "",
  description: "",
  priceWithoutTax: 0,
  x: false,
  bio: false,
  barCode: "",
  internalBarCode: "",
  tva: 0.0,
});

const products = ref([
  {
    id: 1,
    reference: "PROD001",
    family: "Vin AOC Corbieres Rouge",
    suppliers: "Domaine de la Dourbie",
    designation: "Chateau de la Dourbie Corbieres Rouge 2018 - 75cl",
    description: "Un vin rouge puissant et fruité, avec des arômes de fruits rouges et d'épices, idéal pour accompagner les plats de viande.",
    priceWithoutTax: 12.50,
    x: false,
    bio: true,
    barCode: "1234567890123",
    internalBarCode: "9876543210987",
    tva: 20.0,
  },
  {
    id: 2,
    reference: "PROD002",
    family: "Vin AOC Corbieres Rouge",
    suppliers: "Domaine de la Dourbie",
    designation: "Chateau de la Dourbie Corbieres Rouge 2019 - 75cl",
    description: "Un vin rouge élégant et équilibré, avec des notes de fruits rouges et une légère touche de vanille, parfait pour accompagner les plats de viande.",
    priceWithoutTax: 14.00,
    x: false,
    bio: true,
    barCode: "1234567890124",
    internalBarCode: "9876543210988",
    tva: 20.0,
  },
  {
    id: 3,
    reference: "PROD003",
    family: "Vin AOC Corbieres Rouge",
    suppliers: "Domaine de la Dourbie",
    designation: "Chateau de la Dourbie Corbieres Rouge 2020 - 75cl",
    description: "Un vin rouge frais et fruité, avec des arômes de fruits rouges et une légère acidité, idéal pour accompagner les plats de viande.",
    priceWithoutTax: 13.00,
    x: false,
    bio: true,
    barCode: "1234567890125",
    internalBarCode: "9876543210989",
    tva: 20.0,
  },
  {
    id: 4,
    reference: "PROD004",
    family: "Vin AOC Corbieres Rouge",
    suppliers: "Domaine de la Dourbie",
    designation: "Chateau de la Dourbie Corbieres Rouge 2021 - 75cl",
    description: "Un vin rouge léger et fruité, avec des notes de fruits rouges et une légère acidité, parfait pour accompagner les plats de viande.",
    priceWithoutTax: 11.50,
    x: false,
    bio: true,
    barCode: "1234567890126",
    internalBarCode: "9876543210990",
    tva: 20.0,
  },
  {
    id: 5,
    reference: "PROD005",
    family: "Vin AOC Corbieres Rouge",
    suppliers: "Domaine de la Dourbie",
    designation: "Chateau de la Dourbie Corbieres Rouge 2022 - 75cl",
    description: "Un vin rouge frais et fruité, avec des arômes de fruits rouges et une légère acidité, idéal pour accompagner les plats de viande.",
    priceWithoutTax: 12.00,
    x: false,
    bio: true,
    barCode: "1234567890127",
    internalBarCode: "9876543210991",
    tva: 20.0,
  }
]);

const openModal = (product: {
  id: number;
  reference: string;
  family: string;
  suppliers: string;
  designation: string;
  description: string;
  priceWithoutTax: number;
  x: boolean;
  bio: boolean;
  barCode: string;
  internalBarCode: string;
  tva: number;
}) => {
  modalProductsDetails.value = JSON.parse(JSON.stringify(product));
  modalCreationProduct.value = true;
}

const closeModal = () => {
  modalCreationProduct.value = false;
  modalProductsDetails.value = {
    id: 0,
    reference: "",
    family: "",
    suppliers: "",
    designation: "",
    description: "",
    priceWithoutTax: 0,
    x: false,
    bio: false,
    barCode: "",
    internalBarCode: "",
    tva: 0.0,
  };
}

const deleteClient = (productId: number) => {
  products.value = products.value.filter(product => product.id !== productId);
}

const saveProduct = () => {
  const existingProductIndex = products.value.findIndex(product => product.id === modalProductsDetails.value.id);
  if (existingProductIndex !== -1) {
    products.value[existingProductIndex] = {...modalProductsDetails.value};
  } else {
    products.value.push({...modalProductsDetails.value});
    families.value.push(modalProductsDetails.value.family);
    suppliers.value.push(modalProductsDetails.value.suppliers);
  }
  closeModal();
}

const families = ref([...new Set(products.value.map(product => product.family))]);
const suppliers = ref([...new Set(products.value.map(product => product.suppliers))]);

const fields = reactive({
  first: '',
})

</script>

<template>
  <AppOverlay :focus-page="0" :focus-under-page="3">
    <!-- Page content -->
    <div class="flex flex-col w-full p-8 gap-5 h-full">
      <h1 class="text-black font-bold text-3xl">Produits</h1>
      <!-- Search and filters -->
      <BaseCard variant="none" rounded="md"
                class="px-5 py-4 bg-white border border-gray-300/50 flex flex-col w-full h-150 gap-2">
        <!-- BaseCard Upper Part -->
        <div class="flex flex-row w-full gap-5 items-center mb-2">
          <!-- Search Bar -->
          <BaseInput
              v-model="value"
              rounded="md"
              placeholder="Rechercher un client..."
          />
          <BaseButton size="md" variant="primary" class="w-fit flex gap-2">
            <Icon name="ic:baseline-search" class="size-5"/>
            Rechercher
          </BaseButton>
          <span class="h-full w-0.5 bg-gray-500"></span>
          <BaseButton size="md" variant="primary" class="w-fit flex"
                      @click="modalCreationProduct = !modalCreationProduct">
            <Icon name="ic:round-add-circle-outline" class="size-5"/>
            Ajouter un produit
          </BaseButton>
        </div>
        <div class="flex flex-row w-full gap-4 items-center mb-6">
          <!-- Filters -->
          <div class="flex flex-col w-full">
            <label for="family" class="font-semibold">Famille</label>
            <BaseAutocomplete placeholder="Ex: nom de la famille" v-model="fields.first" id="family">
              <BaseAutocompleteItem v-for="item in families" :key="item" :value="item">
                {{ item }}
              </BaseAutocompleteItem>
            </BaseAutocomplete>
          </div>
          <div class="flex flex-col w-full">
            <label for="suppliers" class="font-semibold">Fournisseurs</label>
            <BaseAutocomplete placeholder="Ex: nom des fournisseurs" v-model="fields.first" id="suppliers">
              <BaseAutocompleteItem v-for="item in suppliers" :key="item" :value="item">
                {{ item }}
              </BaseAutocompleteItem>
            </BaseAutocomplete>
          </div>
        </div>
        <span class="w-full h-0.5 bg-gray-300 mb-5"></span>
        <!-- BaseCard Lower Part -->
        <div class="flex flex-col w-full gap-3 overflow-y-auto flex-1">
          <!-- Table Header -->
          <div
              class="grid grid-cols-[1fr_2fr_2fr_3fr_1fr_1fr_auto] gap-4 px-4 py-2 bg-gray-100 font-semibold text-sm text-gray-700 text-center">
            <div>Référence</div>
            <div>Famille</div>
            <div>Prix HT (€)</div>
            <div>TVA</div>
            <div>X</div>
            <div>Bio</div>
            <div>Actions</div>
          </div>

          <div v-for="(product, key) in products" :key="key" class="flex flex-col w-full">
            <!-- Table Row -->
            <div
                class="grid grid-cols-[1fr_2fr_2fr_3fr_1fr_1fr_auto] gap-4 px-4 py-3 items-center hover:bg-gray-50 cursor-pointer transition-colors text-center">
              <!-- Product details -->
              <div class="text-sm font-medium">{{ product.reference }}</div>
              <div class="text-sm">{{ product.family }}</div>
              <div class="text-sm">{{ product.priceWithoutTax.toFixed(2) }}€</div>
              <div class="text-sm">{{ product.tva }}%</div>
              <BaseCheckbox
                  v-model="product.x"
              />
              <BaseCheckbox
                  v-model="product.bio"
              />
              <div class="flex gap-2">
                <!-- Edit and Delete buttons -->
                <BaseButton size="sm" variant="primary" @click.stop="openModal(product)">
                  <Icon name="ic:baseline-edit" class="size-4"/>
                </BaseButton>
                <BaseButton size="sm" variant="destructive" @click.stop="deleteClient(product.id)">
                  <Icon name="ic:baseline-delete" class="size-4"/>
                </BaseButton>
              </div>
            </div>
            <div class="w-full h-px bg-gray-300" :class="{ 'hidden': key === products.length-1 }"></div>
          </div>
        </div>
        <AppModal :is-visible="modalCreationProduct" @close-modal="closeModal" @save-modal="saveProduct">
          <div class="flex flex-col w-full h-full gap-4 overflow-auto px-4 py-2">
            <!-- Modal content -->
            <h2 class="text-black font-bold text-2xl mb-4">Créer / modifier un nouveau produit</h2>
            <div class="flex flex-col gap-4 text-black">
              <div class="flex flex-row w-full gap-2 items-center">
                <!-- Reference and Family -->
                <div class="flex flex-col w-full">
                  <label for="reference">Référence :</label>
                  <BaseInput placeholder="PROD000" rounded="md" id="reference"
                             v-model="modalProductsDetails.reference"/>
                </div>
              </div>
              <div class="flex flex-row w-full gap-2 items-center">
                <div class="flex flex-col w-full gap-2">
                  <label for="family">Famille :</label>
                  <BaseInput placeholder="VIN" rounded="md" id="family"
                             v-model="modalProductsDetails.family"/>
                </div>
                <div class="flex flex-col w-full gap-2">
                  <label for="suppliers">Fournisseur :</label>
                  <BaseInput placeholder="INTERNE" rounded="md" id="suppliers"
                             v-model="modalProductsDetails.suppliers"/>
                </div>
              </div>
              <label for="designation">Désignation :</label>
              <BaseInput placeholder="CHATEAU MONTFIN" rounded="md" id="designation"
                         v-model="modalProductsDetails.designation"/>
              <div class="flex flex-row w-full gap-2 items-center">
                <div class="flex flex-col gap-2 w-full">
                  <label for="priceWithoutTax">Prix HT (€) :</label>
                  <BaseInputNumber placeholder="10" rounded="md" id="priceWithoutTax"
                                   v-model="modalProductsDetails.priceWithoutTax"/>
                </div>
                <div class="flex flex-col w-full gap-2">
                  <label for="tva">TVA :</label>
                  <BaseInputNumber placeholder="10.0" rounded="md" id="tva" v-model="modalProductsDetails.tva"
                                   :step="0.5"/>
                </div>
                <div class="flex flex-col w-full gap-4 items-center">
                  <label for="totalPrice">Prix TTC (€) :</label>
                  <h3 class="font-semibold" id="totalPrice">
                    {{ (modalProductsDetails.priceWithoutTax * (1 + modalProductsDetails.tva / 100)).toFixed(2) }}</h3>
                </div>
              </div>
              <div class="flex flex-row w-full gap-2 justify-between">
                <div class="flex flex-col gap-2 w-1/2">
                  <label for="barCode">Code Bar :</label>
                  <BaseInput placeholder="0123456789" rounded="md" id="barCode"
                             v-model="modalProductsDetails.barCode"/>
                  <h3 class="libre-barcode-128-regular text-6xl text-center">
                    {{
                      parseInt(modalProductsDetails.barCode) > 99999999999999999n ? 99999999999999999n : modalProductsDetails.barCode
                    }}</h3>
                </div>
                <div class="flex flex-col gap-2 w-1/2">
                  <label for="internalBarCode">Code bar interne :</label>
                  <BaseInput placeholder="9876543210" rounded="md" id="internalBarCode"
                             v-model="modalProductsDetails.internalBarCode"/>
                  <h3 class="libre-barcode-128-regular text-6xl text-center">
                    {{
                      parseInt(modalProductsDetails.internalBarCode) > 99999999999999999n ? 99999999999999999n : modalProductsDetails.internalBarCode
                    }}</h3>
                </div>
              </div>
            </div>
          </div>
          <!-- Modal actions (need to be implemented) -->
          <BaseButton class="w-full">Imprimer</BaseButton>
        </AppModal>
      </BaseCard>
    </div>
  </AppOverlay>
</template>

<style scoped>

</style>