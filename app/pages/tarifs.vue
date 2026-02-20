<script setup lang="ts">
import {ref} from "vue";
import Overlay from '../components/Overlay.vue'

const modalCreationTarif = ref(false);
const value = ref("");

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
        </div>
      </BaseCard>
  </div>
  </Overlay>
</template>

<style scoped>

</style>