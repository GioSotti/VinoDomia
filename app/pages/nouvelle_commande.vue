<script setup lang="ts">
import {ref} from "vue";
import Overlay from "../components/Overlay.vue";

</script>

<template>
  <Overlay :focus-page="0" :focus-under-page="1">
    <div class="flex flex-col w-full p-8 gap-5 h-full">
        <h1 class="text-black font-bold text-3xl">Saisie de la nouvelle commande </h1>
    </div>

  </Overlay>

</template>

<style scoped>

</style>