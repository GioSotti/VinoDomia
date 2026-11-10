<script setup lang="ts">
import type {TableColumn} from "~/utils/table";
import type {BadgeTone} from "~/utils/status";

type BillStatus = "En avance" | "En retard";

const remainingBills = ref(153);

const bills = ref([
  {id: 0, number: "INV-001", client: "Client A", date: "2024-01-01", amount: 500, status: "En avance" as BillStatus, checked: false},
  {id: 1, number: "INV-002", client: "Client B", date: "2024-01-05", amount: 750, status: "En retard" as BillStatus, checked: false},
  {id: 2, number: "INV-003", client: "Client C", date: "2024-01-10", amount: 300, status: "En retard" as BillStatus, checked: false},
  {id: 3, number: "INV-004", client: "Client D", date: "2024-01-15", amount: 450, status: "En avance" as BillStatus, checked: false},
]);

const STATUS_TONE: Record<BillStatus, BadgeTone> = {
  "En avance": "succes",
  "En retard": "alerte",
};

const query = ref("");
const statusFilter = ref<"" | BillStatus>("");

const columns: TableColumn[] = [
  {key: "select", label: "Sélection", class: "w-px"},
  {key: "number", label: "Numéro"},
  {key: "client", label: "Client"},
  {key: "date", label: "Date", hideBelow: "md"},
  {key: "amount", label: "Montant", align: "right"},
  {key: "status", label: "Statut", align: "right"},
];

const filteredBills = computed(() =>
    filterRows(bills.value, query.value, ["number", "client"])
        .filter(bill => !statusFilter.value || bill.status === statusFilter.value)
);

const allChecked = computed({
  get: () => filteredBills.value.length > 0 && filteredBills.value.every(bill => bill.checked),
  set: (value: boolean) => filteredBills.value.forEach(bill => bill.checked = value),
});

const selectedCount = computed(() => bills.value.filter(bill => bill.checked).length);
</script>

<template>
  <AppOverlay>
    <AppPage :eyebrow="`${remainingBills} à traiter`" title="Factures impayées">
      <template #actions>
        <AppButton variant="ghost" icon="download">Exporter</AppButton>
      </template>

      <AppTable :columns="columns" :rows="filteredBills" :row-key="b => b.id"
                :count-label="['facture', 'factures']" empty-label="Aucune facture ne correspond aux filtres.">
        <template #toolbar>
          <AppSearchField v-model="query" placeholder="Rechercher un numéro, un client…" class="max-w-[460px]"/>
          <label class="sr-only" for="status-filter">Statut</label>
          <select id="status-filter" v-model="statusFilter"
                  class="h-11 cursor-pointer rounded-[10px] border border-lin bg-papier px-3 text-[15px] text-encre">
            <option value="">Tous les statuts</option>
            <option value="En retard">En retard</option>
            <option value="En avance">En avance</option>
          </select>
          <p v-if="selectedCount" class="m-0 ml-auto text-sm text-taupe">
            {{ selectedCount }} sélectionnée{{ selectedCount > 1 ? "s" : "" }}
          </p>
        </template>
        <template #head-select>
          <input v-model="allChecked" type="checkbox" aria-label="Tout sélectionner" class="size-4 cursor-pointer accent-encre">
        </template>
        <template #cell-select="{ row }">
          <input v-model="row.checked" type="checkbox" :aria-label="`Sélectionner ${row.number}`"
                 class="size-4 cursor-pointer accent-encre">
        </template>
        <template #cell-number="{ row }">
          <span class="text-[13px] font-medium text-taupe">{{ row.number }}</span>
        </template>
        <template #cell-client="{ row }">
          <span class="font-medium">{{ row.client }}</span>
        </template>
        <template #cell-date="{ row }">
          <span class="whitespace-nowrap text-brun tabular-nums">{{ formatDate(row.date) }}</span>
        </template>
        <template #cell-amount="{ row }">
          <span class="whitespace-nowrap font-medium tabular-nums">{{ formatEuro(row.amount) }}</span>
        </template>
        <template #cell-status="{ row }">
          <AppBadge :tone="STATUS_TONE[row.status]">{{ row.status }}</AppBadge>
        </template>
        <template #actions>
          <AppIconButton icon="more" label="Plus d'actions"/>
        </template>
      </AppTable>
    </AppPage>
  </AppOverlay>
</template>
