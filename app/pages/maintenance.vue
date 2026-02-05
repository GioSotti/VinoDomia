<script setup lang="ts">

const users = [
  {
    name: "Jean Dupont",
    phone1: "0612345678",
    phone2: "0612345678",
    email: "jean.dupont@mail.com",
    civility: "M.",
    postCode: "75001",
    city: "Paris",
    subdivition: "Île-de-France",
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
    subdivition: "Auvergne-Rhône-Alpes",
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
    subdivition: "Provence-Alpes-Côte d'Azur",
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
    subdivition: "Occitanie",
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
  }
];

import Overlay from "~/components/Overlay.vue";

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
  <Overlay :focus-page="3">
    <div>
      <div class="flex flex-col w-full p-8 gap-2 h-full">
        <div class="flex flex-row flex-wrap w-full text-black font-bold text-3xl items-center justify-between gap-2">
          <h1>Maintenance & Service</h1>
        </div>
        <BaseTabs
            class="w-full"
            default-value="system"
            variant="primary"
            :tabs="[{ label: 'Système', value: 'system' }, { label: 'Clients', value: 'clients' }, { label: 'Sauvegardes', value: 'saves' }, { label: 'Logs', value: 'logs' }]">
          <BaseTabsContent value="system">
            <BaseCard class="w-full h-full p-4 flex flex-col gap-3">
              <h2 class="font-bold text-black">
                Version</h2>
              <div class="max-w-2/3">
                <BaseSelect placeholder="Sélectionner une version">
                  <BaseSelectItem v-for="item in versions" :key="item" :value="item">
                    {{ item }}
                  </BaseSelectItem>
                </BaseSelect>
              </div>
              <div>
                <h2 class="font-bold text-black">Licence Key</h2>
                <h3>Licence pour utiliser le logiciel</h3>
              </div>
              <BaseInput rounded="md" placeholder="XXXX - XXXX - XXXX - XXXX - XXXX" class="max-w-2/3"/>
              <div class="flex flex-row items-center gap-2">
                <Icon name="lets-icons:check-fill" class="bg-green-500 size-5"/>
                <h3 class="text-sm">Status Activation</h3>
              </div>
            </BaseCard>
          </BaseTabsContent>
          <BaseTabsContent value="clients">
            <BaseCard variant="none" rounded="md"
                      class="px-5 py-4 bg-white border border-gray-300/50 flex flex-col w-full h-90 gap-2">
              <h2 class="text-black text-xl font-bold pb-6 shrink-0">Clients enregistrés</h2>

              <div class="flex flex-col w-full gap-3 overflow-y-auto flex-1">
                <div v-for="(user, key) in users" :key="key" class="flex flex-col w-full gap-3">
                  <div class="flex flex-row w-full gap-2 items-center justify-between pr-2">
                    <div class="flex flex-row items-center gap-2">
                      <div class="flex flex-col">
                        <h3 class="text-black font-semibold">{{ user.name }}</h3>
                        <h4 class="text-gray-500">
                          {{ user.postCode + ", " + user.city + ", " + user.subdivision + ", " + user.country }}</h4>
                      </div>
                    </div>
                    <div class="flex flex-row gap-4 items-center">
                      <div class="flex-col text-align text-right">
                        <h3 class="text-black font-semibold">
                          {{ "phone 1 : " + user.phone1 + " or phone 2 : " + user.phone2 }}</h3>
                        <h3 class="text-gray-500">{{ user.email }}</h3>
                      </div>
                      <BaseButton>
                        <Icon name="ic:baseline-edit" class="size-5"/>
                      </BaseButton>
                      <BaseButton>
                        <Icon name="ic:round-delete" class="size-5 bg-red-500"/>
                      </BaseButton>
                    </div>
                  </div>
                  <div class="w-full h-px bg-gray-300"
                       :class="{ 'hidden': key === users.length-1, 'block' : key !== users.length-1 }"></div>
                </div>
              </div>
            </BaseCard>
          </BaseTabsContent>
          <BaseTabsContent value="saves">
            <BaseCard class="w-full h-full">

            </BaseCard>
          </BaseTabsContent>
          <BaseTabsContent value="logs">
            <BaseCard class="w-full h-full">

            </BaseCard>
          </BaseTabsContent>
        </BaseTabs>
      </div>
    </div>
  </Overlay>
</template>
<style scoped>
</style>