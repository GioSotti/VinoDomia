<script setup lang="ts">
import type {TableColumn} from "~/utils/table";
import type {BadgeTone} from "~/utils/status";
import type {ManagedUser} from "#shared/types/users";
import {isPasswordValid, PASSWORD_RULES} from "#shared/utils/password";
import {ADMIN_ROLE, ROLES, roleLabel} from "#shared/utils/roles";

definePageMeta({
  middleware: ["auth", "admin"],
});

useHead({title: "Utilisateurs · VinoDomia"});

const {request} = useAccount();
const {getPayload} = useAuth();

const ROLE_TONE: Record<number, BadgeTone> = {0: "info", 1: "succes", 2: "attention"};
const ROLE_OPTIONS = Object.entries(ROLES).map(([value, role]) => ({value: Number(value), label: role.label}));
const ROLE_HINT: Record<number, string> = {
  0: "Accès complet, gestion des utilisateurs",
  1: "Caisse, commandes, produits et clients",
  2: "Espace fournisseur : commandes et factures",
};

const inputClass = "h-11 w-full rounded-[10px] border border-lin bg-papier px-3.5 text-[15px] text-encre outline-none transition-colors placeholder:text-taupe/70 focus:border-encre focus:ring-2 focus:ring-sable";

const users = ref<ManagedUser[]>([]);
const loading = ref(true);
const loadError = ref("");
const query = ref("");
const roleFilter = ref<number | null>(null);
const notice = ref("");
const currentUserId = ref<number | null>(null);

const columns: TableColumn[] = [
  {key: "name", label: "Utilisateur"},
  {key: "role", label: "Rôle"},
  {key: "termsAcceptedAt", label: "Conditions", hideBelow: "lg"},
  {key: "createdAt", label: "Créé le", hideBelow: "md"},
];

async function loadUsers() {
  loading.value = true;
  loadError.value = "";
  try {
    users.value = await request<ManagedUser[]>("/api/users");
  } catch (error) {
    loadError.value = apiErrorMessage(error, "Impossible de charger les utilisateurs.");
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  currentUserId.value = getPayload()?.id ?? null;
  loadUsers();
});

const filteredUsers = computed(() => {
  const byRole = roleFilter.value === null ? users.value : users.value.filter(u => u.role === roleFilter.value);
  return filterRows(byRole, query.value, ["name", "email"]);
});

const countByRole = computed(() => {
  const counts: Record<number, number> = {};
  for (const user of users.value) counts[user.role] = (counts[user.role] ?? 0) + 1;
  return counts;
});

const isSelf = (user: ManagedUser) => user.id === currentUserId.value;

const modalOpen = ref(false);
const editing = ref<ManagedUser | null>(null);
const form = reactive({name: "", email: "", role: 1, password: ""});
const formState = reactive({saving: false, error: ""});
const showPassword = ref(false);

const rules = computed(() => PASSWORD_RULES.map(rule => ({id: rule.id, label: rule.label, ok: rule.test(form.password)})));
const editingSelf = computed(() => !!editing.value && isSelf(editing.value));

function openCreate() {
  editing.value = null;
  Object.assign(form, {name: "", email: "", role: 1, password: ""});
  formState.error = "";
  showPassword.value = false;
  modalOpen.value = true;
}

function openEdit(user: ManagedUser) {
  editing.value = user;
  Object.assign(form, {name: user.name ?? "", email: user.email, role: user.role, password: ""});
  formState.error = "";
  showPassword.value = false;
  modalOpen.value = true;
}

function generatePassword() {
  const sets = ["ABCDEFGHJKLMNPQRSTUVWXYZ", "abcdefghijkmnopqrstuvwxyz", "23456789", "!@#$%&*?-_"];
  const all = sets.join("");
  const random = (max: number) => crypto.getRandomValues(new Uint32Array(1))[0]! % max;
  const chars = sets.map(set => set[random(set.length)]!);
  while (chars.length < 16) chars.push(all[random(all.length)]!);
  for (let i = chars.length - 1; i > 0; i--) {
    const j = random(i + 1);
    [chars[i], chars[j]] = [chars[j]!, chars[i]!];
  }
  form.password = chars.join("");
  showPassword.value = true;
}

