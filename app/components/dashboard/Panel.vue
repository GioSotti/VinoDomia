<script setup lang="ts">
defineProps<{
  title: string
  linkLabel?: string
  to?: string
}>()
</script>

<template>
  <section class="rounded-[14px] border border-lin bg-papier px-5 pt-5 pb-2">
    <div class="flex items-baseline justify-between pb-3">
      <h2 class="m-0 font-serif text-[22px] font-normal">{{ title }}</h2>
      <NuxtLink v-if="linkLabel" :to="to ?? '#'" class="text-sm font-medium text-encre hover:text-bordeaux">
        {{ linkLabel }}
      </NuxtLink>
    </div>
    <div class="flex flex-col [&>*]:border-t [&>*]:border-lin">
      <slot/>
    </div>
  </section>
</template>
