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
  },
  {
    name: "Rosalind Franklin",
    phone1: "0665432109",
    phone2: "0665432109",
    email: "rosalind.franklin@mail.com",
    civility: "Mme.",
    postCode: "44000",
    city: "Nantes",
  },
  {
    name: "Rosalind Franklin",
    phone1: "0665432109",
    phone2: "0665432109",
    email: "rosalind.franklin@mail.com",
    civility: "Mme.",
    postCode: "44000",
    city: "Nantes",
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

const value = ref("");
</script>

<template>
  <Overlay :focus-page="0">
    <div class="flex flex-col w-full p-8 gap-5 h-full">
      <h1 class="text-black font-bold text-3xl">Clients enregistrés</h1>
      <BaseCard variant="none" rounded="md"
                class="px-5 py-4 bg-white border border-gray-300/50 flex flex-col w-full h-110 gap-2">
        <div class="flex flex-row w-full gap-4 items-center mb-6">
          <BaseInput
              v-model="value"
              rounded="md"
              placeholder="Rechercher un client..."
          />
          <BaseButton size="md" variant="primary" class="w-fit flex gap-2">
            <Icon name="ic:baseline-search" class="size-5"/>
            Rechercher
          </BaseButton>
          <span class="h-full w-0.5 bg-gray-500"></span>
          <BaseButton size="md" variant="primary" class="w-fit flex">
            <Icon name="ic:round-add-circle-outline" class="size-5"/>
            Ajouter un client
          </BaseButton>
        </div>
        <span class="w-full h-0.5 bg-gray-300 mb-5"></span>
        <div class="flex flex-col w-full gap-3 overflow-y-auto flex-1">
          <div v-for="(user, key) in users" :key="key" class="flex flex-col w-full gap-3">
            <div class="flex flex-row w-full gap-2 items-center justify-between pr-2">
              <div class="flex flex-row items-center gap-2">
                <div class="flex flex-col">
                  <h3 class="text-black font-semibold">{{ user.name }}</h3>
                  <h4 class="text-gray-500">
                    {{ user.postCode + ", " + user.city + ", " + user.subdivition + ", " + user.country }}</h4>
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
    </div>
  </Overlay>
</template>

<style scoped>

</style>