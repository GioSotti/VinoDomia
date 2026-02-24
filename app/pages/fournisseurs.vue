<script setup lang="ts">
import {ref} from "vue";
import Overlay from '../components/Overlay.vue'

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
  }
])

const modalFournisseurDetails = ref({
  id: 0,
  societe: "",
  contact: "",
  ville: ""
});

const modalCreationFournisseur = ref(false);
const value = ref("");

const openModal = (fournisseur: typeof modalFournisseurDetails.value) => {
  modalFournisseurDetails.value = fournisseur;
  modalCreationFournisseur.value = true;
}

const closeModal = () => {
  modalCreationFournisseur.value = false;
  modalFournisseurDetails.value = {
    id: fournisseurs.value.length,
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
<Overlay :focus-pages="0" :focus-under-page="1">
  <div class="flex flex-col w-full p-8 gap-5 h-full">
    <h1 class="text-black font-bold text-3xl">Sélection d'un fournisseur</h1>
    <BaseCard variant="none" rounded="md" class="px-5 py-4 bg-white border-gray-300/50 flex flex-col w-full h-110 gap-2">
      <div class="flex flex-row w-full gap-4 items-center mb-6">
        <BaseInput
            v-model="value"
            rounded="md"
            placeholder="Rechercher un fournisseur"
        />
        <BaseButton size="md" variant="primary" class="w-fit flex gap-2">
          <Icon name="ic:baseline-search" class="size-5"/>
          Rechercher
        </BaseButton>
        <span class="h-full w-0.5 bg-gray-500"></span>
        <BaseButton size="md" variant="primary" class="w-fit flex"
            @click="modalCreationFournisseur = !modalCreationFournisseur">
          <Icon name="ic:round-add-circle-outline" class="size-5"/>
          Ajouter un fournisseur
        </BaseButton>
      </div><span class="w-full h-0.5 bg-gray-300 mb-5"></span>
      <div class="flex flex-col w-full gap-3 overflow-y-auto flex-1">
        <div v-for="(fournisseur, key) in fournisseurs" :key="key" class="flex flex-col w-full gap-3">
          <div class="flex flex-row w-full gap-2 items-center justify-between pr-2">
            <div class="flex flex-row items-center gap-4 flex-1 min-w-0">
              <div class="flex flex-col w-32 min-w-0">
                <h4 class="text-gray-500 text-xs">Société</h4>
                <h3 class="text-black font-semibold truncate" :title="fournisseur.societe">{{ fournisseur.societe }}</h3>
              </div>
              <div class="flex flex-col flex-1 min-w-0">
                <h4 class="text-gray-500 text-xs">Contact</h4>
                <h3 class="text-black truncate" :title="fournisseur.contact">{{ fournisseur.contact }}</h3>
              </div>
              <div class="flex flex-col w-24 min-w-0">
                <h4 class="text-gray-500 text-xs">Ville</h4>
                <h3 class="text-black truncate" :title="fournisseur.ville">{{ fournisseur.ville }}</h3>
              </div>
            </div>
            <div class="flex flex-row gap-2 items-center flex-shrink-0">
              <BaseButton @click="openModal(fournisseur)">
                <Icon name="ic:baseline-edit" class="size-5"/>
              </BaseButton>
              <BaseButton @click="deleteFournisseur(fournisseur.id)">
                <Icon name="ic:round-delete" class="size-5 bg-red-500"/>
              </BaseButton>
            </div>
          </div>
          <div class="w-full h-px bg-gray-300"
               :class="{ 'hidden': key === fournisseurs.length-1, 'block' : key !== fournisseurs.length-1 }"></div>
        </div>
      </div>
    </BaseCard>
  </div>
  <Modal :is-visible="modalCreationFournisseur" @close-modal="closeModal" @save-modal="saveFournisseur" save-label="Sauvegarder" cancel-label="Annuler">
    <div class="flex flex-col w-full h-140 gap-4 overflow-auto px-4 py-2">
      <h2 class="text-black font-bold text-2xl mb-4">Modifier</h2>
      <div class="flex flex-col gap-4 text-black">
        <div class="flex flex-col gap-2">
          <label for="societe">Société :</label>
          <BaseInput rounded="md" id="societe" v-model="modalFournisseurDetails.societe"/>
        </div>
        <div class="flex flex-col gap-2">
          <label for="contact">Contact :</label>
          <BaseInput rounded="md" id="contact" v-model="modalFournisseurDetails.contact"/>
        </div>
        <div class="flex flex-row w-full gap-2">
          <div class="flex flex-col gap-2 w-full">
            <label for="ville">Ville :</label>
            <BaseInput rounded="md" id="ville" v-model="modalFournisseurDetails.ville"/>
          </div>
        </div>
      </div>
    </div>
  </Modal>
</Overlay>
</template>

<style scoped>

</style>