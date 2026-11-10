<script setup lang="ts">
import {PROFILS, SEARCH_HINT} from '~/utils/navigation'

const emit = defineEmits<{ (e: 'open-menu'): void }>()

const {profil} = useProfil()
const query = ref('')
const searchHint = computed(() => SEARCH_HINT[profil.value])
</script>

<template>
  <div class="flex flex-wrap items-center gap-4 border-b border-lin px-4 py-3.5 sm:px-8">
    <button type="button" aria-label="Ouvrir le menu"
            class="flex size-11 items-center justify-center rounded-[10px] text-encre hover:bg-sable lg:hidden"
            @click="emit('open-menu')">
      <AppIcon name="menu" :size="20"/>
    </button>

    <div class="flex h-11 min-w-0 max-w-[460px] flex-[1_1_260px] items-center gap-2.5 rounded-[10px] border border-lin bg-papier px-3.5 focus-within:border-taupe">
      <AppIcon name="search" class="shrink-0 text-taupe" :stroke="2"/>
      <label for="recherche-globale" class="sr-only">Rechercher</label>
      <input id="recherche-globale" v-model="query" type="search" :placeholder="searchHint"
             class="min-w-0 flex-1 border-0 bg-transparent text-[15px] text-encre outline-none placeholder:text-taupe">
    </div>

    <div class="ml-auto flex flex-wrap items-center gap-3">
      <div role="group" aria-label="Aperçu du profil" class="flex gap-1 rounded-xl bg-sable p-1">
        <button v-for="p in PROFILS" :key="p.id" type="button"
                :aria-pressed="profil === p.id"
                class="h-10 cursor-pointer rounded-[9px] border-0 px-3.5 text-sm font-medium transition-colors"
                :class="profil === p.id ? 'bg-papier text-encre' : 'bg-transparent text-taupe-fonce hover:text-encre'"
                @click="profil = p.id">
          {{ p.label }}
        </button>
      </div>

      <button type="button" aria-label="Notifications"
              class="flex size-11 cursor-pointer items-center justify-center rounded-[10px] border-0 bg-transparent text-encre hover:bg-sable">
        <AppIcon name="bell" :size="20"/>
      </button>
    </div>
  </div>
</template>
