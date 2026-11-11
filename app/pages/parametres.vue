<script setup lang="ts">
import type {Account} from "#shared/types/account";
import {isPasswordValid, PASSWORD_RULES} from "#shared/utils/password";
import type {IconName} from "~/utils/navigation";
import {roleLabel} from "#shared/utils/roles";

definePageMeta({
  middleware: "auth",
});

useHead({title: "Paramètres · VinoDomia"});

const {account, loadAccount, request} = useAccount();
const {saveToken, clearToken} = useAuth();

const SECTIONS: { id: string, label: string, icon: IconName }[] = [
  {id: "profil", label: "Profil", icon: "user"},
  {id: "securite", label: "Sécurité", icon: "lock"},
  {id: "donnees", label: "Données personnelles", icon: "shield"},
];

const inputClass = "h-11 w-full rounded-[10px] border border-lin bg-papier px-3.5 text-[15px] text-encre outline-none transition-colors placeholder:text-taupe/70 focus:border-encre focus:ring-2 focus:ring-sable";

const loadError = ref("");

const profileForm = reactive({name: "", email: "", currentPassword: ""});
const profileState = reactive({saving: false, error: "", success: ""});

const passwordForm = reactive({currentPassword: "", newPassword: "", confirm: ""});
const passwordState = reactive({saving: false, error: "", success: ""});
const showPasswords = ref(false);

const deleteModal = ref(false);
const deleteForm = reactive({password: "", confirmed: false});
const deleteState = reactive({saving: false, error: ""});

function fillProfile(data: Account) {
  profileForm.name = data.name ?? "";
  profileForm.email = data.email;
  profileForm.currentPassword = "";
}

onMounted(async () => {
  try {
    fillProfile(await loadAccount(true));
  } catch (error) {
    loadError.value = apiErrorMessage(error, "Impossible de charger votre compte.");
  }
});

const emailChanged = computed(() => !!account.value && profileForm.email.trim().toLowerCase() !== account.value.email);
const profileDirty = computed(() => !!account.value && (profileForm.name.trim() !== (account.value.name ?? "") || emailChanged.value));

const rules = computed(() => PASSWORD_RULES.map(rule => ({id: rule.id, label: rule.label, ok: rule.test(passwordForm.newPassword)})));
const passwordsMatch = computed(() => passwordForm.confirm.length > 0 && passwordForm.confirm === passwordForm.newPassword);

const memberSince = computed(() => account.value ? formatDate(account.value.createdAt) : "");
const consent = computed(() => account.value?.termsAcceptedAt
  ? `le ${formatDate(account.value.termsAcceptedAt)}${account.value.termsVersion ? ` (version du ${formatDate(account.value.termsVersion)})` : ""}`
  : null);

async function saveProfile() {
  profileState.error = "";
  profileState.success = "";

  if (!profileForm.name.trim() || !profileForm.email.trim()) {
    profileState.error = "Le nom et l'adresse email sont obligatoires.";
    return;
  }
  if (emailChanged.value && !profileForm.currentPassword) {
    profileState.error = "Saisissez votre mot de passe actuel pour changer d'adresse email.";
    return;
  }

  profileState.saving = true;
  try {
    const result = await request<{ account: Account, token?: string }>("/api/account", {
      method: "PATCH",
      body: {name: profileForm.name, email: profileForm.email, currentPassword: profileForm.currentPassword || undefined},
    });
    if (result.token) saveToken(result.token);
    account.value = result.account;
    fillProfile(result.account);
    profileState.success = "Vos informations ont été mises à jour.";
  } catch (error) {
    profileState.error = apiErrorMessage(error);
  } finally {
    profileState.saving = false;
  }
}

function resetProfile() {
  if (account.value) fillProfile(account.value);
  profileState.error = "";
  profileState.success = "";
}

async function savePassword() {
  passwordState.error = "";
  passwordState.success = "";

  if (!passwordForm.currentPassword) {
    passwordState.error = "Saisissez votre mot de passe actuel.";
    return;
  }
  if (!isPasswordValid(passwordForm.newPassword)) {
    passwordState.error = "Le nouveau mot de passe ne respecte pas toutes les règles de sécurité.";
    return;
  }
  if (!passwordsMatch.value) {
    passwordState.error = "Les deux mots de passe ne sont pas identiques.";
    return;
  }

  passwordState.saving = true;
  try {
    await request("/api/account/password", {
      method: "PUT",
      body: {currentPassword: passwordForm.currentPassword, newPassword: passwordForm.newPassword},
    });
    passwordForm.currentPassword = "";
    passwordForm.newPassword = "";
    passwordForm.confirm = "";
    passwordState.success = "Votre mot de passe a été modifié.";
  } catch (error) {
    passwordState.error = apiErrorMessage(error);
  } finally {
    passwordState.saving = false;
  }
}

