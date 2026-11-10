<script setup lang="ts">
defineProps<{ label: string, for?: string }>()
</script>

<template>
  <div class="flex min-w-0 flex-1 flex-col gap-1.5">
    <label :for="$props.for" class="text-sm font-medium text-taupe-fonce">{{ label }}</label>
    <slot/>
  </div>
</template>
