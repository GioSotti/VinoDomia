<script setup lang="ts">
import type {IconName} from '~/utils/navigation'

withDefaults(defineProps<{
  icon: IconName
  label: string
  tone?: 'default' | 'danger'
}>(), {tone: 'default'})
</script>

<template>
  <button type="button" :aria-label="label" :title="label"
          class="inline-flex size-9 cursor-pointer items-center justify-center rounded-[10px] border-0 bg-transparent text-taupe transition-colors"
          :class="tone === 'danger' ? 'hover:bg-alerte-bg hover:text-alerte' : 'hover:bg-sable hover:text-encre'">
    <AppIcon :name="icon"/>
  </button>
</template>
