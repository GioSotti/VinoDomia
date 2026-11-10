<script setup lang="ts">
import type {AuthResponse} from "#shared/types/auth";

const {isAuthenticated, saveToken} = useAuth();

const email = ref("");
const password = ref("");
const showPassword = ref(false);
const isSubmitting = ref(false);
const errorMessage = ref("");

useHead({title: "Connexion · VinoDomia"});

onMounted(async () => {
  if (isAuthenticated()) {
    await navigateTo("/dashboard");
  }
});

const onSubmit = async () => {
  errorMessage.value = "";

  if (!email.value || !password.value) {
    errorMessage.value = "Veuillez renseigner votre email et votre mot de passe.";
    return;
  }

  isSubmitting.value = true;

  try {
    const response = await $fetch<AuthResponse>("/api/auth/login", {
      method: "POST",
      body: {
        email: email.value,
        password: password.value,
      },
    });

    if (response.statusCode !== 200 || !response.body?.success || !response.body.token) {
      errorMessage.value = response.body?.message ?? "Identifiants invalides.";
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
  <AuthLayout eyebrow="Bon retour" title="Connexion" subtitle="Entrez vos identifiants pour accéder à votre espace.">
    <form class="flex flex-col gap-5" novalidate @submit.prevent="onSubmit">
      <div class="flex flex-col gap-1.5">
        <label for="email" class="text-sm font-medium text-taupe-fonce">Adresse email</label>
        <input id="email" v-model="email" type="email" autocomplete="email" placeholder="vous@exemple.fr" required
               class="h-12 rounded-[10px] border border-lin bg-papier px-3.5 text-[15px] text-encre outline-none transition-colors placeholder:text-taupe/70 focus:border-encre focus:ring-2 focus:ring-sable">
      </div>

      <div class="flex flex-col gap-1.5">
        <div class="flex items-baseline justify-between">
          <label for="password" class="text-sm font-medium text-taupe-fonce">Mot de passe</label>
          <a href="#" class="text-[13px] font-medium text-taupe hover:text-bordeaux">Mot de passe oublié ?</a>
        </div>
        <div class="flex h-12 items-center rounded-[10px] border border-lin bg-papier pr-1 transition-colors focus-within:border-encre focus-within:ring-2 focus-within:ring-sable">
          <input id="password" v-model="password" :type="showPassword ? 'text' : 'password'" autocomplete="current-password"
                 placeholder="••••••••" required
                 class="h-full min-w-0 flex-1 border-0 bg-transparent px-3.5 text-[15px] text-encre outline-none placeholder:text-taupe/70">
          <AppIconButton :icon="showPassword ? 'eyeOff' : 'eye'"
                         :label="showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'"
                         @click="showPassword = !showPassword"/>
        </div>
      </div>

      <p v-if="errorMessage" role="alert"
         class="m-0 flex items-start gap-2 rounded-[10px] bg-alerte-bg px-3.5 py-3 text-sm text-alerte">
        <AppIcon name="alert" class="mt-px shrink-0"/>
        {{ errorMessage }}
      </p>

      <button type="submit" :disabled="isSubmitting"
              class="mt-1 flex h-12 cursor-pointer items-center justify-center rounded-[10px] border-0 bg-encre text-[15px] font-medium text-ivoire transition-colors hover:bg-brun disabled:cursor-wait disabled:opacity-70">
        {{ isSubmitting ? "Connexion en cours…" : "Se connecter" }}
      </button>

      <p class="m-0 text-[13px] leading-relaxed text-taupe">
        En vous connectant, vous acceptez nos
        <NuxtLink to="/conditions-utilisation" class="text-brun underline underline-offset-2 hover:text-bordeaux">conditions d'utilisation</NuxtLink>.
        Vos données sont traitées conformément à notre
        <NuxtLink to="/confidentialite" class="text-brun underline underline-offset-2 hover:text-bordeaux">politique de confidentialité</NuxtLink>.
      </p>
    </form>

    <div class="flex flex-col gap-3 border-t border-lin pt-6 text-center text-sm text-taupe">
      <p class="m-0">
        Pas encore de compte ?
        <NuxtLink to="/register" class="font-medium text-encre hover:text-bordeaux">Créer un compte</NuxtLink>
      </p>
      <p class="m-0">
        Besoin d'aide ?
        <a href="#" class="font-medium text-encre hover:text-bordeaux">Contacter le support</a>
      </p>
    </div>
  </AuthLayout>
</template>
