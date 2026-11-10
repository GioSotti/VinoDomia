<script setup lang="ts">
import {TERMS_VERSION} from '#shared/utils/legal'

const props = defineProps<{ title: string }>()

useHead({title: () => `${props.title} · VinoDomia`})

const {isAuthenticated} = useAuth()
const backTo = ref('/login')
onMounted(() => {
  if (isAuthenticated()) backTo.value = '/dashboard'
})

const updatedAt = new Date(TERMS_VERSION).toLocaleDateString('fr-FR', {day: 'numeric', month: 'long', year: 'numeric'})

const LINKS = [
  {to: '/confidentialite', label: 'Confidentialité'},
  {to: '/conditions-utilisation', label: "Conditions d'utilisation"},
  {to: '/mentions-legales', label: 'Mentions légales'},
]
</script>

<template>
  <div class="min-h-screen bg-ivoire font-sans text-encre">
    <header class="border-b border-lin bg-sable">
      <div class="mx-auto flex max-w-[860px] items-center justify-between gap-4 px-4 py-4 sm:px-8">
        <NuxtLink :to="backTo" class="flex">
          <img src="/images/logo/svg/vinodomia-logo-horizontal-encre.svg" alt="VinoDomia" width="180" height="36" class="h-auto w-[180px]">
        </NuxtLink>
        <AppButton variant="ghost" :to="backTo">Retour à l'application</AppButton>
      </div>
    </header>

    <main class="mx-auto flex max-w-[860px] flex-col gap-8 px-4 pt-10 pb-16 sm:px-8">
      <nav aria-label="Informations légales" class="flex flex-wrap gap-2">
        <NuxtLink v-for="link in LINKS" :key="link.to" :to="link.to"
                  class="rounded-full border border-lin bg-papier px-3.5 py-1.5 text-sm text-encre no-underline transition-colors hover:border-grege"
                  active-class="!border-encre !bg-encre !text-ivoire">
          {{ link.label }}
        </NuxtLink>
      </nav>

      <div class="flex flex-col gap-2">
        <p class="m-0 text-xs font-medium uppercase tracking-[0.16em] text-taupe">Dernière mise à jour : {{ updatedAt }}</p>
        <h1 class="m-0 font-serif text-[36px] font-normal leading-tight sm:text-[44px]">{{ title }}</h1>
      </div>

      <article class="legal-content rounded-[14px] border border-lin bg-papier px-5 py-6 sm:px-10 sm:py-10">
        <slot/>
      </article>
    </main>
  </div>
</template>

<style scoped>
.legal-content :deep(h2) {
  margin: 2.25rem 0 0.75rem;
  font-family: var(--font-serif);
  font-size: 24px;
  font-weight: 400;
  line-height: 1.3;
  scroll-margin-top: 1.5rem;
}

.legal-content :deep(h2:first-child) {
  margin-top: 0;
}

.legal-content :deep(h3) {
  margin: 1.5rem 0 0.5rem;
  font-size: 16px;
  font-weight: 600;
}

.legal-content :deep(p),
.legal-content :deep(li) {
  font-size: 15px;
  line-height: 1.7;
  color: var(--color-brun);
}

.legal-content :deep(p) {
  margin: 0 0 0.75rem;
}

.legal-content :deep(ul) {
  margin: 0 0 1rem;
  padding-left: 1.25rem;
  list-style: disc;
}

.legal-content :deep(li::marker) {
  color: var(--color-grege);
}

.legal-content :deep(li) {
  margin-bottom: 0.35rem;
}

.legal-content :deep(a) {
  color: var(--color-encre);
  text-decoration: underline;
  text-underline-offset: 2px;
}

.legal-content :deep(a:hover) {
  color: var(--color-bordeaux);
}

.legal-content :deep(table) {
  width: 100%;
  margin: 0.5rem 0 1rem;
  border-collapse: collapse;
  font-size: 14px;
}

.legal-content :deep(th),
.legal-content :deep(td) {
  padding: 0.6rem 0.75rem;
  border-top: 1px solid var(--color-lin);
  text-align: left;
  vertical-align: top;
  color: var(--color-brun);
}

.legal-content :deep(th) {
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-taupe);
  background: var(--color-ivoire);
}
</style>
