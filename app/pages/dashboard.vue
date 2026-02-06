<script setup lang="ts">
import SideBar from "~/sideBar.vue";
import Search from "~~/components/search.vue";

const name = ref("SCEA Château Montfin");
const unpayedBillsAmount = ref(153);
const tarifsUpdated = ref(31);
const ordersAmount = ref(20);

const ongoingActivities = ref([{
  id: 0,
  name: "test",
  remainingBills: 0,
  fileName: "SCEA Château Montfin",
  date: new Date("DD-MM-YYYY"),
}, {
  id: 1,
  name: "test",
  remainingBills: 0,
  fileName: "SCEA Château Montfin",
  date: new Date("DD-MM-YYYY"),
}, {
  id: 2,
  name: "test",
  remainingBills: 0,
  fileName: "SCEA Château Montfin",
  date: new Date("DD-MM-YYYY"),
}, {
  id: 3,
  name: "test",
  remainingBills: 0,
  fileName: "SCEA Château Montfin",
  date: new Date("DD-MM-YYYY"),
}, {
  id: 4,
  name: "test",
  remainingBills: 0,
  fileName: "SCEA Château Montfin",
  date: new Date("DD-MM-YYYY"),
}, {
  id: 5,
  name: "test",
  remainingBills: 0,
  fileName: "SCEA Château Montfin",
  date: new Date("DD-MM-YYYY"),
},
]);
</script>

<template>
  <Overlay>
    <!-- Page content -->
    <div class="flex flex-col w-full p-8 gap-10">
      <!-- First content top row -->
      <div class="flex flex-row flex-wrap w-full text-black font-bold text-3xl items-center justify-between gap-2">
        <h1>Dossier : {{ name }}</h1>
        <div class="flex flex-row gap-2">
          <BaseButton size="md" variant="none" class="border border-black">
            <Icon name="solar:bell-outline" class="size-5"/>
          </BaseButton>
          <BaseButton size="md" variant="primary">
            Nouvelle Action
          </BaseButton>
        </div>
      </div>
      <!-- Cards -->
      <div class="flex flex-col gap-5">
        <div class="flex flex-col xl:flex-row gap-6">
          <BaseCard variant="none" rounded="md"
                    class=" bg-red-500 border border-red-800 flex flex-col w-full gap-2 text-white">
            <div class="py-3 px-4">
              <!-- First row BaseCard content -->
              <div class="flex flex-row w-full gap-6 justify-between items-center">
                <h2 class="font-medium text-xl">Factures Impayées</h2>
                <BaseIconBox variant="none" class="bg-red-400">
                  <Icon name="solar:danger-triangle-bold" class="size-5 bg-white"/>
                </BaseIconBox>
              </div>
              <h2 class="text-5xl font-semibold">{{ unpayedBillsAmount }}</h2>
              <h3>Attention requise</h3></div>
            <!-- Bottom part BaseCard content -->
            <div class="flex flex-row gap-2 items-center bg-red-400 w-full p-3 rounded-b-md">
              <Icon name="solar:info-circle-bold"/>
              <h3>Factures impayées</h3>
            </div>
          </BaseCard>
          <BaseCard variant="none" rounded="md"
                    class=" bg-white border border-yellow-600 flex flex-col w-full gap-2 justify-between">
            <div class="py-3 px-4 text-black">
              <!-- First row BaseCard content -->
              <div class="flex flex-row w-full gap-6 justify-between items-center">
                <h2 class="font-medium text-xl">Mise à jour Tarifs</h2>
                <BaseIconBox variant="none" class="bg-yellow-100">
                  <Icon name="solar:star-bold" class="size-5 bg-yellow-600"/>
                </BaseIconBox>
              </div>
              <h2 class="text-5xl font-semibold">{{ tarifsUpdated }}</h2>
            </div>
            <!-- Bottom part BaseCard content -->
            <div class="flex flex-row gap-2 items-center bg-yellow-100 w-full p-3 rounded-b-md text-yellow-600">
              <Icon name="solar:info-circle-bold"/>
              <h3>Factures impayées</h3>
            </div>
          </BaseCard>
          <BaseCard variant="none" rounded="md"
                    class=" bg-white border border-blue-600 flex flex-col w-full gap-2 justify-between">
            <div class="py-3 px-4 text-black">
              <!-- First row BaseCard content -->
              <div class="flex flex-row w-full gap-6 justify-between items-center">
                <h2 class="font-medium text-xl">Commandes ce mois</h2>
                <BaseIconBox variant="none" class="bg-blue-100">
                  <Icon name="solar:danger-triangle-bold" class="size-5 bg-blue-600"/>
                </BaseIconBox>
              </div>
              <h2 class="text-5xl font-semibold">{{ ordersAmount }}</h2>
            </div>
            <!-- Bottom part BaseCard content -->
            <div class="flex flex-row gap-2 items-center bg-blue-100 w-full p-3 rounded-b-md text-blue-600">
              <Icon name="solar:info-circle-bold"/>
              <h3>Factures impayées</h3>
            </div>
          </BaseCard>
        </div>
        <!-- Ongoing activities-->
        <BaseCard variant="none" rounded="md"
                  class="px-5 py-4 bg-white border border-gray-300/50 flex flex-col w-full h-96 gap-2">
          <h2 class="text-black text-xl font-bold pb-6 shrink-0">Actions courantes récentes</h2>
          <div class="flex flex-col w-full gap-3 overflow-y-scroll flex-1">
            <div v-for="(activity, key) in ongoingActivities" :key="key" class="flex flex-col w-full gap-3">
              <div class="flex flex-row w-full gap-2 items-center justify-between">
                <div class="flex flex-row items-center gap-2">
                  <BaseIconBox rounded="full" variant="none" class="bg-gray-300" size="sm">
                    <Icon name="solar:file-bold" class="size-6 bg-gray-500"/>
                  </BaseIconBox>
                  <div class="flex flex-col">
                    <h3 class="text-black font-semibold">{{ activity.name }}</h3>
                    <h4 class="text-gray-500">{{ activity.remainingBills }} + actions</h4>
                  </div>
                </div>
                <h3 class="text-black font-semibold">{{ activity.fileName }}</h3>
                <h4 class="text-gray-500">{{ activity.date }}</h4>
              </div>
              <div class="w-full h-px bg-gray-300"
                   :class="{ 'hidden': key === ongoingActivities.length-1, 'block' : key !== ongoingActivities.length-1 }"></div>
            </div>
          </div>
        </BaseCard>

      </div>
    </div>
  </Overlay>
</template>