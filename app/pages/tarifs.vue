<script setup lang="ts">
import type {TableColumn} from "~/utils/table";

const tarifs = ref([
  {
    id: 0,
    reference: "CHAUT13",
    libelle: "CHATEAU MONTFIN CUVEE L'AUTRE 2013",
    quantite: "1.00",
    typeTarif: "1SUP GROS",
    prixHt: "15,11 €",
    prixHtHorsDroits: "15,08 €",
    prixHtFutur: "15,11 €",
    prixHtFuturHorsDroits: "15,08 €"
  },
  {
    id: 1,
    reference: "CHAUT13",
    libelle: "CHATEAU MONTFIN CUVEE L'AUTRE 2013",
    quantite: "1.00",
    typeTarif: "2GROSS",
    prixHt: "15,32 €",
    prixHtHorsDroits: "15,29 €",
    prixHtFutur: "15,32 €",
    prixHtFuturHorsDroits: "15,29 €"
  },
  {
    id: 2,
    reference: "CHAUT13",
    libelle: "CHATEAU MONTFIN CUVEE L'AUTRE 2013",
    quantite: "1.00",
    typeTarif: "3CAVIS",
    prixHt: "15,74 €",
    prixHtHorsDroits: "15,71 €",
    prixHtFutur: "15,74 €",
    prixHtFuturHorsDroits: "15,71 €"
  },
  {
    id: 3,
    reference: "CHAUT13",
    libelle: "CHATEAU MONTFIN CUVEE L'AUTRE 2013",
    quantite: "1.00",
    typeTarif: "3CAVPT",
    prixHt: "16,58 €",
    prixHtHorsDroits: "16,55 €",
    prixHtFutur: "16,58 €",
    prixHtFuturHorsDroits: "16,55 €"
  },
  {
    id: 4,
    reference: "CHAUT13",
    libelle: "CHATEAU MONTFIN CUVEE L'AUTRE 2013",
    quantite: "1.00",
    typeTarif: "4CE",
    prixHt: "17,21 €",
    prixHtHorsDroits: "17,18 €",
    prixHtFutur: "17,21 €",
    prixHtFuturHorsDroits: "17,18 €"
  }
]);

const modalTarifDetails = ref({
  id: 0,
  reference: "",
  libelle: "",
  quantite: "",
  typeTarif: "",
  prixHt: "",
  prixHtHorsDroits: "",
  prixHtFutur: "",
  prixHtFuturHorsDroits: ""
});

const modalCreationTarif = ref(false);
const query = ref("");

const columns: TableColumn[] = [
  {key: "reference", label: "Référence"},
  {key: "libelle", label: "Libellé"},
  {key: "typeTarif", label: "Type tarif"},
  {key: "quantite", label: "Quantité", align: "right", hideBelow: "lg"},
  {key: "prixHt", label: "Prix HT", align: "right"},
  {key: "prixHtHorsDroits", label: "HT hors droits", align: "right", hideBelow: "xl"},
  {key: "prixHtFutur", label: "Prix HT futur", align: "right", hideBelow: "md"},
];

const filteredTarifs = computed(() => filterRows(tarifs.value, query.value, ["reference", "libelle", "typeTarif"]));

const isEditing = computed(() => tarifs.value.some(t => t.id === modalTarifDetails.value.id));

const openModal = (tarif: typeof modalTarifDetails.value) => {
  modalTarifDetails.value = {...tarif};
  modalCreationTarif.value = true;
}

const closeModal = () => {
  modalCreationTarif.value = false;
  modalTarifDetails.value = {
    id: Math.max(-1, ...tarifs.value.map(t => t.id)) + 1,
    reference: "",
    libelle: "",
    quantite: "",
    typeTarif: "",
    prixHt: "",
    prixHtHorsDroits: "",
    prixHtFutur: "",
    prixHtFuturHorsDroits: ""
  };
}

const deleteTarif = (tarifId: number) => {
  tarifs.value = tarifs.value.filter(tarif => tarif.id !== tarifId);
}

const saveTarif = () => {
  const existingTarifIndex = tarifs.value.findIndex(tarif => tarif.id === modalTarifDetails.value.id);
  if (existingTarifIndex !== -1) {
    tarifs.value[existingTarifIndex] = {...modalTarifDetails.value};
  } else {
    tarifs.value.push({...modalTarifDetails.value});
  }
  closeModal();
}

