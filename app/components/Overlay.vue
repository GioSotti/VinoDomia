<script setup lang="ts">

import Search from "../../components/search.vue";
import SideBar from "../sideBar.vue";

let sideBarIsOpen = ref(true);

defineProps<{
  focusPage: number
}>()

</script>

<template>
  <div class="flex flex-row bg-background-grey">
    <side-bar :focusPage=focusPage v-model:is-burger-menu="sideBarIsOpen"/>
    <div class="flex flex-col w-full">
      <Search v-model:is-burger-menu="sideBarIsOpen"/>
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>

</style>