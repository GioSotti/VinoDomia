import { defineNuxtRouteMiddleware, navigateTo } from "nuxt/app";
import { isAuthenticatedToken } from "~~/utils/authToken";

export default defineNuxtRouteMiddleware((to) => {
  if (to.path === '/login') return;
  if (!isAuthenticatedToken()) return navigateTo('/login');
});