</script>

<template>
  <AppOverlay>
    <AppPage eyebrow="Cave" title="Tarifs">
      <template #actions>
        <AppButton icon="plus" @click="closeModal(); modalCreationTarif = true">Ajouter un tarif</AppButton>
      </template>

      <AppTable :columns="columns" :rows="filteredTarifs" :row-key="t => t.id"
                :count-label="['tarif', 'tarifs']" empty-label="Aucun tarif ne correspond à la recherche.">
        <template #toolbar>
          <AppSearchField v-model="query" placeholder="Rechercher une référence, un vin, un type de tarif…" class="max-w-[460px]"/>
        </template>
        <template #cell-reference="{ row }">
          <span class="text-[13px] font-medium text-taupe">{{ row.reference }}</span>
        </template>
        <template #cell-libelle="{ row }">
          <span class="font-medium">{{ row.libelle }}</span>
        </template>
        <template #cell-typeTarif="{ row }">
          <AppBadge>{{ row.typeTarif }}</AppBadge>
        </template>
        <template #cell-quantite="{ row }">
          <span class="text-brun tabular-nums">{{ row.quantite }}</span>
        </template>
        <template #cell-prixHt="{ row }">
          <span class="whitespace-nowrap font-medium tabular-nums">{{ row.prixHt }}</span>
        </template>
        <template #cell-prixHtHorsDroits="{ row }">
          <span class="whitespace-nowrap text-brun tabular-nums">{{ row.prixHtHorsDroits }}</span>
        </template>
        <template #cell-prixHtFutur="{ row }">
          <span class="whitespace-nowrap tabular-nums" :class="row.prixHtFutur !== row.prixHt ? 'font-medium text-attention' : 'text-brun'">
            {{ row.prixHtFutur }}
          </span>
        </template>
        <template #actions="{ row }">
          <AppIconButton icon="pencil" label="Modifier" @click="openModal(row)"/>
          <AppIconButton icon="trash" label="Supprimer" tone="danger" @click="deleteTarif(row.id)"/>
        </template>
      </AppTable>
    </AppPage>

    <AppModal :is-visible="modalCreationTarif" :title="isEditing ? 'Modifier le tarif' : 'Nouveau tarif'"
              @close-modal="closeModal" @save-modal="saveTarif">
      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-4 sm:flex-row">
          <AppField label="Référence" for="reference" class="sm:max-w-48">
            <BaseInput id="reference" v-model="modalTarifDetails.reference" rounded="md"/>
          </AppField>
          <AppField label="Libellé" for="libelle">
            <BaseInput id="libelle" v-model="modalTarifDetails.libelle" rounded="md"/>
          </AppField>
        </div>
        <div class="flex flex-col gap-4 sm:flex-row">
          <AppField label="Quantité" for="quantite">
            <BaseInput id="quantite" v-model="modalTarifDetails.quantite" rounded="md"/>
          </AppField>
          <AppField label="Type tarif" for="typeTarif">
            <BaseInput id="typeTarif" v-model="modalTarifDetails.typeTarif" rounded="md"/>
          </AppField>
        </div>
        <div class="flex flex-col gap-4 sm:flex-row">
          <AppField label="Prix HT" for="prixHt">
            <BaseInput id="prixHt" v-model="modalTarifDetails.prixHt" rounded="md"/>
          </AppField>
          <AppField label="Prix HT hors droits" for="prixHtHorsDroits">
            <BaseInput id="prixHtHorsDroits" v-model="modalTarifDetails.prixHtHorsDroits" rounded="md"/>
          </AppField>
        </div>
        <div class="flex flex-col gap-4 sm:flex-row">
          <AppField label="Prix HT futur" for="prixHtFutur">
            <BaseInput id="prixHtFutur" v-model="modalTarifDetails.prixHtFutur" rounded="md"/>
          </AppField>
          <AppField label="Prix HT futur hors droits" for="prixHtFuturHorsDroits">
            <BaseInput id="prixHtFuturHorsDroits" v-model="modalTarifDetails.prixHtFuturHorsDroits" rounded="md"/>
          </AppField>
        </div>
      </div>
    </AppModal>
  </AppOverlay>
</template>
