<script setup lang="ts">
import type {BadgeTone} from '~/utils/status'

withDefaults(defineProps<{ tone?: BadgeTone }>(), {tone: 'neutre'})

const tones: Record<BadgeTone, string> = {
  alerte: 'bg-alerte-bg text-alerte',
  attention: 'bg-attention-bg text-attention',
  info: 'bg-info-bg text-info',
  succes: 'bg-succes-bg text-succes',
  neutre: 'bg-neutre-bg text-neutre',
}
</script>

<template>
  <span class="inline-flex shrink-0 items-center whitespace-nowrap rounded-full px-2.5 py-[3px] text-xs font-medium"
        :class="tones[tone]">
    <slot/>
  </span>
</template>
