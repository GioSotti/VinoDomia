<script setup lang="ts">
import type {TableColumn} from "~/utils/table";

const users = [
  {
    name: "Jean Dupont",
    phone1: "0612345678",
    phone2: "0612345678",
    email: "jean.dupont@mail.com",
    civility: "M.",
    postCode: "75001",
    city: "Paris",
    subdivision: "Île-de-France",
    country: "France",
  },
  {
    name: "Marie Curie",
    phone1: "0698765432",
    phone2: "0698765432",
    email: "marie.curie@mail.com",
    civility: "Mme.",
    postCode: "69001",
    city: "Lyon",
    subdivision: "Auvergne-Rhône-Alpes",
    country: "France",
  },
  {
    name: "Albert Einstein",
    phone1: "0687654321",
    phone2: "0687654321",
    email: "albert.einstein@mail.com",
    civility: "M.",
    postCode: "13001",
    city: "Marseille",
    subdivision: "Provence-Alpes-Côte d'Azur",
    country: "France",
  },
  {
    name: "Isaac Newton",
    phone1: "0676543210",
    phone2: "0676543210",
    email: "isaac.newton@mail.com",
    civility: "M.",
    postCode: "31000",
    city: "Toulouse",
    subdivision: "Occitanie",
    country: "France",
  },
  {
    name: "Rosalind Franklin",
    phone1: "0665432109",
    phone2: "0665432109",
    email: "rosalind.franklin@mail.com",
    civility: "Mme.",
    postCode: "44000",
    city: "Nantes",
    subdivision: "Pays de la Loire",
    country: "France",
  }
];

const columns: TableColumn[] = [
  {key: "name", label: "Client"},
  {key: "city", label: "Localisation", hideBelow: "md"},
  {key: "email", label: "Email", hideBelow: "lg"},
];

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
          :tabs="[{ label: 'Système', value: 'system' }, { label: 'Clients', value: 'clients' }, { label: 'Sauvegardes', value: 'saves' }, { label: 'Logs', value: 'logs' }]">
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
        <BaseTabsContent value="clients">
          <div class="mt-4">
            <AppTable :columns="columns" :rows="users" :row-key="u => u.email + u.name"
                      :count-label="['client', 'clients']">
              <template #cell-name="{ row }">
                <div class="flex flex-col">
                  <span class="font-medium">{{ row.civility }} {{ row.name }}</span>
                  <span class="text-[13px] tabular-nums text-taupe">{{ row.phone1 }}</span>
                </div>
              </template>
              <template #cell-city="{ row }">
                <div class="flex flex-col">
                  <span>{{ row.postCode }} {{ row.city }}</span>
                  <span class="text-[13px] text-taupe">{{ row.subdivision }}, {{ row.country }}</span>
                </div>
              </template>
              <template #cell-email="{ row }">
                <span class="text-brun">{{ row.email }}</span>
              </template>
              <template #actions>
                <AppIconButton icon="pencil" label="Modifier"/>
                <AppIconButton icon="trash" label="Supprimer" tone="danger"/>
              </template>
            </AppTable>
          </div>
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
