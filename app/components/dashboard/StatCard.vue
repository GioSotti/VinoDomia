<script setup lang="ts">
defineProps<{
  label: string
  value: string | number
  linkLabel: string
  to?: string
  tag?: string
  tagTone?: 'alerte' | 'attention'
  dark?: boolean
}>()

const tagClasses = {
  alerte: 'bg-alerte-bg text-alerte',
  attention: 'bg-attention-bg text-attention',
}
</script>

<template>
  <div class="flex flex-col gap-2.5 rounded-[14px] p-5"
       :class="dark ? 'bg-encre text-ivoire' : 'border border-lin bg-papier'">
    <div class="flex items-center justify-between gap-2">
      <p class="m-0 text-xs font-medium uppercase tracking-[0.12em]" :class="dark ? 'text-grege' : 'text-taupe'">
        {{ label }}
      </p>
      <p v-if="tag" class="m-0 rounded-full px-2 py-0.5 text-xs font-medium" :class="tagClasses[tagTone ?? 'alerte']">
        {{ tag }}
      </p>
    </div>
    <p class="m-0 font-serif text-[44px] leading-none">{{ value }}</p>
    <NuxtLink :to="to ?? '#'" class="text-sm font-medium hover:text-bordeaux"
              :class="dark ? 'text-ivoire hover:text-grege' : 'text-encre'">
      {{ linkLabel }} →
    </NuxtLink>
  </div>
</template>
