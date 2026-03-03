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

const mouvements = ref([
  {
    id: 0,
    date: "2024-01-15",
    valeur: "500,00 €",
    compte: "Caisse",
    debitCredit: "Débit",
    journal: "JV001"
  },
  {
    id: 1,
    date: "2024-01-10",
    valeur: "200,00 €",
    compte: "Banque",
    debitCredit: "Crédit",
    journal: "JV002"
  }
]);

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
  const newMovement = {
    id: mouvements.value.length,
    date: dateMovement.value,
    valeur: valeurMovement.value.toFixed(2) + ' €',
    compte: motif.value === 'remise_banque' || motif.value === 'entree_banque' ? 'Banque' : 'Caisse',
    debitCredit: (motif.value === 'remise_banque' || motif.value === 'sortie_achat') ? 'Débit' : 'Crédit',
    journal: 'JV' + String(mouvements.value.length + 1).padStart(3, '0')
  };

  mouvements.value.unshift(newMovement);
  soldeCaisseAvant.value = soldeCaisseApres.value;
  valeurMovement.value = 0.00;
};

const deleteMouvement = (mouvementId: number) => {
  mouvements.value = mouvements.value.filter(mouvement => mouvement.id !== mouvementId);
};


const messageMotif = computed(() => {
  switch(motif.value) {
    case 'remise_banque':
      return 'Remise d\espece en banque : cet saisie va générer deux écritures ci-dessous en comptabilité générale ';
    case 'sortie_achat':
      return 'Sortie pour achat : utilisation d\'espèces pour un achat';
    case 'retour_achat':
      return 'Retour après achat : remboursement en espèces suite à un retour';
    case 'entree_banque':
      return 'Entrée depuis banque : retrait d\'espèces du compte bancaire';
    default:
      return '';
  }
});
</script>

<template>
  <Overlay :focus-pages="0" :focus-under-page="1">
    <div class="flex flex-col w-full p-8 gap-5 h-full">
      <h1 class="text-black font-bold text-3xl">Entrées / Sorties d'espèces</h1>
      <div class="bg-gray-200 rounded-lg p-6 flex gap-8">
        <!-- ... garde le formulaire existant ... -->
        <div class="flex flex-col gap-3">
          <h3 class="font-semibold text-lg mb-2">Motif :</h3>
          <label class="flex items-center gap-2 cursor-pointer">
            <input type="radio" v-model="motif" value="remise_banque" class="w-4 h-4"/>
            <span class="text-base">Remise en banque</span>
          </label>
          <label class="flex items-center gap-2 cursor-pointer">
            <input type="radio" v-model="motif" value="sortie_achat" class="w-4 h-4"/>
            <span class="text-base">Sortie pour achat</span>
          </label>
          <label class="flex items-center gap-2 cursor-pointer">
            <input type="radio" v-model="motif" value="retour_achat" class="w-4 h-4"/>
            <span class="text-base">Retour après achat</span>
          </label>
          <label class="flex items-center gap-2 cursor-pointer">
            <input type="radio" v-model="motif" value="entree_banque" class="w-4 h-4"/>
            <span class="text-base">Entrée depuis banque</span>
          </label>
          <button @click="valider" class="mt-4 bg-gray-800 text-white py-3 px-8 rounded hover:bg-gray-700 transition-colors font-semibold">
            Valider
          </button>
        </div>
        <div class="flex flex-col gap-4 flex-1">
          <div class="flex items-center gap-4">
            <label class="font-semibold text-base whitespace-nowrap">Date du mouvement</label>
            <input type="date" v-model="dateMovement" class="border border-gray-400 px-3 py-2 rounded flex-1"/>
            <button class="bg-gray-300 hover:bg-gray-400 p-2 rounded">
              <img :src="calendarIcon" alt="Calendrier" class="w-5 h-5" />
            </button>
          </div>
          <div class="flex items-center gap-4">
            <label class="font-semibold text-base w-48">Solde caisse avant</label>
            <input type="text" :value="soldeCaisseAvant.toFixed(2) + ' €'" readonly class="border border-gray-400 px-3 py-2 rounded bg-gray-100 text-right flex-1"/>
          </div>
          <div class="flex items-center gap-4">
            <label class="font-semibold text-base w-48">Valeur du mouvement</label>
            <input type="number" v-model.number="valeurMovement" step="0.01" class="border border-gray-400 px-3 py-2 rounded text-right flex-1"/>
            <span class="text-base">€</span>
          </div>
          <div class="flex items-center gap-4">
            <label class="text-gray-500 text-base w-48">... après</label>
            <input type="text" :value="soldeCaisseApres.toFixed(2) + ' €'" readonly class="border border-gray-400 px-3 py-2 rounded bg-gray-100 text-right flex-1"/>
          </div>
        </div>
      </div>
      <div v-if="messageMotif" class="bg-red-50 border border-red-200 rounded-lg p-4">
           <p class="text-red-600 font-semibold">{{messageMotif}}</p>
      </div>
      <BaseCard variant="none" rounded="md" class="px-5 py-4 bg-white border-gray-300/50 flex flex-col w-full gap-2">
        <h2 class="text-black font-semibold text-xl mb-4">Historique des mouvements</h2>
        <span class="w-full h-0.5 bg-gray-300 mb-5"></span>
        <div class="flex flex-col w-full gap-3 overflow-y-auto max-h-96">
          <div v-for="(mouvement, key) in mouvements" :key="key" class="flex flex-col w-full gap-3">
            <div class="flex flex-row w-full gap-6 items-center justify-start pr-2">
              <div class="flex flex-row items-center gap-6">
                <div class="flex flex-col w-28">
                  <h4 class="text-gray-500 text-xs">Date</h4>
                  <h3 class="text-black font-semibold">{{ mouvement.date }}</h3>
                </div>
                <div class="flex flex-col w-28">
                  <h4 class="text-gray-500 text-xs">Valeur</h4>
                  <h3 class="text-black font-semibold">{{ mouvement.valeur }}</h3>
                </div>
                <div class="flex flex-col w-32">
                  <h4 class="text-gray-500 text-xs">Compte</h4>
                  <h3 class="text-black">{{ mouvement.compte }}</h3>
                </div>
                <div class="flex flex-col w-20">
                  <h4 class="text-gray-500 text-xs">D/C</h4>
                  <h3 class="text-black">{{ mouvement.debitCredit }}</h3>
                </div>
                <div class="flex flex-col w-24">
                  <h4 class="text-gray-500 text-xs">N° Journal</h4>
                  <h3 class="text-black">{{ mouvement.journal }}</h3>
                </div>
                <div class="flex flex-row gap-2 items-center ml-4">
                  <BaseButton @click="deleteMouvement(mouvement.id)">
                    <Icon name="ic:round-delete" class="size-5 text-red-500"/>
                  </BaseButton>
                </div>
              </div>
            </div>
            <div class="w-full h-px bg-gray-300" :class="{ 'hidden': key === mouvements.length-1, 'block' : key !== mouvements.length-1 }"></div>
          </div>
        </div>
      </BaseCard>
    </div>
  </Overlay>
</template>
