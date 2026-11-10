<script setup lang="ts">
defineProps<{
  title: string
  eyebrow?: string
}>()
</script>

<template>
  <div class="flex w-full flex-col gap-7 px-4 pt-9 pb-12 sm:px-8">
    <div class="flex flex-wrap items-end justify-between gap-4">
      <div class="flex flex-col gap-2">
        <p v-if="eyebrow" class="m-0 text-xs font-medium uppercase tracking-[0.16em] text-taupe">{{ eyebrow }}</p>
        <h1 class="m-0 font-serif text-[32px] font-normal leading-tight sm:text-[36px]">{{ title }}</h1>
      </div>
      <div v-if="$slots.actions" class="flex flex-wrap items-center gap-3">
        <slot name="actions"/>
      </div>
    </div>
    <slot/>
  </div>
</template>
