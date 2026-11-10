<script setup lang="ts">
import type {TableColumn} from "~/utils/table";

const modalCreationProduct = ref(false);

const query = ref("");

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

const familyFilter = ref("");
const supplierFilter = ref("");

const columns: TableColumn[] = [
  {key: "reference", label: "Référence"},
  {key: "designation", label: "Désignation"},
  {key: "suppliers", label: "Fournisseur", hideBelow: "xl"},
  {key: "priceWithoutTax", label: "Prix HT", align: "right"},
  {key: "tva", label: "TVA", align: "right", hideBelow: "lg"},
  {key: "priceWithTax", label: "Prix TTC", align: "right", hideBelow: "md"},
  {key: "bio", label: "Bio", align: "center", hideBelow: "md"},
];

const filteredProducts = computed(() =>
    filterRows(products.value, query.value, ["reference", "designation", "family", "suppliers", "barCode"])
        .filter(product => !familyFilter.value || product.family === familyFilter.value)
        .filter(product => !supplierFilter.value || product.suppliers === supplierFilter.value)
);

const isEditing = computed(() => products.value.some(p => p.id === modalProductsDetails.value.id));

const priceWithTax = (price: number, tva: number) => price * (1 + tva / 100);

const newProduct = () => {
  closeModal();
  modalProductsDetails.value.id = Math.max(0, ...products.value.map(p => p.id)) + 1;
  modalProductsDetails.value.tva = 20;
  modalCreationProduct.value = true;
};

</script>

