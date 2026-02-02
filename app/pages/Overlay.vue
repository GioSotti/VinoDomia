<script setup lang="ts">

import Search from "../../components/search.vue";
import SideBar from "../sideBar.vue";

let sideBarIsOpen = ref(true);
</script>

<template>
  <div class="flex flex-row bg-background-grey">
    <side-bar :focusPage="0" v-model:is-burger-menu="sideBarIsOpen"/>
    <div class="flex flex-col w-full">
      <Search v-model:is-burger-menu="sideBarIsOpen"/>
    </div>
  </div>
</template>

<style scoped>

</style>