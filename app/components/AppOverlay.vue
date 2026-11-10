<script setup lang="ts">
// Structure commune des pages : sidebar à gauche, header en haut, contenu de la page dans le slot.
const menuOpen = ref(false)

const route = useRoute()
watch(() => route.fullPath, () => {
  menuOpen.value = false
})
</script>

<template>
  <div class="flex min-h-screen bg-ivoire font-sans text-encre">
    <AppSidebar :open="menuOpen" @close="menuOpen = false"/>
    <main class="flex min-w-0 flex-1 flex-col">
      <AppHeader @open-menu="menuOpen = true"/>
      <slot/>
    </main>
  </div>
</template>