function exportData() {
  if (!account.value) return;
  const data = {
    exportedAt: new Date().toISOString(),
    account: {...account.value, roleLabel: roleLabel(account.value.role)},
  };
  const url = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], {type: "application/json"}));
  const link = document.createElement("a");
  link.href = url;
  link.download = `vinodomia-mes-donnees-${new Date().toISOString().slice(0, 10)}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

function openDelete() {
  deleteForm.password = "";
  deleteForm.confirmed = false;
  deleteState.error = "";
  deleteModal.value = true;
}

async function confirmDelete() {
  deleteState.error = "";
  if (!deleteForm.password || !deleteForm.confirmed) {
    deleteState.error = "Saisissez votre mot de passe et cochez la case de confirmation.";
    return;
  }

  deleteState.saving = true;
  try {
    await request("/api/account", {method: "DELETE", body: {password: deleteForm.password}});
    clearToken();
    account.value = null;
    await navigateTo("/login");
  } catch (error) {
    deleteState.error = apiErrorMessage(error);
  } finally {
    deleteState.saving = false;
  }
}
</script>

<template>
  <AppOverlay>
    <AppPage eyebrow="Mon compte" title="Paramètres">
      <p v-if="loadError" role="alert"
         class="m-0 flex items-start gap-2 rounded-[10px] bg-alerte-bg px-3.5 py-3 text-sm text-alerte">
        <AppIcon name="alert" class="mt-px shrink-0"/>
        {{ loadError }}
      </p>

      <div class="grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-10">
        <nav aria-label="Sections des paramètres"
             class="flex gap-1 overflow-x-auto lg:sticky lg:top-6 lg:flex-col lg:self-start">
          <a v-for="section in SECTIONS" :key="section.id" :href="`#${section.id}`"
             class="flex min-h-11 shrink-0 items-center gap-3 rounded-[10px] px-3 text-[15px] text-encre no-underline transition-colors hover:bg-sable">
            <AppIcon :name="section.icon" class="text-taupe"/>
            {{ section.label }}
          </a>
        </nav>

        <div class="flex min-w-0 flex-col gap-6">
          <section id="profil" class="scroll-mt-6 rounded-[14px] border border-lin bg-papier">
            <header class="flex flex-wrap items-center gap-4 border-b border-lin px-5 py-5 sm:px-6">
              <div class="flex size-14 shrink-0 items-center justify-center rounded-full bg-encre font-serif text-xl text-ivoire">
                {{ initials(account?.name) }}
              </div>
              <div class="flex min-w-0 flex-1 flex-col gap-0.5">
                <div class="flex flex-wrap items-center gap-2.5">
                  <h2 class="m-0 font-serif text-[22px] font-normal">Profil</h2>
                  <AppBadge v-if="account" tone="neutre">{{ roleLabel(account.role) }}</AppBadge>
                </div>
                <p class="m-0 text-sm text-taupe">
                  Votre nom et l'adresse email utilisée pour vous connecter.
                  <template v-if="memberSince"> Membre depuis le {{ memberSince }}.</template>
                </p>
              </div>
            </header>

            <form class="flex flex-col gap-5 px-5 py-5 sm:px-6" novalidate @submit.prevent="saveProfile">
              <div class="flex flex-col gap-5 sm:flex-row">
                <AppField label="Nom complet" for="settings-name">
                  <input id="settings-name" v-model="profileForm.name" type="text" autocomplete="name" :class="inputClass">
                </AppField>
                <AppField label="Adresse email" for="settings-email">
                  <input id="settings-email" v-model="profileForm.email" type="email" autocomplete="email" :class="inputClass">
                </AppField>
              </div>

              <AppField v-if="emailChanged" label="Mot de passe actuel" for="settings-email-password">
                <input id="settings-email-password" v-model="profileForm.currentPassword" type="password"
                       autocomplete="current-password" :class="inputClass">
                <p class="m-0 text-[13px] text-taupe">Requis pour confirmer le changement d'adresse email.</p>
              </AppField>

              <p v-if="profileState.error" role="alert" class="m-0 flex items-start gap-2 rounded-[10px] bg-alerte-bg px-3.5 py-3 text-sm text-alerte">
                <AppIcon name="alert" class="mt-px shrink-0"/>
                {{ profileState.error }}
              </p>
              <p v-if="profileState.success" role="status" class="m-0 flex items-start gap-2 rounded-[10px] bg-succes-bg px-3.5 py-3 text-sm text-succes">
                <AppIcon name="check" class="mt-px shrink-0" :stroke="2"/>
                {{ profileState.success }}
              </p>

              <div class="flex flex-wrap justify-end gap-3">
                <AppButton v-if="profileDirty" variant="ghost" @click="resetProfile">Annuler</AppButton>
                <AppButton type="submit" :disabled="!profileDirty || profileState.saving"
                           class="disabled:cursor-not-allowed disabled:opacity-50">
                  {{ profileState.saving ? "Enregistrement…" : "Enregistrer" }}
                </AppButton>
              </div>
            </form>
          </section>

          <section id="securite" class="scroll-mt-6 rounded-[14px] border border-lin bg-papier">
            <header class="flex flex-col gap-0.5 border-b border-lin px-5 py-5 sm:px-6">
              <h2 class="m-0 font-serif text-[22px] font-normal">Sécurité</h2>
              <p class="m-0 text-sm text-taupe">Changez votre mot de passe. Choisissez-en un que vous n'utilisez nulle part ailleurs.</p>
            </header>

            <form class="flex flex-col gap-5 px-5 py-5 sm:px-6" novalidate @submit.prevent="savePassword">
              <AppField label="Mot de passe actuel" for="settings-current-password">
                <input id="settings-current-password" v-model="passwordForm.currentPassword"
                       :type="showPasswords ? 'text' : 'password'" autocomplete="current-password" :class="inputClass">
              </AppField>

              <div class="flex flex-col gap-5 sm:flex-row">
                <AppField label="Nouveau mot de passe" for="settings-new-password">
                  <input id="settings-new-password" v-model="passwordForm.newPassword"
                         :type="showPasswords ? 'text' : 'password'" autocomplete="new-password"
                         aria-describedby="settings-password-rules" :class="inputClass">
                </AppField>
                <AppField label="Confirmer le nouveau mot de passe" for="settings-confirm-password">
                  <input id="settings-confirm-password" v-model="passwordForm.confirm"
                         :type="showPasswords ? 'text' : 'password'" autocomplete="new-password" :class="inputClass">
                  <p v-if="passwordForm.confirm && !passwordsMatch" class="m-0 text-[13px] text-alerte">Les mots de passe ne correspondent pas.</p>
                </AppField>
              </div>

              <ul id="settings-password-rules" class="m-0 grid list-none grid-cols-2 gap-x-3 gap-y-1 p-0 text-[13px] sm:grid-cols-3">
                <li v-for="rule in rules" :key="rule.id" class="flex items-center gap-1.5"
                    :class="rule.ok ? 'text-succes' : 'text-taupe'">
                  <AppIcon :name="rule.ok ? 'check' : 'close'" :size="14" :stroke="2"/>
                  {{ rule.label }}
                </li>
              </ul>

              <label class="flex w-fit cursor-pointer items-center gap-2 text-sm text-taupe-fonce">
                <input v-model="showPasswords" type="checkbox" class="size-4 cursor-pointer accent-encre">
                Afficher les mots de passe
              </label>

              <p v-if="passwordState.error" role="alert" class="m-0 flex items-start gap-2 rounded-[10px] bg-alerte-bg px-3.5 py-3 text-sm text-alerte">
                <AppIcon name="alert" class="mt-px shrink-0"/>
                {{ passwordState.error }}
              </p>
              <p v-if="passwordState.success" role="status" class="m-0 flex items-start gap-2 rounded-[10px] bg-succes-bg px-3.5 py-3 text-sm text-succes">
                <AppIcon name="check" class="mt-px shrink-0" :stroke="2"/>
                {{ passwordState.success }}
              </p>

              <div class="flex justify-end">
                <AppButton type="submit" :disabled="passwordState.saving" class="disabled:cursor-wait disabled:opacity-70">
                  {{ passwordState.saving ? "Modification…" : "Changer le mot de passe" }}
                </AppButton>
              </div>
            </form>
          </section>

          <section id="donnees" class="scroll-mt-6 rounded-[14px] border border-lin bg-papier">
            <header class="flex flex-col gap-0.5 border-b border-lin px-5 py-5 sm:px-6">
              <h2 class="m-0 font-serif text-[22px] font-normal">Données personnelles</h2>
              <p class="m-0 text-sm text-taupe">
                Vos droits sur vos données, conformément au RGPD.
                <NuxtLink to="/confidentialite#droits" class="text-brun underline underline-offset-2 hover:text-bordeaux">En savoir plus</NuxtLink>
              </p>
            </header>

            <div class="flex flex-col divide-y divide-lin">
              <div class="flex flex-wrap items-center justify-between gap-4 px-5 py-5 sm:px-6">
                <div class="flex min-w-0 flex-1 flex-col gap-0.5">
                  <p class="m-0 text-[15px] font-medium">Consentement</p>
                  <p class="m-0 text-sm text-taupe">
                    <template v-if="consent">Conditions d'utilisation et politique de confidentialité acceptées {{ consent }}.</template>
                    <template v-else>Aucun consentement enregistré pour ce compte (créé avant leur mise en place).</template>
                  </p>
                </div>
                <div class="flex flex-wrap gap-3">
                  <AppButton variant="ghost" to="/conditions-utilisation">Conditions</AppButton>
                  <AppButton variant="ghost" to="/confidentialite">Confidentialité</AppButton>
                </div>
              </div>

              <div class="flex flex-wrap items-center justify-between gap-4 px-5 py-5 sm:px-6">
                <div class="flex min-w-0 flex-1 flex-col gap-0.5">
                  <p class="m-0 text-[15px] font-medium">Exporter mes données</p>
                  <p class="m-0 text-sm text-taupe">Téléchargez les informations de votre compte au format JSON.</p>
                </div>
                <AppButton variant="secondary" icon="download" :disabled="!account" @click="exportData">Télécharger</AppButton>
              </div>

              <div class="flex flex-wrap items-center justify-between gap-4 px-5 py-5 sm:px-6">
                <div class="flex min-w-0 flex-1 flex-col gap-0.5">
                  <p class="m-0 text-[15px] font-medium text-alerte">Supprimer mon compte</p>
                  <p class="m-0 text-sm text-taupe">Votre compte et vos informations de connexion sont supprimés définitivement.</p>
                </div>
                <button type="button" :disabled="!account"
                        class="inline-flex h-11 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-[10px] border border-alerte bg-transparent px-[18px] text-[15px] font-medium text-alerte transition-colors hover:bg-alerte-bg disabled:cursor-not-allowed disabled:opacity-50"
                        @click="openDelete">
                  <AppIcon name="trash" :stroke="2"/>
                  Supprimer
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </AppPage>

    <AppModal :is-visible="deleteModal" title="Supprimer mon compte" hide-save @close-modal="deleteModal = false">
      <form id="delete-account-form" class="flex flex-col gap-5" novalidate @submit.prevent="confirmDelete">
        <p class="m-0 text-[15px] leading-relaxed text-taupe-fonce">
          Cette action est <strong class="text-encre">définitive</strong> : votre compte
          <strong class="text-encre">{{ account?.email }}</strong> sera supprimé et vous serez déconnecté.
          Les données de la cave (clients, ventes, factures) ne sont pas concernées.
        </p>

        <AppField label="Mot de passe" for="delete-password">
          <input id="delete-password" v-model="deleteForm.password" type="password" autocomplete="current-password" :class="inputClass">
        </AppField>

        <label class="flex cursor-pointer items-start gap-3 text-sm leading-relaxed">
          <input v-model="deleteForm.confirmed" type="checkbox" class="mt-0.5 size-4 shrink-0 cursor-pointer accent-encre">
          Je comprends que cette suppression est irréversible.
        </label>

        <p v-if="deleteState.error" role="alert" class="m-0 flex items-start gap-2 rounded-[10px] bg-alerte-bg px-3.5 py-3 text-sm text-alerte">
          <AppIcon name="alert" class="mt-px shrink-0"/>
          {{ deleteState.error }}
        </p>
      </form>

      <template #primary>
        <button type="submit" form="delete-account-form" :disabled="deleteState.saving"
                class="inline-flex h-11 cursor-pointer items-center justify-center rounded-[10px] border-0 bg-alerte px-[18px] text-[15px] font-medium text-papier transition-colors hover:opacity-90 disabled:cursor-wait disabled:opacity-70">
          {{ deleteState.saving ? "Suppression…" : "Supprimer définitivement" }}
        </button>
      </template>
    </AppModal>
  </AppOverlay>
</template>
