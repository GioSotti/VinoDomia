<script setup lang="ts">
defineEmits(['close-modal', 'save-modal']);
defineProps<{
  isVisible: Boolean,
  firstButtonText?: String,
  secondButtonText?: String,
}>();
</script>

<template>
  <div v-if="isVisible">
    <div class="fixed inset-0 bg-gray-600/50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div class="bg-white rounded-lg shadow-lg p-6 w-1/2">
        <slot></slot>
        <div class="flex gap-4 mt-6 ">
          <BaseButton variant="primary" @click="$emit('save-modal')" rounded="lg" class="w-full"
                      :class="[firstButtonText === null ? 'hidden' : 'block']">{{ firstButtonText }}
          </BaseButton>
          <BaseButton variant="default" @click="$emit('close-modal')" rounded="lg" class="w-full"
                      :class="[secondButtonText === null ? 'hidden' : 'block']">{{ secondButtonText }}
          </BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>