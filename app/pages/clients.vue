<script setup lang="ts">
import type {TableColumn} from "~/utils/table";

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

const query = ref("");

const columns: TableColumn[] = [
  {key: "name", label: "Client"},
  {key: "city", label: "Localisation", hideBelow: "lg"},
  {key: "phone1", label: "Téléphone", hideBelow: "md"},
  {key: "email", label: "Email", hideBelow: "xl"},
];

const filteredUsers = computed(() => filterRows(users.value, query.value, ["name", "city", "email", "phone1", "phone2", "postCode"]));

const isEditing = computed(() => users.value.some(u => u.id === modalClientDetails.value.id));

const initials = (name: string) => name.split(" ").map(part => part[0]).join("").slice(0, 2).toUpperCase();

const formatPhone = (phone: string) => phone.replace(/(\d{2})(?=\d)/g, "$1 ");

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
  modalClientDetails.value = JSON.parse(JSON.stringify(client));
  modalCreationClient.value = true;
}

const closeModal = () => {
  modalCreationClient.value = false;
  modalClientDetails.value = {
    id: Math.max(-1, ...users.value.map(u => u.id)) + 1,
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

const deleteClient = (clientId: number) => {
  users.value = users.value.filter(client => client.id !== clientId);
}

const saveClient = () => {
  const existingClientIndex = users.value.findIndex(client => client.id === modalClientDetails.value.id);
  if (existingClientIndex !== -1) {
    users.value[existingClientIndex] = {...modalClientDetails.value};
  } else {
    users.value.push({...modalClientDetails.value});
  }
  closeModal();
}
</script>

<template>
  <AppOverlay>
    <AppPage eyebrow="Relation" title="Clients">
      <template #actions>
        <AppButton icon="plus" @click="closeModal(); modalCreationClient = true">Nouveau client</AppButton>
      </template>

      <AppTable :columns="columns" :rows="filteredUsers" :row-key="u => u.id"
                :count-label="['client', 'clients']" empty-label="Aucun client ne correspond à la recherche.">
        <template #toolbar>
          <AppSearchField v-model="query" placeholder="Rechercher un nom, une ville, un email…" class="max-w-[460px]"/>
        </template>
        <template #cell-name="{ row }">
          <div class="flex items-center gap-3">
            <div class="flex size-10 shrink-0 items-center justify-center rounded-full bg-sable font-serif text-[15px]">
              {{ initials(row.name) }}
            </div>
            <div class="flex min-w-0 flex-col">
              <span class="font-medium">{{ row.civility }} {{ row.name }}</span>
              <span class="text-[13px] text-taupe lg:hidden">{{ row.city }}</span>
            </div>
          </div>
        </template>
        <template #cell-city="{ row }">
          <div class="flex flex-col">
            <span>{{ row.postCode }} {{ row.city }}</span>
            <span class="text-[13px] text-taupe">{{ row.subdivision }}, {{ row.country }}</span>
          </div>
        </template>
        <template #cell-phone1="{ row }">
          <div class="flex flex-col tabular-nums">
            <span>{{ formatPhone(row.phone1) }}</span>
            <span v-if="row.phone2 && row.phone2 !== row.phone1" class="text-[13px] text-taupe">{{ formatPhone(row.phone2) }}</span>
          </div>
        </template>
        <template #cell-email="{ row }">
          <a :href="`mailto:${row.email}`" class="text-brun hover:text-bordeaux">{{ row.email }}</a>
        </template>
        <template #actions="{ row }">
          <AppIconButton icon="pencil" label="Modifier" @click="openModal(row)"/>
          <AppIconButton icon="trash" label="Supprimer" tone="danger" @click="deleteClient(row.id)"/>
        </template>
      </AppTable>
    </AppPage>

    <AppModal :is-visible="modalCreationClient" :title="isEditing ? 'Modifier le client' : 'Nouveau client'"
              @close-modal="closeModal" @save-modal="saveClient">
      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-4 sm:flex-row">
          <AppField label="Civilité" class="sm:max-w-40">
            <BaseSelect v-model="modalClientDetails.civility" placeholder="Choisir…">
              <BaseSelectItem value="M.">Monsieur</BaseSelectItem>
              <BaseSelectItem value="Mme.">Madame</BaseSelectItem>
              <BaseSelectItem value="Autre">Autre</BaseSelectItem>
            </BaseSelect>
          </AppField>
          <AppField label="Nom complet" for="fullName">
            <BaseInput id="fullName" v-model="modalClientDetails.name" placeholder="Jean Durand" rounded="md"/>
          </AppField>
        </div>
        <div class="flex flex-col gap-4 sm:flex-row">
          <AppField label="Téléphone 1" for="phone1">
            <BaseInput id="phone1" v-model="modalClientDetails.phone1" placeholder="01 23 45 67 89" rounded="md"/>
          </AppField>
          <AppField label="Téléphone 2" for="phone2">
            <BaseInput id="phone2" v-model="modalClientDetails.phone2" placeholder="06 12 34 56 78" rounded="md"/>
          </AppField>
        </div>
        <AppField label="Email" for="email">
          <BaseInput id="email" v-model="modalClientDetails.email" placeholder="jean.durand@mail.com" rounded="md"/>
        </AppField>
        <div class="flex flex-col gap-4 sm:flex-row">
          <AppField label="Code postal" for="postalCode" class="sm:max-w-40">
            <BaseInput id="postalCode" v-model="modalClientDetails.postCode" placeholder="75001" rounded="md"/>
          </AppField>
          <AppField label="Ville" for="city">
            <BaseInput id="city" v-model="modalClientDetails.city" placeholder="Paris" rounded="md"/>
          </AppField>
        </div>
        <div class="flex flex-col gap-4 sm:flex-row">
          <AppField label="Région" for="subdivision">
            <BaseInput id="subdivision" v-model="modalClientDetails.subdivision" placeholder="Île-de-France" rounded="md"/>
          </AppField>
          <AppField label="Pays" for="country">
            <BaseInput id="country" v-model="modalClientDetails.country" placeholder="France" rounded="md"/>
          </AppField>
        </div>
      </div>
    </AppModal>
  </AppOverlay>
</template>
