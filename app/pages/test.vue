<script setup>
const { data: users } = await useFetch("/api/users");
</script>

<template>
  <div>
    <h1>Test Page</h1>
    <p>This is a test page to verify Prisma integration.</p>
    <h2>{{ users }}</h2>
  </div>
</template>

<style scoped>
</style>