async function saveUser() {
  formState.error = "";

  if (!form.name.trim() || !form.email.trim()) {
    formState.error = "Le nom et l'adresse email sont obligatoires.";
    return;
  }
  if ((!editing.value || form.password) && !isPasswordValid(form.password)) {
    formState.error = editing.value
      ? "Le nouveau mot de passe ne respecte pas toutes les règles de sécurité."
      : "Choisissez un mot de passe qui respecte toutes les règles de sécurité.";
    return;
  }

  formState.saving = true;
  try {
    const body = {name: form.name, email: form.email, role: form.role, password: form.password || undefined};
    if (editing.value) {
      const updated = await request<ManagedUser>(`/api/users/${editing.value.id}`, {method: "PATCH", body});
      users.value = users.value.map(u => u.id === updated.id ? updated : u);
      notice.value = `${updated.name ?? updated.email} a été mis à jour.`;
    } else {
      const created = await request<ManagedUser>("/api/users", {method: "POST", body});
      users.value = [...users.value, created];
      notice.value = `${created.name ?? created.email} a été ajouté. Transmettez-lui son mot de passe par un moyen sûr.`;
    }
    modalOpen.value = false;
  } catch (error) {
    formState.error = apiErrorMessage(error);
  } finally {
    formState.saving = false;
  }
}

const toDelete = ref<ManagedUser | null>(null);
const deleteState = reactive({saving: false, error: ""});

function askDelete(user: ManagedUser) {
  toDelete.value = user;
  deleteState.error = "";
}

async function confirmDelete() {
  if (!toDelete.value) return;
  deleteState.saving = true;
  deleteState.error = "";
  try {
    const user = toDelete.value;
    await request(`/api/users/${user.id}`, {method: "DELETE"});
    users.value = users.value.filter(u => u.id !== user.id);
    notice.value = `${user.name ?? user.email} a été supprimé.`;
    toDelete.value = null;
  } catch (error) {
    deleteState.error = apiErrorMessage(error);
  } finally {
    deleteState.saving = false;
  }
}
</script>

