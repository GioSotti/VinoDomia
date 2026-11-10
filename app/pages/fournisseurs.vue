<script setup lang="ts">
import type {TableColumn} from "~/utils/table";

definePageMeta({
  middleware: "auth",
});

const fournisseurs = ref([
  {
    id: 0,
    societe: "ALARIC SARL",
    contact: "ROUANET",
    ville: "BARBAIRA",
  },
  {
    id: 1,
    societe: "CARINE GIBOUT SAFRAN DE PEYRIAC ",
    contact: "CARINE",
    ville: "PEYRIAC DE MER",
  },
  {
    id: 2,
    societe: "CHAMPAGE DELAHAIE",
    contact: "BROCHET",
    ville: "EPERNAY",
  },
  {
    id: 3,
    societe: "CHEICK SYLLA",
    contact: "FALGUERA",
    ville: "GRUISSAN",
  },
  {
    id: 4,
    societe: "GAEC E&L DROUIN - MIELERIE",
    contact: "DROUIN",
    ville: "VENTENAC CABARDES",
  },
  {
    id: 5,
    societe: "GRANHOTA SAS",
    contact: "FAURE",
    ville: "COURSAN",
  },

])

const modalFournisseurDetails = ref({
  id: 0,
  societe: "",
  contact: "",
  ville: ""
});

const modalCreationFournisseur = ref(false);
const query = ref("");

const columns: TableColumn[] = [
  {key: "societe", label: "Société"},
  {key: "contact", label: "Contact"},
  {key: "ville", label: "Ville", hideBelow: "md"},
];

const filteredFournisseurs = computed(() => filterRows(fournisseurs.value, query.value, ["societe", "contact", "ville"]));

const isEditing = computed(() => fournisseurs.value.some(f => f.id === modalFournisseurDetails.value.id));

const openModal = (fournisseur: typeof modalFournisseurDetails.value) => {
  modalFournisseurDetails.value = {...fournisseur};
  modalCreationFournisseur.value = true;
}

const closeModal = () => {
  modalCreationFournisseur.value = false;
  modalFournisseurDetails.value = {
    id: Math.max(-1, ...fournisseurs.value.map(f => f.id)) + 1,
    societe: "",
    contact: "",
    ville: ""
  };
}

const deleteFournisseur = (fournisseurId: number) => {
  fournisseurs.value = fournisseurs.value.filter(fournisseur => fournisseur.id !== fournisseurId);
}

const saveFournisseur = () => {
  const existingFournisseurIndex = fournisseurs.value.findIndex(fournisseur => fournisseur.id === modalFournisseurDetails.value.id);
  if (existingFournisseurIndex !== -1) {
    fournisseurs.value[existingFournisseurIndex] = {...modalFournisseurDetails.value};
  } else {
    fournisseurs.value.push({...modalFournisseurDetails.value});
  }
  closeModal();
}

</script>

<template>
  <AppOverlay>
    <AppPage eyebrow="Cave" title="Fournisseurs">
      <template #actions>
        <AppButton icon="plus" @click="closeModal(); modalCreationFournisseur = true">Ajouter un fournisseur</AppButton>
      </template>

      <AppTable :columns="columns" :rows="filteredFournisseurs" :row-key="f => f.id"
                :count-label="['fournisseur', 'fournisseurs']" empty-label="Aucun fournisseur ne correspond à la recherche.">
        <template #toolbar>
          <AppSearchField v-model="query" placeholder="Rechercher un fournisseur, un contact, une ville…" class="max-w-[460px]"/>
        </template>
        <template #cell-societe="{ row }">
          <span class="font-medium">{{ row.societe }}</span>
        </template>
        <template #cell-contact="{ row }">
          <span class="text-brun">{{ row.contact }}</span>
        </template>
        <template #cell-ville="{ row }">
          <span class="text-brun">{{ row.ville }}</span>
        </template>
        <template #actions="{ row }">
          <AppIconButton icon="pencil" label="Modifier" @click="openModal(row)"/>
          <AppIconButton icon="trash" label="Supprimer" tone="danger" @click="deleteFournisseur(row.id)"/>
        </template>
      </AppTable>
    </AppPage>

    <AppModal :is-visible="modalCreationFournisseur" :title="isEditing ? 'Modifier le fournisseur' : 'Nouveau fournisseur'"
              @close-modal="closeModal" @save-modal="saveFournisseur">
      <div class="flex flex-col gap-4">
        <AppField label="Société" for="societe">
          <BaseInput id="societe" v-model="modalFournisseurDetails.societe" rounded="md"/>
        </AppField>
        <div class="flex flex-col gap-4 sm:flex-row">
          <AppField label="Contact" for="contact">
            <BaseInput id="contact" v-model="modalFournisseurDetails.contact" rounded="md"/>
          </AppField>
          <AppField label="Ville" for="ville">
            <BaseInput id="ville" v-model="modalFournisseurDetails.ville" rounded="md"/>
          </AppField>
        </div>
      </div>
    </AppModal>
  </AppOverlay>
</template>
