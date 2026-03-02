<script setup lang="ts">
import {ref, computed} from "vue";
import Overlay from '../components/Overlay.vue'
import calendarIcon from '../public/icons/calendar.png';


const today = new Date();
const formattedDate = today.toISOString().split('T')[0];

const motif = ref('remise_banque');
const dateMovement = ref(formattedDate);
const soldeCaisseAvant = ref(30.00);
const valeurMovement = ref(0.00);

const soldeCaisseApres = computed(() => {
  let newSolde = soldeCaisseAvant.value;

  switch(motif.value) {
    case 'remise_banque':
      newSolde -= valeurMovement.value;
      break;
    case 'sortie_achat':
      newSolde -= valeurMovement.value;
      break;
    case 'retour_achat':
      newSolde += valeurMovement.value;
      break;
    case 'entree_banque':
      newSolde += valeurMovement.value;
      break;
  }

  return newSolde;
});

const valider = () => {
  console.log('Validation du mouvement:', {
    motif: motif.value,
    date: dateMovement.value,
    soldeCaisseAvant: soldeCaisseAvant.value,
    valeurMovement: valeurMovement.value,
    soldeCaisseApres: soldeCaisseApres.value
  });
};
</script>

<template>
  <Overlay :focus-pages="0" :focus-under-page="1">
    <div class="flex flex-col w-full p-8 gap-5 h-full">
      <h1 class="text-black font-bold text-3xl">Entrées / Sorties d'espèces</h1>
      <div class="bg-gray-200 rounded-lg p-6 flex gap-8">
        <div class="flex flex-col gap-3">
          <h3 class="font-semibold text-lg mb-2">Motif :</h3>
          <label class="flex items-center gap-2 cursor-pointer">
            <input
                type="radio"
                v-model="motif"
                value="remise_banque"
                class="w-4 h-4"
            />
            <span class="text-base">Remise en banque</span>
          </label>
          <label class="flex items-center gap-2 cursor-pointer">
            <input
                type="radio"
                v-model="motif"
                value="sortie_achat"
                class="w-4 h-4"
            />
            <span class="text-base">Sortie pour achat</span>
          </label>
          <label class="flex items-center gap-2 cursor-pointer">
            <input
                type="radio"
                v-model="motif"
                value="retour_achat"
                class="w-4 h-4"
            />
            <span class="text-base">Retour après achat</span>
          </label>
          <label class="flex items-center gap-2 cursor-pointer">
            <input
                type="radio"
                v-model="motif"
                value="entree_banque"
                class="w-4 h-4"
            />
            <span class="text-base">Entrée depuis banque</span>
          </label>
          <button
              @click="valider"
              class="mt-4 bg-gray-800 text-white py-3 px-8 rounded hover:bg-gray-700 transition-colors font-semibold"
          >
            Valider
          </button>
        </div>
        <div class="flex flex-col gap-4 flex-1">
          <div class="flex items-center gap-4">
            <label class="font-semibold text-base whitespace-nowrap">Date du mouvement</label>
            <input
                type="date"
                v-model="dateMovement"
                class="border border-gray-400 px-3 py-2 rounded flex-1"
            />
            <button class="bg-gray-300 hover:bg-gray-400 p-2 rounded">
              <img :src="calendarIcon" alt="Calendrier" class="w-5 h-5" />
            </button>
          </div>

          <div class="flex items-center gap-4">
            <label class="font-semibold text-base w-48">Solde caisse avant</label>
            <input
                type="text"
                :value="soldeCaisseAvant.toFixed(2) + ' €'"
                readonly
                class="border border-gray-400 px-3 py-2 rounded bg-gray-100 text-right flex-1"
            />
          </div>

          <div class="flex items-center gap-4">
            <label class="font-semibold text-base w-48">Valeur du mouvement</label>
            <input
                type="number"
                v-model.number="valeurMovement"
                step="0.01"
                class="border border-gray-400 px-3 py-2 rounded text-right flex-1"
            />
            <span class="text-base">€</span>
          </div>

          <div class="flex items-center gap-4">
            <label class="text-gray-500 text-base w-48">... après</label>
            <input
                type="text"
                :value="soldeCaisseApres.toFixed(2) + ' €'"
                readonly
                class="border border-gray-400 px-3 py-2 rounded bg-gray-100 text-right flex-1"
            />
          </div>
        </div>
      </div>
    </div>
  </Overlay>

</template>

<style scoped>

</style>