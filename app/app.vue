<script setup lang="ts">
import SideBar from "~~/app/sideBar.vue";
import Search from "~~/components/search.vue";
import Commercial_actions from "~~/pages/commercial_actions.vue";
</script>

<template>
  <div class="flex flex-row h-screen">
    <SideBar :focusPage="1" />
    <Search class="fixed top-0 left-72 right-0 z-10" />
    <div class="flex flex-col flex-1 ml-72 pt-16">
      <commercial_actions/>
      <NuxtPage />
    </div>
  </div>
</template>
