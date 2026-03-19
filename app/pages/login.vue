<script setup lang="ts">
import {ref, onMounted} from "vue";
import {isAuthenticatedToken} from "~~/utils/authToken";

type LoginResponse = {
  statusCode: number;
  body?: {
    success?: boolean;
    message?: string;
    token?: string;
  };
};

const email = ref("");
const password = ref("");
const isSubmitting = ref(false);
const errorMessage = ref("");

onMounted(async () => {
  if (isAuthenticatedToken()) {
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
    const response = await $fetch<LoginResponse>("/api/auth/login", {
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

    localStorage.setItem("authToken", response.body.token);
    await navigateTo("/dashboard");
  } catch {
    errorMessage.value = "Une erreur est survenue. Veuillez reessayer.";
  } finally {
    isSubmitting.value = false;
  }
};

</script>

<template>
  <div class="flex flex-col w-full h-screen">
    <div class="flex flex-row bg-white h-15 justify-between py-5 items-center pr-25 pl-5">
      <a @click="$router.go(-1)">
        <Icon name="solar:arrow-left-linear" class="size-5 cursor-pointer" />
      </a>
      <h2 class="items-center justify-center w-1/2 font-medium">Connexion</h2>
    </div>
    <div class="flex flex-col text-center align-center items-center gap-10 h-full justify-center">
      <div class="flex flex-col gap-2">
        <h1 class="font-bold text-2xl">Bienvenue</h1>
        <h2 class="text-gray-500">Connectez-vous à votre compte</h2>
      </div>
      <form class="w-full max-w-sm" @submit.prevent="onSubmit">
        <div class="flex flex-col gap-6 text-left">
          <div class="flex flex-col gap-2">
            <label for="email">Email</label>
            <input id="email" type="email" class="border border-gray-400/50 rounded-xl px-3 py-2 w-full text-gray-600"
                   placeholder="Entrez votre email" v-model="email"/>
          </div>
          <div class="flex flex-col gap-2">
            <label for="password" class="flex flex-row justify-between">
              <span>Mot de passe</span>
              <a href="/forgotten">Oublié?</a>
            </label>
            <input id="password" type="password"
                   class="border border-gray-400/50 rounded-xl px-3 py-2 w-full text-gray-600"
                   placeholder="Entrez votre password" v-model="password"/>
          </div>
          <p v-if="errorMessage" class="text-sm text-red-600">{{ errorMessage }}</p>
        </div>
        <button type="submit"
                :disabled="isSubmitting"
                class="bg-slate-foundation text-white rounded-xl px-3 py-2 w-full mt-6 font-medium hover:bg-slate-foundation/80 transition-colors disabled:opacity-70 disabled:cursor-not-allowed">
          {{ isSubmitting ? 'Connexion...' : 'Se connecter' }}
        </button>
      </form>
      <div class="flex flex-row gap-2">
        <h2>Pas encore de compte ?</h2>
        <a href="/register" class="font-bold">S'inscrire</a>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>