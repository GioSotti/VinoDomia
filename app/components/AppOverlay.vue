<script setup lang="ts">
// Structure commune des pages : sidebar à gauche, header en haut, contenu de la page dans le slot.
const sideBarIsOpen = ref(true);

defineProps<{
  focusPage?: number
  focusUnderPage?: number
}>()

</script>

<template>
  <div class="flex flex-row bg-background-grey">
    <AppSidebar :focusPage=focusPage v-model:is-burger-menu="sideBarIsOpen" :focus-under-page="focusUnderPage"/>
    <div class="flex flex-col w-full">
      <AppHeader v-model:is-burger-menu="sideBarIsOpen"/>
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>

</style>