<script setup lang="ts">
import type {TableColumn} from "~/utils/table";

type Motif = "remise_banque" | "sortie_achat" | "retour_achat" | "entree_banque";

const formattedDate = new Date().toISOString().split("T")[0];

const motif = ref<Motif>("remise_banque");
const dateMovement = ref(formattedDate);
const soldeCaisseAvant = ref(30.00);
const valeurMovement = ref(0.00);

const MOTIFS: { value: Motif, label: string, message: string }[] = [
  {
    value: "remise_banque",
    label: "Remise en banque",
    message: "Remise d'espèces en banque : cette saisie va générer deux écritures en comptabilité générale.",
  },
  {
    value: "sortie_achat",
    label: "Sortie pour achat",
    message: "Sortie d'espèces pour achats divers : aucune écriture ne sera générée en comptabilité générale. Conservez les pièces d'achat et saisissez-les dans votre logiciel comptable. Si la somme n'est pas entièrement utilisée, pensez à réintégrer le reste (retour d'espèces en caisse).",
  },
  {
    value: "retour_achat",
    label: "Retour après achat",
    message: "Retour d'espèces en caisse après achat : vous réintégrez un reste non utilisé. Aucune écriture comptable n'est nécessaire.",
  },
  {
    value: "entree_banque",
    label: "Entrée depuis la banque",
    message: "Entrée d'espèces depuis la banque : cette saisie va générer deux écritures en comptabilité générale.",
  },
];

const mouvements = ref([
  {id: 0, date: "2024-01-15", valeur: 500, compte: "Caisse", debitCredit: "Débit", journal: "JV001"},
  {id: 1, date: "2024-01-10", valeur: 200, compte: "Banque", debitCredit: "Crédit", journal: "JV002"},
]);

const isSortie = computed(() => motif.value === "remise_banque" || motif.value === "sortie_achat");

const soldeCaisseApres = computed(() =>
    soldeCaisseAvant.value + (isSortie.value ? -valeurMovement.value : valeurMovement.value)
);

const messageMotif = computed(() => MOTIFS.find(m => m.value === motif.value)?.message ?? "");

const valider = () => {
  if (!valeurMovement.value) return;
  const nextId = Math.max(-1, ...mouvements.value.map(m => m.id)) + 1;
  mouvements.value.unshift({
    id: nextId,
    date: dateMovement.value ?? formattedDate ?? "",
    valeur: valeurMovement.value,
    compte: motif.value === "remise_banque" || motif.value === "entree_banque" ? "Banque" : "Caisse",
    debitCredit: isSortie.value ? "Débit" : "Crédit",
    journal: "JV" + String(nextId + 1).padStart(3, "0"),
  });
  soldeCaisseAvant.value = soldeCaisseApres.value;
  valeurMovement.value = 0.00;
};

const deleteMouvement = (mouvementId: number) => {
  mouvements.value = mouvements.value.filter(mouvement => mouvement.id !== mouvementId);
};

const columns: TableColumn[] = [
  {key: "journal", label: "N° journal"},
  {key: "date", label: "Date"},
  {key: "compte", label: "Compte"},
  {key: "debitCredit", label: "D / C", hideBelow: "md"},
  {key: "valeur", label: "Valeur", align: "right"},
];
</script>

<template>
  <AppOverlay>
    <AppPage eyebrow="Vente" title="Entrées / sorties d'espèces">
      <section class="grid gap-6 rounded-[14px] border border-lin bg-papier p-5 sm:p-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
        <fieldset class="m-0 flex flex-col gap-2 border-0 p-0">
          <legend class="mb-3 text-xs font-medium uppercase tracking-[0.12em] text-taupe">Motif</legend>
          <label v-for="m in MOTIFS" :key="m.value"
                 class="flex min-h-11 cursor-pointer items-center gap-3 rounded-[10px] border px-3.5 text-[15px] transition-colors"
                 :class="motif === m.value ? 'border-encre bg-sable font-medium' : 'border-lin hover:bg-ivoire'">
            <input v-model="motif" type="radio" :value="m.value" class="size-4 accent-encre">
            {{ m.label }}
          </label>
        </fieldset>

        <div class="flex flex-col gap-4">
          <AppField label="Date du mouvement" for="date-mouvement">
            <input id="date-mouvement" v-model="dateMovement" type="date"
                   class="h-11 rounded-[10px] border border-lin bg-papier px-3.5 text-[15px] text-encre">
          </AppField>
          <div class="grid gap-4 sm:grid-cols-3">
            <div class="flex flex-col gap-1.5">
              <span class="text-sm font-medium text-taupe-fonce">Solde avant</span>
              <span class="flex h-11 items-center justify-end rounded-[10px] bg-ivoire px-3.5 tabular-nums">{{ formatEuro(soldeCaisseAvant) }}</span>
            </div>
            <AppField label="Valeur du mouvement" for="valeur-mouvement">
              <input id="valeur-mouvement" v-model.number="valeurMovement" type="number" step="0.01" min="0"
                     class="h-11 rounded-[10px] border border-lin bg-papier px-3.5 text-right text-[15px] tabular-nums text-encre">
            </AppField>
            <div class="flex flex-col gap-1.5">
              <span class="text-sm font-medium text-taupe-fonce">Solde après</span>
              <span class="flex h-11 items-center justify-end rounded-[10px] bg-encre px-3.5 font-medium text-ivoire tabular-nums">{{ formatEuro(soldeCaisseApres) }}</span>
            </div>
          </div>
          <p v-if="messageMotif" class="m-0 rounded-[10px] bg-attention-bg px-4 py-3 text-sm leading-relaxed text-attention">
            {{ messageMotif }}
          </p>
          <div class="flex justify-end">
            <AppButton icon="check" @click="valider">Valider le mouvement</AppButton>
          </div>
        </div>
      </section>

      <div class="flex flex-col gap-3">
        <h2 class="m-0 font-serif text-[22px] font-normal">Historique des mouvements</h2>
        <AppTable :columns="columns" :rows="mouvements" :row-key="m => m.id"
                  :count-label="['mouvement', 'mouvements']" empty-label="Aucun mouvement enregistré.">
          <template #cell-journal="{ row }">
            <span class="text-[13px] font-medium text-taupe">{{ row.journal }}</span>
          </template>
          <template #cell-date="{ row }">
            <span class="tabular-nums">{{ formatDate(row.date) }}</span>
          </template>
          <template #cell-compte="{ row }">
            <span class="font-medium">{{ row.compte }}</span>
          </template>
          <template #cell-debitCredit="{ row }">
            <AppBadge :tone="row.debitCredit === 'Débit' ? 'alerte' : 'succes'">{{ row.debitCredit }}</AppBadge>
          </template>
          <template #cell-valeur="{ row }">
            <span class="whitespace-nowrap font-medium tabular-nums">{{ formatEuro(row.valeur) }}</span>
          </template>
          <template #actions="{ row }">
            <AppIconButton icon="trash" label="Supprimer" tone="danger" @click="deleteMouvement(row.id)"/>
          </template>
        </AppTable>
      </div>
    </AppPage>
  </AppOverlay>
</template>
