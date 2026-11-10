export default defineNuxtRouteMiddleware(() => {
  if (import.meta.server) return
  if (useProfil().profil.value !== 'admin') return navigateTo('/dashboard')
})
