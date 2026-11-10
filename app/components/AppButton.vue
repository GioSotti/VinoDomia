<script setup lang="ts">
import type {IconName} from '~/utils/navigation'

const props = withDefaults(defineProps<{
  variant?: 'primary' | 'secondary' | 'ghost'
  icon?: IconName
  to?: string
  type?: 'button' | 'submit'
}>(), {variant: 'primary', type: 'button'})

const classes = computed(() => [
  'inline-flex h-11 shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-[10px] px-[18px] text-[15px] font-medium no-underline transition-colors',
  {
    primary: 'border-0 bg-encre text-ivoire hover:bg-brun',
    secondary: 'border border-encre bg-transparent text-encre hover:bg-sable',
    ghost: 'border border-lin bg-papier text-encre hover:border-grege hover:bg-ivoire',
  }[props.variant],
])
</script>

<template>
  <NuxtLink v-if="to" :to="to" :class="classes">
    <AppIcon v-if="icon" :name="icon" :stroke="2"/>
    <slot/>
  </NuxtLink>
  <button v-else :type="type" :class="classes">
    <AppIcon v-if="icon" :name="icon" :stroke="2"/>
    <slot/>
  </button>
</template>
