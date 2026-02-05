<script setup lang="ts">
import {ref} from "vue";

const users = ref([
  {
    id: 0,
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
    id: 1,
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
    id: 2,
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
    id: 3,
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
    id: 4,
    name: "Rosalind Franklin",
    phone1: "0665432109",
    phone2: "0665432109",
    email: "rosalind.franklin@mail.com",
    civility: "Mme.",
    postCode: "44000",
    city: "Nantes",
    subdivision: "Pays de la Loire",
    country: "France",
  },
  {
    id: 5,
    name: "Rosalind Franklin",
    phone1: "0665432109",
    phone2: "0665432109",
    email: "rosalind.franklin@mail.com",
    civility: "Mme.",
    postCode: "44000",
    city: "Nantes",
    subdivision: "Pays de la Loire",
    country: "France",
  },
  {
    id: 6,
    name: "Rosalind Franklin",
    phone1: "0665432109",
    phone2: "0665432109",
    email: "rosalind.franklin@mail.com",
    civility: "Mme.",
    postCode: "44000",
    city: "Nantes",
    subdivision: "Pays de la Loire",
    country: "France",
  },
  {
    id: 7,
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
]);

const modalClientDetails = ref({
  id: 0,
  name: "",
  phone1: "",
  phone2: "",
  email: "",
  civility: "",
  postCode: "",
  city: "",
  subdivision: "",
  country: "",
});

const modalCreationClient = ref(false);

const value = ref("");

const fields = reactive({
  first: modalClientDetails.value.civility,
})

const openModal = (client: {
  id: number;
  name: string;
  phone1: string;
  phone2: string;
  email: string;
  civility: string;
  postCode: string;
  city: string;
  subdivision: string;
  country: string;
}) => {
  modalClientDetails.value = client;
  modalCreationClient.value = true;
}

const closeModal = () => {
  modalCreationClient.value = false;
  modalClientDetails.value = {
    id: users.value.length,
    name: "",
    phone1: "",
    phone2: "",
    email: "",
    civility: "",
    postCode: "",
    city: "",
    subdivision: "",
    country: "",
  };
}
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
          <BaseButton size="md" variant="primary" class="w-fit flex"
                      @click="modalCreationClient = !modalCreationClient">
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
                  <h3 class="text-black font-semibold">{{ user.civility + " " + user.name }}</h3>
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
                <BaseButton @click="openModal(user)">
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
    <Modal :is-visible="modalCreationClient" @close-modal="closeModal">
      <div class="flex flex-col w-full h-140 gap-4 overflow-auto px-4 py-2">
        <h2 class="text-black font-bold text-2xl mb-4">Créer un nouveau client</h2>
        <div class="flex flex-col gap-4">
          <div class="flex flex-row w-full gap-2 items-center">
            <div class="flex flex-col w-fit">
              <label for="civility">Civilité :</label>
              <BaseAutocomplete variant="default" label="Civilité" id="civility" rounded="md" v-model="fields.first">
                <BaseAutocompleteItem value="M.">M.</BaseAutocompleteItem>
                <BaseAutocompleteItem value="Mme.">Mme.</BaseAutocompleteItem>
                <BaseAutocompleteItem value="Mlle.">Mlle.</BaseAutocompleteItem>
                <BaseAutocompleteItem value="Mme.">Autre</BaseAutocompleteItem>
              </BaseAutocomplete>
            </div>
            <div class="flex flex-col w-full">
              <label for="fullName">Nom Complet :</label>
              <BaseInput placeholder="Jean Durand" rounded="md" id="fullName" :modelValue="modalClientDetails.name"/>
            </div>
          </div>
          <div class="flex flex-row w-full gap-2 items-center">
            <div class="flex flex-col w-full gap-2">
              <label for="phone1">Téléphone 1 :</label>
              <BaseInput placeholder="01 23 45 67 89" rounded="md" id="phone1" :modelValue="modalClientDetails.phone1"/>
            </div>
            <div class="flex flex-col w-full gap-2">
              <label for="phone2">Téléphone 2 :</label>
              <BaseInput placeholder="98 76 54 32 10" rounded="md" id="phone2" :modelValue="modalClientDetails.phone2"/>
            </div>
          </div>
          <label for="email">Email :</label>
          <BaseInput placeholder="Email" rounded="md" id="email" :modelValue="modalClientDetails.email"/>
          <div class="flex flex-row w-full gap-2 items-center">
            <div class="flex flex-col gap-2">
              <label for="postalCode">Code Postal :</label>
              <BaseInput placeholder="Code Postal" rounded="md" id="postalCode"
                         :modelValue="modalClientDetails.postCode"/>
            </div>
            <div class="flex flex-col w-full gap-2">
              <label for="city">Ville :</label>
              <BaseInput placeholder="Ville" rounded="md" id="city" :modelValue="modalClientDetails.city"/>
            </div>
          </div>
          <div class="flex flex-row w-full gap-2">
            <div class="flex flex-col gap-2 w-fit">
              <label for="subdivision">Subdivision :</label>
              <BaseInput placeholder="Région/Subdivision" rounded="md" id="subdivision"
                         :modelValue="modalClientDetails.subdivision"/>
            </div>
            <div class="flex flex-col gap-2 w-full">
              <label for="country">Pays :</label>
              <BaseInput placeholder="Pays" rounded="md" id="country" :modelValue="modalClientDetails.country"/>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  </Overlay>
</template>

<style scoped>

</style>