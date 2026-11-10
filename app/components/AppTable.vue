<script setup lang="ts" generic="T">
import type {TableColumn} from '~/utils/table'

const props = withDefaults(defineProps<{
  columns: TableColumn[]
  rows: T[]
  rowKey: (row: T) => string | number
  emptyLabel?: string
  countLabel?: [string, string]
}>(), {emptyLabel: 'Aucun élément à afficher.'})

const slots = defineSlots<{
  toolbar?: () => unknown
  actions?: (p: { row: T }) => unknown
  [key: `cell-${string}`]: (p: { row: T }) => unknown
  [key: `head-${string}`]: () => unknown
}>()

const ALIGN = {left: 'text-left', right: 'text-right', center: 'text-center'}
const HIDE = {md: 'hidden md:table-cell', lg: 'hidden lg:table-cell', xl: 'hidden xl:table-cell'}

function cellClass(col: TableColumn) {
  return [ALIGN[col.align ?? 'left'], col.hideBelow ? HIDE[col.hideBelow] : '', col.class ?? '']
}

function value(row: T, key: string) {
  return (row as Record<string, unknown>)[key]
}

const countText = computed(() => {
  if (!props.countLabel) return ''
  const n = props.rows.length
  return `${n} ${n > 1 ? props.countLabel[1] : props.countLabel[0]}`
})
</script>

<template>
  <section class="w-full overflow-hidden rounded-[14px] border border-lin bg-papier">
    <div v-if="slots.toolbar" class="flex flex-wrap items-center gap-3 border-b border-lin p-4 sm:px-5">
      <slot name="toolbar"/>
    </div>

    <div class="w-full overflow-x-auto">
      <table class="w-full border-collapse">
        <thead>
          <tr class="bg-ivoire">
            <th v-for="col in columns" :key="col.key" scope="col"
                class="whitespace-nowrap px-5 py-3 text-xs font-medium uppercase tracking-[0.12em] text-taupe"
                :class="cellClass(col)">
              <slot :name="`head-${col.key}`">{{ col.label }}</slot>
            </th>
            <th v-if="slots.actions" scope="col" class="w-px px-5 py-3"><span class="sr-only">Actions</span></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in rows" :key="rowKey(row)" class="border-t border-lin transition-colors hover:bg-ivoire/60">
            <td v-for="col in columns" :key="col.key" class="px-5 py-3.5 align-middle text-[15px]"
                :class="cellClass(col)">
              <slot :name="`cell-${col.key}`" :row="row">{{ value(row, col.key) }}</slot>
            </td>
            <td v-if="slots.actions" class="whitespace-nowrap px-3 py-2 text-right align-middle">
              <div class="inline-flex items-center gap-1">
                <slot name="actions" :row="row"/>
              </div>
            </td>
          </tr>
          <tr v-if="rows.length === 0">
            <td :colspan="columns.length + (slots.actions ? 1 : 0)" class="px-5 py-12 text-center text-[15px] text-taupe">
              {{ emptyLabel }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="countText" class="border-t border-lin px-5 py-3 text-[13px] text-taupe">{{ countText }}</div>
  </section>
</template>