<template>
  <AppOverlay>
    <AppPage eyebrow="Cave" title="Produits">
      <template #actions>
        <AppButton icon="plus" @click="newProduct">Ajouter un produit</AppButton>
      </template>

      <AppTable :columns="columns" :rows="filteredProducts" :row-key="p => p.id"
                :count-label="['produit', 'produits']" empty-label="Aucun produit ne correspond aux filtres.">
        <template #toolbar>
          <AppSearchField v-model="query" placeholder="Rechercher une référence, un vin, un code-barres…" class="max-w-[460px]"/>
          <div class="flex flex-[1_1_320px] flex-wrap gap-3 sm:justify-end">
            <label class="sr-only" for="family-filter">Famille</label>
            <select id="family-filter" v-model="familyFilter"
                    class="h-11 min-w-0 flex-1 cursor-pointer rounded-[10px] border border-lin bg-papier px-3 text-[15px] text-encre sm:max-w-64">
              <option value="">Toutes les familles</option>
              <option v-for="family in families" :key="family" :value="family">{{ family }}</option>
            </select>
            <label class="sr-only" for="supplier-filter">Fournisseur</label>
            <select id="supplier-filter" v-model="supplierFilter"
                    class="h-11 min-w-0 flex-1 cursor-pointer rounded-[10px] border border-lin bg-papier px-3 text-[15px] text-encre sm:max-w-64">
              <option value="">Tous les fournisseurs</option>
              <option v-for="supplier in suppliers" :key="supplier" :value="supplier">{{ supplier }}</option>
            </select>
          </div>
        </template>
        <template #cell-reference="{ row }">
          <span class="text-[13px] font-medium text-taupe">{{ row.reference }}</span>
        </template>
        <template #cell-designation="{ row }">
          <div class="flex min-w-56 flex-col">
            <span class="font-medium">{{ row.designation }}</span>
            <span class="text-[13px] text-taupe">{{ row.family }}</span>
          </div>
        </template>
        <template #cell-suppliers="{ row }">
          <span class="whitespace-nowrap text-brun">{{ row.suppliers }}</span>
        </template>
        <template #cell-priceWithoutTax="{ row }">
          <span class="whitespace-nowrap font-medium tabular-nums">{{ formatEuro(row.priceWithoutTax) }}</span>
        </template>
        <template #cell-tva="{ row }">
          <span class="whitespace-nowrap text-brun tabular-nums">{{ row.tva }} %</span>
        </template>
        <template #cell-priceWithTax="{ row }">
          <span class="whitespace-nowrap tabular-nums">{{ formatEuro(priceWithTax(row.priceWithoutTax, row.tva)) }}</span>
        </template>
        <template #cell-bio="{ row }">
          <AppBadge v-if="row.bio" tone="succes">Bio</AppBadge>
          <span v-else class="text-taupe">—</span>
        </template>
        <template #actions="{ row }">
          <AppIconButton icon="pencil" label="Modifier" @click="openModal(row)"/>
          <AppIconButton icon="trash" label="Supprimer" tone="danger" @click="deleteClient(row.id)"/>
        </template>
      </AppTable>
    </AppPage>

    <AppModal :is-visible="modalCreationProduct" :title="isEditing ? 'Modifier le produit' : 'Nouveau produit'"
              @close-modal="closeModal" @save-modal="saveProduct">
      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-4 sm:flex-row">
          <AppField label="Référence" for="reference" class="sm:max-w-48">
            <BaseInput id="reference" v-model="modalProductsDetails.reference" placeholder="PROD000" rounded="md"/>
          </AppField>
          <AppField label="Désignation" for="designation">
            <BaseInput id="designation" v-model="modalProductsDetails.designation" placeholder="Château Montfin 2020 - 75cl" rounded="md"/>
          </AppField>
        </div>
        <div class="flex flex-col gap-4 sm:flex-row">
          <AppField label="Famille" for="family">
            <BaseInput id="family" v-model="modalProductsDetails.family" placeholder="Vin AOC Corbières Rouge" rounded="md"/>
          </AppField>
          <AppField label="Fournisseur" for="suppliers">
            <BaseInput id="suppliers" v-model="modalProductsDetails.suppliers" placeholder="Domaine de la Dourbie" rounded="md"/>
          </AppField>
        </div>
        <div class="flex flex-col gap-4 sm:flex-row sm:items-end">
          <AppField label="Prix HT (€)" for="priceWithoutTax">
            <BaseInputNumber id="priceWithoutTax" v-model="modalProductsDetails.priceWithoutTax" placeholder="10" rounded="md"/>
          </AppField>
          <AppField label="TVA (%)" for="tva">
            <BaseInputNumber id="tva" v-model="modalProductsDetails.tva" placeholder="20" rounded="md" :step="0.5"/>
          </AppField>
          <div class="flex flex-1 flex-col gap-1.5">
            <span class="text-sm font-medium text-taupe-fonce">Prix TTC</span>
            <span class="flex h-11 items-center rounded-[10px] bg-sable px-3.5 font-serif text-xl tabular-nums">
              {{ formatEuro(priceWithTax(modalProductsDetails.priceWithoutTax, modalProductsDetails.tva)) }}
            </span>
          </div>
        </div>
        <div class="flex gap-6">
          <label class="flex cursor-pointer items-center gap-2 text-[15px]">
            <input v-model="modalProductsDetails.bio" type="checkbox" class="size-4 accent-encre">
            Bio
          </label>
          <label class="flex cursor-pointer items-center gap-2 text-[15px]">
            <input v-model="modalProductsDetails.x" type="checkbox" class="size-4 accent-encre">
            X
          </label>
        </div>
        <div class="flex flex-col gap-4 sm:flex-row">
          <AppField label="Code-barres" for="barCode">
            <BaseInput id="barCode" v-model="modalProductsDetails.barCode" placeholder="0123456789" rounded="md"/>
            <p class="libre-barcode-128-regular m-0 text-center text-6xl">
              {{ parseInt(modalProductsDetails.barCode) > 99999999999999999n ? 99999999999999999n : modalProductsDetails.barCode }}
            </p>
          </AppField>
          <AppField label="Code-barres interne" for="internalBarCode">
            <BaseInput id="internalBarCode" v-model="modalProductsDetails.internalBarCode" placeholder="9876543210" rounded="md"/>
            <p class="libre-barcode-128-regular m-0 text-center text-6xl">
              {{ parseInt(modalProductsDetails.internalBarCode) > 99999999999999999n ? 99999999999999999n : modalProductsDetails.internalBarCode }}
            </p>
          </AppField>
        </div>
      </div>
      <template #footer>
        <AppButton variant="ghost" icon="printer" class="mr-auto">Imprimer</AppButton>
      </template>
    </AppModal>
  </AppOverlay>
</template>