<template>
  <AppOverlay>
    <AppPage eyebrow="Administration" title="Utilisateurs">
      <template #actions>
        <AppButton icon="plus" @click="openCreate">Nouvel utilisateur</AppButton>
      </template>

      <p v-if="loadError" role="alert"
         class="m-0 flex items-start gap-2 rounded-[10px] bg-alerte-bg px-3.5 py-3 text-sm text-alerte">
        <AppIcon name="alert" class="mt-px shrink-0"/>
        {{ loadError }}
      </p>

      <p v-if="notice" role="status"
         class="m-0 flex items-start gap-2 rounded-[10px] bg-succes-bg px-3.5 py-3 text-sm text-succes">
        <AppIcon name="check" class="mt-px shrink-0" :stroke="2"/>
        <span class="flex-1">{{ notice }}</span>
        <button type="button" aria-label="Fermer le message"
                class="-my-1 flex size-7 cursor-pointer items-center justify-center rounded-md border-0 bg-transparent text-succes hover:bg-papier/60"
                @click="notice = ''">
          <AppIcon name="close" :size="14" :stroke="2"/>
        </button>
      </p>

      <AppTable :columns="columns" :rows="filteredUsers" :row-key="u => u.id"
                :count-label="['utilisateur', 'utilisateurs']"
                :empty-label="loading ? 'Chargement…' : 'Aucun utilisateur ne correspond à la recherche.'">
        <template #toolbar>
          <AppSearchField v-model="query" placeholder="Rechercher un nom ou un email…" class="max-w-[460px]"/>
          <div role="group" aria-label="Filtrer par rôle" class="flex flex-wrap gap-1 rounded-xl bg-sable p-1">
            <button type="button" :aria-pressed="roleFilter === null"
                    class="h-9 cursor-pointer rounded-[9px] border-0 px-3 text-sm font-medium transition-colors"
                    :class="roleFilter === null ? 'bg-papier text-encre' : 'bg-transparent text-taupe-fonce hover:text-encre'"
                    @click="roleFilter = null">
              Tous <span class="text-taupe">{{ users.length }}</span>
            </button>
            <button v-for="option in ROLE_OPTIONS" :key="option.value" type="button"
                    :aria-pressed="roleFilter === option.value"
                    class="h-9 cursor-pointer rounded-[9px] border-0 px-3 text-sm font-medium transition-colors"
                    :class="roleFilter === option.value ? 'bg-papier text-encre' : 'bg-transparent text-taupe-fonce hover:text-encre'"
                    @click="roleFilter = option.value">
              {{ option.label }} <span class="text-taupe">{{ countByRole[option.value] ?? 0 }}</span>
            </button>
          </div>
        </template>

        <template #cell-name="{ row }">
          <div class="flex items-center gap-3">
            <div class="flex size-10 shrink-0 items-center justify-center rounded-full bg-sable font-serif text-[15px]">
              {{ initials(row.name ?? row.email) }}
            </div>
            <div class="flex min-w-0 flex-col">
              <span class="flex items-center gap-2 font-medium">
                {{ row.name || "Sans nom" }}
                <span v-if="isSelf(row)" class="rounded-full bg-encre px-2 py-px text-[11px] font-medium text-ivoire">Vous</span>
              </span>
              <span class="block max-w-[38vw] truncate text-[13px] text-taupe md:max-w-none">{{ row.email }}</span>
            </div>
          </div>
        </template>
        <template #cell-role="{ row }">
          <AppBadge :tone="ROLE_TONE[row.role] ?? 'neutre'">{{ roleLabel(row.role) || "Inconnu" }}</AppBadge>
        </template>
        <template #cell-termsAcceptedAt="{ row }">
          <span v-if="row.termsAcceptedAt" class="text-[14px] tabular-nums">Acceptées le {{ formatDate(row.termsAcceptedAt) }}</span>
          <span v-else class="text-[14px] text-taupe">En attente</span>
        </template>
        <template #cell-createdAt="{ row }">
          <span class="whitespace-nowrap tabular-nums">{{ formatDate(row.createdAt) }}</span>
        </template>
        <template #actions="{ row }">
          <div class="flex justify-end gap-1">
            <AppIconButton icon="pencil" label="Modifier" @click="openEdit(row)"/>
            <AppIconButton v-if="!isSelf(row)" icon="trash" label="Supprimer" tone="danger" @click="askDelete(row)"/>
            <span v-else class="size-9" aria-hidden="true"/>
          </div>
        </template>
      </AppTable>
    </AppPage>

    <AppModal :is-visible="modalOpen" :title="editing ? 'Modifier l\'utilisateur' : 'Nouvel utilisateur'" hide-save
              @close-modal="modalOpen = false">
      <form id="user-form" class="flex flex-col gap-5" novalidate @submit.prevent="saveUser">
        <div class="flex flex-col gap-4 sm:flex-row">
          <AppField label="Nom complet" for="user-name">
            <input id="user-name" v-model="form.name" type="text" autocomplete="off" placeholder="Jean Durand" :class="inputClass">
          </AppField>
          <AppField label="Adresse email" for="user-email">
            <input id="user-email" v-model="form.email" type="email" autocomplete="off" placeholder="jean@cave.fr" :class="inputClass">
          </AppField>
        </div>

        <fieldset class="m-0 flex flex-col gap-2 border-0 p-0">
          <legend class="mb-1.5 p-0 text-sm font-medium text-taupe-fonce">Rôle</legend>
          <div class="grid gap-2 sm:grid-cols-3">
            <label v-for="option in ROLE_OPTIONS" :key="option.value"
                   class="flex items-start gap-3 rounded-[12px] border p-3.5 transition-colors"
                   :class="[
                     form.role === option.value ? 'border-encre bg-ivoire' : 'border-lin',
                     editingSelf && option.value !== ADMIN_ROLE ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:border-grege',
                   ]">
              <input v-model="form.role" type="radio" name="user-role" :value="option.value"
                     :disabled="editingSelf && option.value !== ADMIN_ROLE"
                     class="mt-0.5 size-4 cursor-pointer accent-encre">
              <span class="flex flex-col gap-0.5">
                <span class="text-[15px] font-medium">{{ option.label }}</span>
                <span class="text-[13px] leading-snug text-taupe">{{ ROLE_HINT[option.value] }}</span>
              </span>
            </label>
          </div>
          <p v-if="editingSelf" class="m-0 text-[13px] text-taupe">Vous ne pouvez pas changer votre propre rôle.</p>
        </fieldset>

        <AppField :label="editing ? 'Nouveau mot de passe' : 'Mot de passe'" for="user-password">
          <div class="flex gap-2">
            <div class="flex h-11 min-w-0 flex-1 items-center rounded-[10px] border border-lin bg-papier pr-1 transition-colors focus-within:border-encre focus-within:ring-2 focus-within:ring-sable">
              <input id="user-password" v-model="form.password" :type="showPassword ? 'text' : 'password'" autocomplete="new-password"
                     :placeholder="editing ? 'Laisser vide pour ne pas le changer' : ''"
                     aria-describedby="user-password-rules"
                     class="h-full min-w-0 flex-1 border-0 bg-transparent px-3.5 text-[15px] text-encre outline-none placeholder:text-taupe/70">
              <AppIconButton :icon="showPassword ? 'eyeOff' : 'eye'"
                             :label="showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'"
                             @click="showPassword = !showPassword"/>
            </div>
            <AppButton variant="ghost" @click="generatePassword">Générer</AppButton>
          </div>
          <ul v-if="!editing || form.password" id="user-password-rules"
              class="m-0 mt-1 grid list-none grid-cols-2 gap-x-3 gap-y-1 p-0 text-[13px] sm:grid-cols-3">
            <li v-for="rule in rules" :key="rule.id" class="flex items-center gap-1.5"
                :class="rule.ok ? 'text-succes' : 'text-taupe'">
              <AppIcon :name="rule.ok ? 'check' : 'close'" :size="14" :stroke="2"/>
              {{ rule.label }}
            </li>
          </ul>
        </AppField>

        <p v-if="!editing" class="m-0 text-[13px] leading-relaxed text-taupe">
          Transmettez ce mot de passe à l'utilisateur par un moyen sûr. Il pourra le changer dans ses paramètres.
        </p>

        <p v-if="formState.error" role="alert" class="m-0 flex items-start gap-2 rounded-[10px] bg-alerte-bg px-3.5 py-3 text-sm text-alerte">
          <AppIcon name="alert" class="mt-px shrink-0"/>
          {{ formState.error }}
        </p>
      </form>

      <template #primary>
        <AppButton type="submit" form="user-form" :disabled="formState.saving" class="disabled:cursor-wait disabled:opacity-70">
          {{ formState.saving ? "Enregistrement…" : editing ? "Enregistrer" : "Ajouter l'utilisateur" }}
        </AppButton>
      </template>
    </AppModal>

    <AppModal :is-visible="!!toDelete" title="Supprimer l'utilisateur" hide-save @close-modal="toDelete = null">
      <div class="flex flex-col gap-4">
        <p class="m-0 text-[15px] leading-relaxed text-taupe-fonce">
          Le compte de <strong class="text-encre">{{ toDelete?.name || toDelete?.email }}</strong>
          ({{ toDelete?.email }}) sera supprimé définitivement. Cette personne ne pourra plus se connecter.
        </p>
        <p v-if="deleteState.error" role="alert" class="m-0 flex items-start gap-2 rounded-[10px] bg-alerte-bg px-3.5 py-3 text-sm text-alerte">
          <AppIcon name="alert" class="mt-px shrink-0"/>
          {{ deleteState.error }}
        </p>
      </div>
      <template #primary>
        <button type="button" :disabled="deleteState.saving"
                class="inline-flex h-11 cursor-pointer items-center justify-center rounded-[10px] border-0 bg-alerte px-[18px] text-[15px] font-medium text-papier transition-colors hover:opacity-90 disabled:cursor-wait disabled:opacity-70"
                @click="confirmDelete">
          {{ deleteState.saving ? "Suppression…" : "Supprimer" }}
        </button>
      </template>
    </AppModal>
  </AppOverlay>
</template>
