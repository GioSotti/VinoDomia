<script setup lang="ts">
import {NAV, WHO, type NavItem} from '~/utils/navigation'

defineProps<{ open: boolean }>()
const emit = defineEmits<{ (e: 'close'): void }>()

const route = useRoute()
const {profil, label: roleName} = useProfil()
const {clearToken} = useAuth()
const {account, loadAccount} = useAccount()

onMounted(() => {
  loadAccount().catch(() => {})
})

const sections = computed(() => NAV[profil.value])
const who = computed(() => WHO[profil.value])
const displayName = computed(() => account.value?.name || who.value.name)
const avatar = computed(() => account.value?.name ? initials(account.value.name) : who.value.initial)
const settingsActive = computed(() => route.path === '/parametres')

const isActive = (item: NavItem) => !!item.to && route.path === item.to

function badgeClass(item: NavItem) {
  if (item.alert) return 'bg-alerte-bg text-alerte'
  return isActive(item) ? 'bg-brun text-ivoire' : 'bg-lin text-encre'
}

function logout() {
  clearToken()
  account.value = null
  navigateTo('/login')
}
</script>

<template>
  <div v-if="open" class="fixed inset-0 z-30 bg-encre/30 lg:hidden" aria-hidden="true" @click="emit('close')"/>

  <nav aria-label="Navigation principale"
       class="fixed inset-y-0 left-0 z-40 flex w-[264px] flex-col gap-[22px] overflow-y-auto border-r border-lin bg-sable px-4 py-6 transition-transform duration-200 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0"
       :class="open ? 'translate-x-0' : '-translate-x-full'">
    <div class="flex items-center justify-between px-2.5">
      <NuxtLink to="/dashboard" class="flex items-center gap-2.5 text-encre no-underline" @click="emit('close')">
        <img src="/images/logo/svg/vinodomia-symbole-encre.svg" alt="" width="38" height="32">
        <span class="font-serif text-lg font-bold tracking-[0.06em]">VINODOMIA</span>
      </NuxtLink>
      <button type="button" aria-label="Fermer le menu"
              class="flex size-10 items-center justify-center rounded-[10px] text-encre hover:bg-lin lg:hidden"
              @click="emit('close')">
        <AppIcon name="close" :size="20"/>
      </button>
    </div>

    <div class="flex flex-col gap-[18px]">
      <div v-for="section in sections" :key="section.title" class="flex flex-col gap-0.5">
        <p class="mb-1 px-3 text-xs font-medium uppercase tracking-[0.14em] text-taupe-fonce">{{ section.title }}</p>

        <template v-for="item in section.items" :key="item.label">
          <NuxtLink v-if="item.to" :to="item.to"
                    :aria-current="isActive(item) ? 'page' : undefined"
                    class="flex min-h-11 items-center gap-3 rounded-[10px] px-3 text-[15px] no-underline transition-colors"
                    :class="isActive(item) ? 'bg-encre font-medium text-ivoire' : 'text-encre hover:bg-lin/60'"
                    @click="emit('close')">
            <AppIcon :name="item.icon"/>
            <span class="flex-1">{{ item.label }}</span>
            <span v-if="item.badge" class="rounded-full px-2 py-px text-xs font-medium" :class="badgeClass(item)">
              {{ item.badge }}
            </span>
          </NuxtLink>

          <span v-else aria-disabled="true" title="Bientôt disponible"
                class="flex min-h-11 cursor-not-allowed items-center gap-3 rounded-[10px] px-3 text-[15px] text-encre opacity-50">
            <AppIcon :name="item.icon"/>
            <span class="flex-1">{{ item.label }}</span>
            <span v-if="item.badge" class="rounded-full px-2 py-px text-xs font-medium" :class="badgeClass(item)">
              {{ item.badge }}
            </span>
          </span>
        </template>
      </div>
    </div>

    <div class="mt-auto flex items-center gap-1 rounded-xl border p-1.5 transition-colors"
         :class="settingsActive ? 'border-encre bg-papier' : 'border-lin bg-ivoire'">
      <NuxtLink to="/parametres" :aria-current="settingsActive ? 'page' : undefined"
                class="flex min-w-0 flex-1 items-center gap-3 rounded-[10px] p-1.5 text-encre no-underline hover:bg-sable/60"
                @click="emit('close')">
        <div class="flex size-10 shrink-0 items-center justify-center rounded-full bg-encre font-serif text-base text-ivoire">
          {{ avatar }}
        </div>
        <div class="flex min-w-0 flex-1 flex-col">
          <p class="m-0 truncate text-sm font-medium">{{ displayName }}</p>
          <p class="m-0 truncate text-[13px] text-taupe">{{ roleName }}</p>
        </div>
      </NuxtLink>
      <button type="button" aria-label="Se déconnecter" title="Se déconnecter"
              class="flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-[10px] border-0 bg-transparent text-taupe hover:bg-sable hover:text-encre"
              @click="logout">
        <AppIcon name="logout"/>
      </button>
    </div>
  </nav>
</template>
