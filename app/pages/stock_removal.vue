<script setup lang="ts">
import {ref} from "vue";

const stockElements = ref([{
  id: 1,
  reference: "PR001",
  capacity: 1,
  unite: "Unite(s)",
  alcohol: 0,
  date: new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()),
  quantity: 0,
  reason: "Régularisation annuelle",
  observations: "Lorem ipsum dolor sit amet, consetetur",
}, {
  id: 2,
  reference: "PR002",
  capacity: 1,
  unite: "Litre(s)",
  alcohol: 0,
  date: new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()),
  quantity: 3,
  reason: "Offert à un client",
  observations: ""
}, {
  id: 3,
  reference: "PR003",
  capacity: 0.75,
  unite: "Litre(s)",
  alcohol: 15,
  date: new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()),
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
  date: new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()),
  quantity: 0,
  reason: "",
  observations: ""
})

const modalCreationStockRemoval = ref(false);

const value = ref("");

const openModal = (stockElements: {
  id: number;
  reference: string,
  capacity: number,
  unite: string,
  alcohol: number,
  date: Date,
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
    id: stockElements.value.length,
    reference: "",
    capacity: 0,
    unite: "",
    alcohol: 0,
    date: new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()),
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
  <AppOverlay :focus-page="1" :focus-under-page="1">
    <!-- Page content -->
    <div class="flex flex-col w-full p-8 gap-5 h-full">
      <h1 class="text-black font-bold text-3xl">Sortie de stock</h1>
      <!-- Search and filters -->
      <BaseCard variant="none" rounded="md"
                class="px-5 py-4 bg-white border border-gray-300/50 flex flex-col w-full h-150 gap-2">
        <!-- BaseCard Upper Part -->
        <div class="flex flex-row w-full gap-5 items-center mb-2">
          <!-- Search Bar -->
          <BaseInput
              v-model="value"
              rounded="md"
              placeholder="Rechercher une sortie de stock..."
          />
          <BaseButton size="md" variant="primary" class="w-fit flex gap-2">
            <Icon name="ic:baseline-search" class="size-5"/>
            Rechercher
          </BaseButton>
          <span class="h-full w-0.5 bg-gray-500"></span>
          <BaseButton size="md" variant="primary" class="w-fit flex"
                      @click="openModal(modalStockElementsDetails)">
            <Icon name="ic:round-add-circle-outline" class="size-5"/>
            Ajouter une sortie de stock
          </BaseButton>
        </div>
        <span class="w-full h-0.5 bg-gray-300 mb-5"></span>
        <!-- BaseCard Lower Part -->
        <div class="flex flex-col w-full gap-3 overflow-y-auto flex-1">
          <!-- Table Header -->
          <div
              class="grid grid-cols-[1fr_1fr_1fr_1fr_2fr_3fr_auto] gap-4 px-4 py-2 bg-gray-100 font-semibold text-sm text-gray-700 text-center">
            <div>Référence</div>
            <div>Date</div>
            <div>Quantite</div>
            <div>Soit</div>
            <div>Raison</div>
            <div>Observations</div>
            <div>Actions</div>
          </div>

          <div v-for="(stockElement, key) in stockElements" :key="key" class="flex flex-col w-full">
            <!-- Table Row -->
            <div
                class="grid grid-cols-[1fr_1fr_1fr_1fr_2fr_3fr_auto] gap-4 px-4 py-3 items-center hover:bg-gray-50 cursor-pointer transition-colors text-center">
              <!-- Product details -->
              <div class="text-sm font-medium">{{ stockElement.reference }}</div>
              <div class="text-sm">{{ stockElement.date.toLocaleDateString() }}</div>
              <div class="text-sm">{{ stockElement.quantity }}</div>
              <div class="text-sm">{{ stockElement.quantity * stockElement.capacity + " " + stockElement.unite }}</div>
              <div class="text-sm">{{ stockElement.reason }}</div>
              <div class="text-sm">{{ stockElement.observations }}</div>
              <div class="flex gap-2">
                <!-- Edit and Delete buttons -->
                <BaseButton size="sm" variant="primary" @click.stop="openModal(stockElement)">
                  <Icon name="ic:baseline-edit" class="size-4"/>
                </BaseButton>
                <BaseButton size="sm" variant="destructive" @click.stop="deleteStockRemoval(stockElement.id)">
                  <Icon name="ic:baseline-delete" class="size-4"/>
                </BaseButton>
              </div>
            </div>
            <div class="w-full h-px bg-gray-300" :class="{ 'hidden': key === stockElements.length-1 }"></div>
          </div>
        </div>
        <AppModal :is-visible="modalCreationStockRemoval" @close-modal="closeModal" @save-modal="saveStockRemoval" save-label="Sauvegarder" cancel-label="Annuler">
          <div class="flex flex-col w-full h-full gap-4 overflow-auto px-4 py-2">
            <!-- Modal content -->
            <h2 class="text-black font-bold text-2xl mb-4">Créer / modifier une nouvelle sortie de stock</h2>
            <div class="flex flex-col gap-4 text-black">
              <div class="flex flex-row w-full gap-2 items-center">
                <!-- Reference and Family -->
                <div class="flex flex-col w-full">
                  <label for="reference">Référence :</label>
                  <BaseInput placeholder="PROD000" rounded="md" id="reference"
                             v-model="modalStockElementsDetails.reference"/>
                </div>
                <div class="flex flex-col w-full">
                  <label for="date">Date : </label>
                  <input type="date" id="date" class="border-gray-300 text-gray-500" v-model="modalStockElementsDetails.date">
                </div>
              </div>
              <div class="flex flex-row w-full gap-2 items-center">
                <div class="flex flex-col w-full">
                  <label for="quantity">Quantité : </label>
                  <BaseInputNumber
                      name="quantity"
                      v-model="modalStockElementsDetails.quantity"
                      rounded="sm"
                      :min="1"
                  />
                </div>
                <div class="flex flex-col w-full">
                  <label for="unite">Unité:</label>
                  <BaseSelect v-model="modalStockElementsDetails.unite" name="unite">
                    <BaseSelectItem value="Unite(s)">
                      Unite(s)
                    </BaseSelectItem>
                    <BaseSelectItem value="Litre(s)">
                      Litre(s)
                    </BaseSelectItem>
                  </BaseSelect>
                </div>
                <div class="flex flex-col w-full">
                  <label for="alcohol">Degré d'alcool</label>
                  <BaseInputNumber
                      name="quantity"
                      v-model="modalStockElementsDetails.alcohol"
                      rounded="sm"
                      :min="0"
                      :max="100"
                  />
                </div>
              </div>

              <div class="flex flex-row w-full gap-2 items-start">
                <div class="flex flex-col w-2/5">
                  <label for="reason">Raison : </label>
                  <BaseSelect v-model="modalStockElementsDetails.reason" name="reason">
                    <BaseSelectItem v-for="reason in reasons" :value="reason">
                      {{ reason }}
                    </BaseSelectItem>
                  </BaseSelect>
                </div>
                <div class="flex flex-col w-full">
                  <label for="obsevations">Observations :</label>
                  <BaseTextarea v-model="modalStockElementsDetails.observations" size="md" name="obsevations"></BaseTextarea>
                </div>
              </div>
            </div>
          </div>
        </AppModal>
      </BaseCard>
    </div>
  </AppOverlay>
</template>

<style scoped>

</style>