<script setup lang="ts">
import {ref} from "vue";
import Overlay from '../components/Overlay.vue'

const tarifs = ref([
  {
    id: 0,
    reference: "CHAUT13",
    libelle: "CHATEAU MONTFIN CUVEE L'AUTRE 2013 CE",
    quantite: "1.00",
    typeTarif: "1SUP GROS",
    prixHt: "15,11 €",
    prixHtHorsDroits: "15,03 €",
    prixHtFutur: "15,11 €",
    prixHtFuturHorsDroits: "15,03 €"
  },
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
const value = ref("");

const openModal = (tarif: typeof modalTarifDetails.value) => {
  modalTarifDetails.value = tarif;
  modalCreationTarif.value = true;
}

const deleteTarif = (tarifId: number) => {
  tarifs.value = tarifs.value.filter(tarif => tarif.id !== tarifId);
}

</script>

<template>
  <Overlay :focus-page="0" :focus-under-page="1">
  <div class="flex flex-col w-full p-8 gap-5 h-full">
      <h1 class="text-black font-bold text-3x">Consultation des tarifs</h1>
      <BaseCard variant="none" rounded="md"
                class="px-5 py-4 bg-white border-gray-300/50 flex flex-col w-full h-110 gap-2">
        <div class="flex flex-row w-full gap-4 items-center mb-6">
          <BaseInput
              v-model="value"
              rounded="md"
              placeholder="Rechercher un tarif..."
          />
          <BaseButton size="md" variant="primary" class="w-fit flex gap-2">
            <Icon name="ic:baseline-search" class="size-5"/>
            Rechercher
          </BaseButton>
          <span class="h-full w-0.5 bg-gray-500"></span>
          <BaseButton size="md" variant="primary" class="w-fit flex"
                      @click="modalCreationTarif = !modalCreationTarif">
            <Icon name="ic:round-add-circle-outline" class="size-5"/>
            Ajouter un tarif
          </BaseButton>
        </div><span class="w-full h-0.5 bg-gray-300 mb-5"></span>
        <div class="flex flex-col w-full gap-3 overflow-y-auto flex-1">
          <div v-for="(tarif, key) in tarifs" :key="key" class="flex flex-col w-full gap-3">
            <div class="flex flex-row w-full gap-2 items-center justify-between pr-2">
              <div class="flex flex-row items-center gap-4 flex-1">
                <div class="flex flex-col w-32">
                  <h4 class="text-gray-500 text-xs">Référence</h4>
                  <h3 class="text-black font-semibold">{{ tarif.reference }}</h3>
                </div>
                <div class="flex flex-col flex-1">
                  <h4 class="text-gray-500 text-xs">Libellé</h4>
                  <h3 class="text-black">{{ tarif.libelle }}</h3>
                </div><div class="flex flex-col w-24">
                <h4 class="text-gray-500 text-xs">Quantité</h4>
                <h3 class="text-black">{{ tarif.quantite }}</h3>
              </div>
                <div class="flex flex-col w-28">
                  <h4 class="text-gray-500 text-xs">Type tarif</h4>
                  <h3 class="text-black">{{ tarif.typeTarif }}</h3>
                </div>
                <div class="flex flex-col w-24">
                  <h4 class="text-gray-500 text-xs">Prix HT</h4>
                  <h3 class="text-black font-semibold">{{ tarif.prixHt }}</h3>
                </div>
                <div class="flex flex-col w-32">
                  <h4 class="text-gray-500 text-xs">Prix HT futur</h4>
                  <h3 class="text-black font-semibold">{{ tarif.prixHtFutur }}</h3>
                </div>
              </div>
              <div class="flex flex-row gap-2 items-center">
                <BaseButton @click="openModal(tarif)">
                  <Icon name="ic:baseline-edit" class="size-5"/>
                </BaseButton>
                <BaseButton @click="deleteTarif(tarif.id)">
                  <Icon name="ic:round-delete" class="size-5 bg-red-500"/>
                </BaseButton>
              </div>
            </div>
            <div class="w-full h-px bg-gray-300"
                 :class="{ 'hidden': key === tarifs.length-1, 'block' : key !== tarifs.length-1 }"></div>
          </div>
        </div>
      </BaseCard>
  </div>
  </Overlay>
</template>

<style scoped>

</style>