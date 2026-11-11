<script setup lang="ts">
const licenceKey = ref("");

const versions = [
  "1.0.0",
  "1.1.0",
  "1.2.0",
  "2.0.0",
  "2.1.0",
  "3.0.0",
];
</script>

<template>
  <AppOverlay>
    <AppPage eyebrow="Administration" title="Maintenance & service">
      <BaseTabs
          class="w-full"
          default-value="system"
          variant="primary"
          :tabs="[{ label: 'Système', value: 'system' }, { label: 'Sauvegardes', value: 'saves' }, { label: 'Logs', value: 'logs' }]">
        <BaseTabsContent value="system">
          <section class="mt-4 grid gap-6 rounded-[14px] border border-lin bg-papier p-5 text-encre sm:p-6 lg:grid-cols-2">
            <div class="flex flex-col gap-3">
              <h2 class="m-0 font-serif text-[22px] font-normal">Version</h2>
              <p class="m-0 text-[15px] text-taupe">Version du logiciel installée sur ce poste.</p>
              <BaseSelect placeholder="Sélectionner une version">
                <BaseSelectItem v-for="item in versions" :key="item" :value="item">{{ item }}</BaseSelectItem>
              </BaseSelect>
            </div>
            <div class="flex flex-col gap-3">
              <h2 class="m-0 font-serif text-[22px] font-normal">Clé de licence</h2>
              <p class="m-0 text-[15px] text-taupe">Licence nécessaire pour utiliser le logiciel.</p>
              <BaseInput v-model="licenceKey" rounded="md" placeholder="XXXX - XXXX - XXXX - XXXX - XXXX" aria-label="Clé de licence"/>
              <div>
                <AppBadge tone="succes">Licence activée</AppBadge>
              </div>
            </div>
          </section>
        </BaseTabsContent>
        <BaseTabsContent value="saves">
          <p class="mt-4 rounded-[14px] border border-dashed border-grege bg-papier p-7 text-[15px] text-taupe">
            Aucune sauvegarde pour l'instant.
          </p>
        </BaseTabsContent>
        <BaseTabsContent value="logs">
          <p class="mt-4 rounded-[14px] border border-dashed border-grege bg-papier p-7 text-[15px] text-taupe">
            Aucun log à afficher.
          </p>
        </BaseTabsContent>
      </BaseTabs>
    </AppPage>
  </AppOverlay>
</template>
