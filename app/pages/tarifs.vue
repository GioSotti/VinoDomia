<script setup lang="ts">
import {ref} from "vue";

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
const value = ref("");

const openModal = (tarif: typeof modalTarifDetails.value) => {
  modalTarifDetails.value = tarif;
  modalCreationTarif.value = true;
}

const closeModal = () => {
  modalCreationTarif.value = false;
  modalTarifDetails.value = {
    id: tarifs.value.length,
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
  <AppOverlay :focus-page="0" :focus-under-page="1">
  <div class="flex flex-col w-full p-8 gap-5 h-full">
      <h1 class="text-black font-bold text-3xl">Consultation des tarifs</h1>
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
    <AppModal :is-visible="modalCreationTarif" @close-modal="closeModal" @save-modal="saveTarif" save-label="Sauvegarder" cancel-label="Annuler">
      <div class="flex flex-col w-full h-140 gap-4 overflow-auto px-4 py-2">
        <h2 class="text-black font-bold text-2xl mb-4">Modifier</h2>
        <div class="flex flex-col gap-4 text-black">
          <div class="flex flex-col gap-2">
            <label for="reference">Référence :</label>
            <BaseInput rounded="md" id="reference" v-model="modalTarifDetails.reference"/>
          </div>
          <div class="flex flex-col gap-2">
            <label for="libelle">Libellé :</label>
            <BaseInput rounded="md" id="libelle" v-model="modalTarifDetails.libelle"/>
          </div>
          <div class="flex flex-row w-full gap-2">
            <div class="flex flex-col gap-2 w-full">
              <label for="quantite">Quantité :</label>
              <BaseInput rounded="md" id="quantite" v-model="modalTarifDetails.quantite"/>
            </div>
            <div class="flex flex-col gap-2 w-full">
              <label for="typeTarif">Type tarif :</label>
              <BaseInput rounded="md" id="typeTarif" v-model="modalTarifDetails.typeTarif"/>
            </div>
          </div>
          <div class="flex flex-row w-full gap-2">
            <div class="flex flex-col gap-2 w-full">
              <label for="prixHt">Prix HT :</label>
              <BaseInput rounded="md" id="prixHt" v-model="modalTarifDetails.prixHt"/>
            </div>
            <div class="flex flex-col gap-2 w-full">
              <label for="prixHtHorsDroits">Prix HT hors droits :</label>
              <BaseInput rounded="md" id="prixHtHorsDroits" v-model="modalTarifDetails.prixHtHorsDroits"/>
            </div>
          </div>
          <div class="flex flex-row w-full gap-2">
            <div class="flex flex-col gap-2 w-full">
              <label for="prixHtFutur">Prix HT futur :</label>
              <BaseInput rounded="md" id="prixHtFutur" v-model="modalTarifDetails.prixHtFutur"/>
            </div>
            <div class="flex flex-col gap-2 w-full">
              <label for="prixHtFuturHorsDroits">Prix HT futur hors droits :</label>
              <BaseInput rounded="md" id="prixHtFuturHorsDroits" v-model="modalTarifDetails.prixHtFuturHorsDroits"/>
            </div>
          </div>
        </div></div>
    </AppModal>
  </AppOverlay>
</template>

<style scoped>

</style>