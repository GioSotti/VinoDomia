<script setup lang="ts">
import {ref} from "vue";
import Overlay from '../components/Overlay.vue'

const motif = ref('remise_banque');

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

        </div>
      </div>
    </div>
  </Overlay>

</template>

<style scoped>

</style>