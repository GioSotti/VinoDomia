<script setup lang="ts">
import {ORDER_STATUS_TONE, type OrderStatus} from '~/utils/status'

defineProps<{ status: OrderStatus }>()
</script>

<template>
  <AppBadge :tone="ORDER_STATUS_TONE[status]">{{ status }}</AppBadge>
</template>
