<script setup lang="ts">
const props = withDefaults(defineProps<{
  isVisible: boolean
  title?: string
  saveLabel?: string
  cancelLabel?: string
  hideSave?: boolean
}>(), {saveLabel: 'Enregistrer', cancelLabel: 'Annuler'})

const emit = defineEmits<{ (e: 'close-modal' | 'save-modal'): void }>()

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && props.isVisible) emit('close-modal')
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
  <Teleport to="body">
    <div v-if="isVisible" class="fixed inset-0 z-50 flex items-center justify-center bg-encre/40 p-4"
         @click.self="emit('close-modal')">
      <div role="dialog" aria-modal="true" :aria-label="title"
           class="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-[14px] border border-lin bg-papier font-sans text-encre shadow-[0_24px_60px_-20px_rgba(28,23,20,0.35)]">
        <div v-if="title" class="flex items-center justify-between gap-4 border-b border-lin px-6 py-4">
          <h2 class="m-0 font-serif text-[22px] font-normal">{{ title }}</h2>
          <AppIconButton icon="close" label="Fermer" @click="emit('close-modal')"/>
        </div>
        <div class="flex-1 overflow-y-auto px-6 py-5">
          <slot/>
        </div>
        <div class="flex flex-wrap justify-end gap-3 border-t border-lin bg-ivoire px-6 py-4">
          <slot name="footer"/>
          <AppButton variant="ghost" @click="emit('close-modal')">{{ cancelLabel }}</AppButton>
          <AppButton v-if="!hideSave" @click="emit('save-modal')">{{ saveLabel }}</AppButton>
        </div>
      </div>
    </div>
  </Teleport>
</template>
