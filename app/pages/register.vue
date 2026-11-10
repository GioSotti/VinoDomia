<script setup lang="ts">
import type {AuthResponse} from "#shared/types/auth";
import {isPasswordValid, PASSWORD_RULES} from "#shared/utils/password";

const {isAuthenticated, saveToken} = useAuth();

const name = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const acceptTerms = ref(false);
const showPassword = ref(false);
const isSubmitting = ref(false);
const errorMessage = ref("");

useHead({title: "Créer un compte · VinoDomia"});

onMounted(async () => {
  if (isAuthenticated()) {
    await navigateTo("/dashboard");
  }
});

const rules = computed(() => PASSWORD_RULES.map(rule => ({id: rule.id, label: rule.label, ok: rule.test(password.value)})));
const passwordsMatch = computed(() => confirmPassword.value.length > 0 && confirmPassword.value === password.value);

const onSubmit = async () => {
  errorMessage.value = "";

  if (!name.value || !email.value || !password.value) {
    errorMessage.value = "Veuillez renseigner votre nom, votre email et un mot de passe.";
    return;
  }
  if (!isPasswordValid(password.value)) {
    errorMessage.value = "Votre mot de passe ne respecte pas toutes les règles de sécurité.";
    return;
  }
  if (password.value !== confirmPassword.value) {
    errorMessage.value = "Les deux mots de passe ne sont pas identiques.";
    return;
  }
  if (!acceptTerms.value) {
    errorMessage.value = "Vous devez accepter les conditions d'utilisation et la politique de confidentialité.";
    return;
  }

  isSubmitting.value = true;

  try {
    const response = await $fetch<AuthResponse>("/api/auth/register", {
      method: "POST",
      body: {
        name: name.value,
        email: email.value,
        password: password.value,
        acceptTerms: acceptTerms.value,
      },
    });

    if (response.statusCode !== 200 || !response.body?.success || !response.body.token) {
      errorMessage.value = response.body?.message ?? "L'inscription a échoué.";
      return;
    }

    saveToken(response.body.token);
    await navigateTo("/dashboard");
  } catch {
    errorMessage.value = "Une erreur est survenue. Veuillez réessayer.";
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <AuthLayout eyebrow="Bienvenue" title="Créer un compte" subtitle="Quelques informations pour ouvrir votre espace VinoDomia.">
    <form class="flex flex-col gap-5" novalidate @submit.prevent="onSubmit">
      <div class="flex flex-col gap-1.5">
        <label for="name" class="text-sm font-medium text-taupe-fonce">Nom complet</label>
        <input id="name" v-model="name" type="text" autocomplete="name" placeholder="Jean Durand" required
               class="h-12 rounded-[10px] border border-lin bg-papier px-3.5 text-[15px] text-encre outline-none transition-colors placeholder:text-taupe/70 focus:border-encre focus:ring-2 focus:ring-sable">
      </div>

      <div class="flex flex-col gap-1.5">
        <label for="email" class="text-sm font-medium text-taupe-fonce">Adresse email</label>
        <input id="email" v-model="email" type="email" autocomplete="email" placeholder="vous@exemple.fr" required
               class="h-12 rounded-[10px] border border-lin bg-papier px-3.5 text-[15px] text-encre outline-none transition-colors placeholder:text-taupe/70 focus:border-encre focus:ring-2 focus:ring-sable">
      </div>

      <div class="flex flex-col gap-1.5">
        <label for="password" class="text-sm font-medium text-taupe-fonce">Mot de passe</label>
        <div class="flex h-12 items-center rounded-[10px] border border-lin bg-papier pr-1 transition-colors focus-within:border-encre focus-within:ring-2 focus-within:ring-sable">
          <input id="password" v-model="password" :type="showPassword ? 'text' : 'password'" autocomplete="new-password"
                 placeholder="••••••••••••" required aria-describedby="password-rules"
                 class="h-full min-w-0 flex-1 border-0 bg-transparent px-3.5 text-[15px] text-encre outline-none placeholder:text-taupe/70">
          <AppIconButton :icon="showPassword ? 'eyeOff' : 'eye'"
                         :label="showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'"
                         @click="showPassword = !showPassword"/>
        </div>
        <ul id="password-rules" class="m-0 mt-1 grid list-none grid-cols-2 gap-x-3 gap-y-1 p-0 text-[13px]">
          <li v-for="rule in rules" :key="rule.id" class="flex items-center gap-1.5"
              :class="rule.ok ? 'text-succes' : 'text-taupe'">
            <AppIcon :name="rule.ok ? 'check' : 'close'" :size="14" :stroke="2"/>
            {{ rule.label }}
          </li>
        </ul>
      </div>

      <div class="flex flex-col gap-1.5">
        <label for="confirmPassword" class="text-sm font-medium text-taupe-fonce">Confirmer le mot de passe</label>
        <input id="confirmPassword" v-model="confirmPassword" :type="showPassword ? 'text' : 'password'"
               autocomplete="new-password" placeholder="••••••••••••" required
               class="h-12 rounded-[10px] border border-lin bg-papier px-3.5 text-[15px] text-encre outline-none transition-colors placeholder:text-taupe/70 focus:border-encre focus:ring-2 focus:ring-sable">
        <p v-if="confirmPassword && !passwordsMatch" class="m-0 text-[13px] text-alerte">Les mots de passe ne correspondent pas.</p>
      </div>

      <label class="flex cursor-pointer items-start gap-3 rounded-[10px] border border-lin bg-papier p-3.5 text-sm leading-relaxed">
        <input v-model="acceptTerms" type="checkbox" required class="mt-0.5 size-4 shrink-0 cursor-pointer accent-encre">
        <span>
          J'ai lu et j'accepte les
          <NuxtLink to="/conditions-utilisation" target="_blank" class="font-medium text-encre underline underline-offset-2 hover:text-bordeaux">conditions d'utilisation</NuxtLink>
          et la
          <NuxtLink to="/confidentialite" target="_blank" class="font-medium text-encre underline underline-offset-2 hover:text-bordeaux">politique de confidentialité</NuxtLink>.
        </span>
      </label>

      <p v-if="errorMessage" role="alert"
         class="m-0 flex items-start gap-2 rounded-[10px] bg-alerte-bg px-3.5 py-3 text-sm text-alerte">
        <AppIcon name="alert" class="mt-px shrink-0"/>
        {{ errorMessage }}
      </p>

      <button type="submit" :disabled="isSubmitting"
              class="mt-1 flex h-12 cursor-pointer items-center justify-center rounded-[10px] border-0 bg-encre text-[15px] font-medium text-ivoire transition-colors hover:bg-brun disabled:cursor-wait disabled:opacity-70">
        {{ isSubmitting ? "Création du compte…" : "Créer mon compte" }}
      </button>

      <p class="m-0 text-[13px] leading-relaxed text-taupe">
        Vos nom, email et mot de passe (chiffré) sont utilisés uniquement pour créer et sécuriser votre compte.
        Vous pouvez à tout moment y accéder, les rectifier ou demander leur suppression :
        <NuxtLink to="/confidentialite#droits" class="text-brun underline underline-offset-2 hover:text-bordeaux">en savoir plus sur vos droits</NuxtLink>.
      </p>
    </form>

    <div class="flex flex-col gap-3 border-t border-lin pt-6 text-center text-sm text-taupe">
      <p class="m-0">
        Déjà un compte ?
        <NuxtLink to="/login" class="font-medium text-encre hover:text-bordeaux">Se connecter</NuxtLink>
      </p>
    </div>
  </AuthLayout>
</template>
