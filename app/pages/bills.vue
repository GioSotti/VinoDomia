<script setup lang="ts">

import {ref, watch} from "vue";

const name = ref("Factures impayées");
const remainingBills = ref(153);

const bills = ref([
  {
    id: 0,
    number: "INV-001",
    client: "Client A",
    date: "01-01-2024",
    amount: "$500",
    status: "En avance",
    checked: false,
  },
  {
    id: 1,
    number: "INV-002",
    client: "Client B",
    date: "05-01-2024",
    amount: "$750",
    status: "En retard",
    checked: false,
  },
  {
    id: 2,
    number: "INV-003",
    client: "Client C",
    date: "10-01-2024",
    amount: "$300",
    status: "En retard",
    checked: false,
  },
  {
    id: 3,
    number: "INV-004",
    client: "Client D",
    date: "15-01-2024",
    amount: "$450",
    status: "En avance",
    checked: false,
  },
]);
const allBills = ref(false);

watch(allBills, (val) => {
  bills.value.forEach(b => b.checked = val);
});

const fields = reactive({
  first: '',
})

const filters = [
  'Filter 1',
  'Filter 2',
  'Filter 3',
  'Filter 4',
]

</script>

<template>
  <AppOverlay :focus-page="0">
    <div class="flex flex-col w-full p-8 gap-10">
      <div class="flex flex-row flex-wrap w-full text-black font-bold text-3xl items-center justify-between gap-2">
        <h1>{{ name }} détail</h1>
        <div class="flex flex-row gap-2">
          <BaseButton size="md" variant="none" class="border border-black">
            <Icon name="solar:bell-outline" class="size-5"/>
          </BaseButton>
          <BaseButton size="md" variant="primary">Nouvelle Action</BaseButton>
        </div>
      </div>

      <BaseCard variant="none" rounded="md"
                class="py-4 bg-white border border-gray-300/50 flex flex-col w-full h-auto gap-2 px-0 max-w-none min-w-0">
        <div class="px-5">
          <h2 class="text-black text-xl font-bold pb-6 shrink-0">{{ name }} ({{ remainingBills }})</h2>
          <div class="flex flex-row justify-between w-full mb-4 gap-4 shrink-0">
            <div class="w-1/4 min-w-0">
              <BaseAutocomplete placeholder="Ex: nom du client" v-model="fields.first">
                <BaseAutocompleteItem v-for="item in filters" :key="item" :value="item">
                  {{ item }}
                </BaseAutocompleteItem>
              </BaseAutocomplete>
            </div>
            <div class="flex flex-row justify-between gap-2">
              <BaseDropdown variant="default" label="Filtres">
                <BaseDropdownItem>Filtre 1</BaseDropdownItem>
                <BaseDropdownItem>Filtre 2</BaseDropdownItem>
                <BaseDropdownItem>Filtre 3</BaseDropdownItem>
                <BaseDropdownItem>Filtre 4</BaseDropdownItem>
              </BaseDropdown>
              <BaseDropdown variant="default" label="Export">
                <BaseDropdownItem>PDF</BaseDropdownItem>
                <BaseDropdownItem>EXCEL</BaseDropdownItem>
                <BaseDropdownItem>JSON</BaseDropdownItem>
              </BaseDropdown>
            </div>
          </div>
        </div>

        <!-- Grid -->
        <div class="grid items-center w-full py-2 mb-4 font-semibold bg-gray-200 border border-gray-500 gap-x-4
                      grid-cols-[48px_150px_1fr_120px_120px_120px_48px] px-5">
          <div class="justify-self-center">
            <BaseCheckbox v-model="allBills"/>
          </div>
          <div class="justify-self-start">Numéro</div>
          <div class="justify-self-start truncate">Client</div>
          <div class="justify-self-end">Date</div>
          <div class="justify-self-end">Montant</div>
          <div class="justify-self-end">Status</div>
          <div class="justify-self-center"></div>
        </div>

        <!-- Rows: same grid template so columns align perfectly -->
        <div class="flex flex-col w-full gap-4 overflow-y-auto flex-1 min-w-0 px-5">
          <div v-for="(bill, key) in bills" :key="key"
               class="grid items-center w-full gap-2 grid-cols-[48px_150px_1fr_120px_120px_120px_48px]">
            <div class="justify-self-center">
              <BaseCheckbox v-model="bill.checked"/>
            </div>
            <div class="justify-self-start truncate min-w-0">{{ bill.number }}</div>
            <div class="justify-self-start truncate min-w-0">{{ bill.client }}</div>
            <div class="justify-self-end truncate min-w-0">{{ bill.date }}</div>
            <div class="justify-self-end truncate min-w-0">{{ bill.amount }}</div>
            <div class="justify-self-end truncate min-w-0 px-2 py-1 rounded-2xl"
                 :class="[{ 'bg-red-100 text-red-800': bill.status === 'En retard', 'bg-green-100 text-green-600': bill.status !== 'En retard' }]">
              {{ bill.status }}
            </div>
            <div class="justify-self-center">
              <BaseButton variant="none" size="icon-sm" class="p-2">
                <Icon name="solar:menu-dots-bold" class="size-5 text-gray-500"/>
              </BaseButton>
            </div>

            <!-- Separator -->
            <div :class="[{ 'hidden': key === bills.length - 1 }, 'col-span-full h-px bg-gray-300 w-full']"></div>
          </div>
        </div>
      </BaseCard>
    </div>
  </AppOverlay>
</template>

<style scoped>

</style>