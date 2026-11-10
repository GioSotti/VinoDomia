<script setup lang="ts">
import type {TableColumn} from "~/utils/table";

const today = () => new Date().toISOString().slice(0, 10);

const stockElements = ref([{
  id: 1,
  reference: "PR001",
  capacity: 1,
  unite: "Unite(s)",
  alcohol: 0,
  date: today(),
  quantity: 0,
  reason: "Régularisation annuelle",
  observations: "Lorem ipsum dolor sit amet, consetetur",
}, {
  id: 2,
  reference: "PR002",
  capacity: 1,
  unite: "Litre(s)",
  alcohol: 0,
  date: today(),
  quantity: 3,
  reason: "Offert à un client",
  observations: ""
}, {
  id: 3,
  reference: "PR003",
  capacity: 0.75,
  unite: "Litre(s)",
  alcohol: 15,
  date: today(),
  quantity: 2,
  reason: "Transvasement",
  observations: ""
}])

const modalStockElementsDetails = ref({
  id: stockElements.value.length+1,
  reference: "",
  capacity: 0,
  unite: "Unite",
  alcohol: 0,
  date: today(),
  quantity: 0,
  reason: "",
  observations: ""
})

const modalCreationStockRemoval = ref(false);

const query = ref("");

const columns: TableColumn[] = [
  {key: "reference", label: "Référence"},
  {key: "reason", label: "Raison"},
  {key: "date", label: "Date", hideBelow: "md"},
  {key: "quantity", label: "Quantité", align: "right"},
  {key: "volume", label: "Soit", align: "right", hideBelow: "md"},
  {key: "observations", label: "Observations", hideBelow: "lg"},
];

const filteredStock = computed(() => filterRows(stockElements.value, query.value, ["reference", "reason", "observations"]));

const isEditing = computed(() => stockElements.value.some(e => e.id === modalStockElementsDetails.value.id));

const formatVolume = (quantity: number, capacity: number, unite: string) =>
    `${(quantity * capacity).toLocaleString("fr-FR")} ${unite}`;

const newStockRemoval = () => {
  closeModal();
  modalStockElementsDetails.value.id = Math.max(0, ...stockElements.value.map(e => e.id)) + 1;
  modalStockElementsDetails.value.unite = "Unite(s)";
  modalCreationStockRemoval.value = true;
};

const openModal = (stockElements: {
  id: number;
  reference: string,
  capacity: number,
  unite: string,
  alcohol: number,
  date: string,
  quantity: number,
  reason: string,
  observations: string
}) => {
  modalStockElementsDetails.value = JSON.parse(JSON.stringify(stockElements));
  modalCreationStockRemoval.value = true;
}

const closeModal = () => {
  modalCreationStockRemoval.value = false;
  modalStockElementsDetails.value = {
    id: Math.max(0, ...stockElements.value.map(e => e.id)) + 1,
    reference: "",
    capacity: 0,
    unite: "",
    alcohol: 0,
    date: today(),
    quantity: 0,
    reason: "",
    observations: ""
  };
}

const deleteStockRemoval = (stockElementId: number) => {
  stockElements.value = stockElements.value.filter(stockElement => stockElement.id !== stockElementId);
}

const saveStockRemoval = () => {
  const existingStockRemovalIndex = stockElements.value.findIndex(stockElement => stockElement.id === modalStockElementsDetails.value.id);
  if (existingStockRemovalIndex !== -1) {
    stockElements.value[existingStockRemovalIndex] = {...modalStockElementsDetails.value};
  } else {
    stockElements.value.push({...modalStockElementsDetails.value});
  }
  closeModal();
}

const reasons = ref([
  "Régularisation annuelle",
    "Cassé/défectueux",
    "Perdu/volé",
    "Erreur de saisie",
    "Transvasement",
    "Offert à un client"
])

</script>

<template>
  <AppOverlay>
    <AppPage eyebrow="Cave" title="Sorties de stock">
      <template #actions>
        <AppButton icon="plus" @click="newStockRemoval">Nouvelle sortie de stock</AppButton>
      </template>

      <AppTable :columns="columns" :rows="filteredStock" :row-key="e => e.id"
                :count-label="['sortie', 'sorties']" empty-label="Aucune sortie de stock ne correspond à la recherche.">
        <template #toolbar>
          <AppSearchField v-model="query" placeholder="Rechercher une référence, une raison…" class="max-w-[460px]"/>
        </template>
        <template #cell-reference="{ row }">
          <span class="text-[13px] font-medium text-taupe">{{ row.reference }}</span>
        </template>
        <template #cell-reason="{ row }">
          <span class="font-medium">{{ row.reason }}</span>
        </template>
        <template #cell-date="{ row }">
          <span class="whitespace-nowrap text-brun tabular-nums">{{ formatDate(row.date) }}</span>
        </template>
        <template #cell-quantity="{ row }">
          <span class="font-medium tabular-nums">{{ row.quantity }}</span>
        </template>
        <template #cell-volume="{ row }">
          <span class="whitespace-nowrap text-brun tabular-nums">{{ formatVolume(row.quantity, row.capacity, row.unite) }}</span>
        </template>
        <template #cell-observations="{ row }">
          <span v-if="row.observations" class="line-clamp-2 max-w-80 text-sm text-taupe">{{ row.observations }}</span>
          <span v-else class="text-taupe">—</span>
        </template>
        <template #actions="{ row }">
          <AppIconButton icon="pencil" label="Modifier" @click="openModal(row)"/>
          <AppIconButton icon="trash" label="Supprimer" tone="danger" @click="deleteStockRemoval(row.id)"/>
        </template>
      </AppTable>
    </AppPage>

    <AppModal :is-visible="modalCreationStockRemoval"
              :title="isEditing ? 'Modifier la sortie de stock' : 'Nouvelle sortie de stock'"
              @close-modal="closeModal" @save-modal="saveStockRemoval">
      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-4 sm:flex-row">
          <AppField label="Référence" for="reference">
            <BaseInput id="reference" v-model="modalStockElementsDetails.reference" placeholder="PR000" rounded="md"/>
          </AppField>
          <AppField label="Date" for="date" class="sm:max-w-48">
            <BaseInput id="date" v-model="modalStockElementsDetails.date" type="date" rounded="md"/>
          </AppField>
        </div>
        <div class="flex flex-col gap-4 sm:flex-row">
          <AppField label="Quantité">
            <BaseInputNumber v-model="modalStockElementsDetails.quantity" rounded="md" :min="1" aria-label="Quantité"/>
          </AppField>
          <AppField label="Unité">
            <BaseSelect v-model="modalStockElementsDetails.unite">
              <BaseSelectItem value="Unite(s)">Unité(s)</BaseSelectItem>
              <BaseSelectItem value="Litre(s)">Litre(s)</BaseSelectItem>
            </BaseSelect>
          </AppField>
          <AppField label="Degré d'alcool (%)">
            <BaseInputNumber v-model="modalStockElementsDetails.alcohol" rounded="md" :min="0" :max="100" aria-label="Degré d'alcool"/>
          </AppField>
        </div>
        <AppField label="Raison">
          <BaseSelect v-model="modalStockElementsDetails.reason" placeholder="Choisir une raison…">
            <BaseSelectItem v-for="reason in reasons" :key="reason" :value="reason">{{ reason }}</BaseSelectItem>
          </BaseSelect>
        </AppField>
        <AppField label="Observations">
          <BaseTextarea v-model="modalStockElementsDetails.observations" size="md" aria-label="Observations"/>
        </AppField>
      </div>
    </AppModal>
  </AppOverlay>
</template>
