<script setup lang="ts">

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
      </div>
    </BaseCard>
  </div>

</Overlay>
</template>

<style scoped>

</style>