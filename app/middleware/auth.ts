import { defineNuxtRouteMiddleware, navigateTo } from "nuxt/app";
import { isAuthenticatedToken } from "~~/utils/authToken";

export default defineNuxtRouteMiddleware((to) => {
  if (typeof window === "undefined") return;
  if (to.path === "/login") return;
  if (!isAuthenticatedToken()) return navigateTo("/login");
});
