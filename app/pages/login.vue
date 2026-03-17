<script setup lang="ts">

</script>

<template>
  <div class="flex flex-col text-center align-center items-center gap-5">
    <div class="gap-2">
      <h1 class="font-bold text-xl">Bienvenue</h1>
      <h2 class="text-gray-500">Connectez-vous à votre compte</h2>
    </div>
    <div class="gap-6 text-left">
      <div class="gap-2">
        <label for="email">Email</label>
        <input id="email" type="email" class="border border-gray-400 rounded px-3 py-2 w-full"
               placeholder="Entrez votre email"/>
      </div>
      <div class="gap-2">
        <label for="password">Password</label>
        <input id="password" type="password" class="border border-gray-400 rounded px-3 py-2 w-full"
               placeholder="Entrez votre password"/>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>