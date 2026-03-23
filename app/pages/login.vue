<script setup lang="ts">
import { ref } from "vue";

const identifiant = ref("");
const password = ref("");
const rememberMe = ref(false);
const isLoading = ref(false);

const handleLogin = async () => {
  isLoading.value = true;
  setTimeout(() => {
    console.log("Login attempt:", { identifiant: identifiant.value, password: password.value });
    isLoading.value = false;
  }, 1500);
};
</script>

<template>
  <div class="min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-gray-800 mb-2">VinoDomia</h1>
      </div>

      <div class="bg-white rounded-lg border border-gray-300 shadow-lg p-8 gap-6 flex flex-col">
        <div class="flex flex-col gap-2">
          <h2 class="text-black font-bold text-2xl">Connexion</h2>
          <p class="text-gray-600 text-sm">Entrez vos identifiants pour accéder à votre compte</p>
        </div>

        <form @submit.prevent="handleLogin" class="flex flex-col gap-5">
          <div class="flex flex-col gap-2">
            <label for="identifiant" class="font-semibold text-sm text-gray-700">Identifiant</label>
            <input
                id="identifiant"
                v-model="identifiant"
                type="text"
                placeholder="Votre identifiant"
                required
                class="border border-gray-400 px-4 py-2.5 rounded text-sm focus:outline-none focus:border-gray-600 focus:ring-2 focus:ring-gray-300 transition-colors"
            />
          </div>

          <div class="flex flex-col gap-2">
            <label for="password" class="font-semibold text-sm text-gray-700">Mot de passe</label>
            <input
                id="password"
                v-model="password"
                type="password"
                placeholder="••••••••"
                required
                class="border border-gray-400 px-4 py-2.5 rounded text-sm focus:outline-none focus:border-gray-600 focus:ring-2 focus:ring-gray-300 transition-colors"
            />
          </div>

          <label class="flex items-center gap-2.5 cursor-pointer">
            <input
                v-model="rememberMe"
                type="checkbox"
                class="w-4 h-4 border border-gray-400 rounded cursor-pointer"
            />
            <span class="text-sm text-gray-700">Se souvenir de moi</span>
          </label>

          <button
              type="submit"
              :disabled="isLoading"
              class="bg-gray-800 hover:bg-gray-700 disabled:bg-gray-600 text-white font-semibold py-2.5 px-4 rounded transition-colors mt-2"
          >
            <span v-if="!isLoading">Se connecter</span>
            <span v-else>Connexion en cours...</span>
          </button>
        </form>

        <div class="flex items-center gap-3 my-2">
          <div class="flex-1 h-px bg-gray-300"></div>
          <span class="text-gray-500 text-xs">OU</span>
          <div class="flex-1 h-px bg-gray-300"></div>
        </div>

        <div class="flex flex-col gap-3 text-center pt-2">
          <a href="#" class="text-sm text-gray-600 hover:text-gray-800 transition-colors font-medium">
            Mot de passe oublié ?
          </a>
          <p class="text-xs text-gray-600">
            Besoin d'aide ?
            <a href="#" class="text-gray-800 hover:text-gray-600 font-semibold transition-colors">Contacter le support</a>
          </p>
        </div>
      </div>

      <div class="mt-8 text-center text-xs text-gray-500 flex flex-col gap-1">
        <p>© 2024 VinoDomia. Tous droits réservés.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
input:focus {
  outline: none;
}
</style>