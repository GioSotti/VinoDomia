<script setup lang="ts">
defineProps<{
  eyebrow: string
  title: string
  subtitle: string
}>()
</script>

<template>
  <div class="flex min-h-screen w-full bg-ivoire font-sans text-encre">
    <aside class="sticky top-0 hidden h-screen w-[44%] max-w-[640px] flex-col justify-between overflow-hidden bg-encre p-12 text-ivoire lg:flex">
      <img src="/images/logo/svg/vinodomia-logo-vertical-sable.svg" alt="VinoDomia" width="220" height="143"
           class="h-auto w-[220px]">

      <div class="flex flex-col gap-5">
        <p class="m-0 text-xs font-medium uppercase tracking-[0.16em] text-grege">Gestion de cave</p>
        <p class="m-0 max-w-md font-serif text-[40px] leading-[1.15]">
          Clients, cuvées, stock et caisse, réunis au même endroit.
        </p>
        <p class="m-0 max-w-md text-[15px] leading-relaxed text-grege">
          L'application pensée pour les cavistes, leurs vendeurs et les vignerons qui les fournissent.
        </p>
      </div>

      <p class="m-0 text-[13px] text-grege">© 2026 VinoDomia. Tous droits réservés.</p>

      <img src="/images/logo/svg/vinodomia-symbole-sable.svg" alt="" aria-hidden="true"
           class="pointer-events-none absolute -right-24 -bottom-16 w-[420px] opacity-[0.06]">
    </aside>

    <main class="flex flex-1 flex-col items-center justify-center px-4 py-12 sm:px-8">
      <div class="flex w-full max-w-[420px] flex-col gap-8">
        <img src="/images/logo/svg/vinodomia-logo-horizontal-encre.svg" alt="VinoDomia" width="215" height="43"
             class="h-auto w-[215px] lg:hidden">

        <div class="flex flex-col gap-2">
          <p class="m-0 text-xs font-medium uppercase tracking-[0.16em] text-taupe">{{ eyebrow }}</p>
          <h1 class="m-0 font-serif text-[36px] font-normal leading-tight">{{ title }}</h1>
          <p class="m-0 text-[15px] text-taupe">{{ subtitle }}</p>
        </div>

        <slot/>

        <nav aria-label="Informations légales"
             class="flex flex-wrap justify-center gap-x-4 gap-y-1 text-[13px] text-taupe">
          <NuxtLink to="/confidentialite" class="text-taupe hover:text-bordeaux">Confidentialité</NuxtLink>
          <NuxtLink to="/confidentialite#cookies" class="text-taupe hover:text-bordeaux">Cookies</NuxtLink>
          <NuxtLink to="/conditions-utilisation" class="text-taupe hover:text-bordeaux">Conditions d'utilisation</NuxtLink>
          <NuxtLink to="/mentions-legales" class="text-taupe hover:text-bordeaux">Mentions légales</NuxtLink>
        </nav>

        <p class="m-0 -mt-5 text-center text-[13px] text-taupe lg:hidden">© 2026 VinoDomia. Tous droits réservés.</p>
      </div>
    </main>
  </div>
</template>
