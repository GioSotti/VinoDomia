export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.server) return
  if (to.path === '/login') return
  if (!useAuth().isAuthenticated()) return navigateTo('/login')
})
