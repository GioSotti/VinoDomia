<script setup lang="ts">
defineProps<{ placeholder?: string, label?: string }>()
const model = defineModel<string>({default: ''})
const id = useId()
</script>

<template>
  <div class="flex h-11 min-w-0 flex-[1_1_260px] items-center gap-2.5 rounded-[10px] border border-lin bg-papier px-3.5 focus-within:border-taupe">
    <AppIcon name="search" class="shrink-0 text-taupe" :stroke="2"/>
    <label :for="id" class="sr-only">{{ label ?? placeholder ?? 'Rechercher' }}</label>
    <input :id="id" v-model="model" type="search" :placeholder="placeholder"
           class="min-w-0 flex-1 border-0 bg-transparent text-[15px] text-encre outline-none placeholder:text-taupe">
  </div>
</template>
