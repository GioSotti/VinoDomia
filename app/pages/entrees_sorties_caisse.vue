<script setup lang="ts">
import {ref} from "vue";
import Overlay from '../components/Overlay.vue'

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
      </div>
    </div>
  </Overlay>

</template>

<style scoped>

</style>