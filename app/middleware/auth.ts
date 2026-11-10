export default defineNuxtRouteMiddleware((to) => {
  if (to.path === '/login') return
  if (!useAuth().isAuthenticated()) return navigateTo('/login')
})
