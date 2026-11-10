// Gestion du token d'authentification côté front (auto-importé par Nuxt).
import { jwtDecode } from 'jwt-decode'
import type { JwtPayload } from '#shared/types/auth'

const TOKEN_KEY = 'authToken'

export function useAuth() {
  function getToken(): string | null {
    // Pendant le rendu serveur (SSR), localStorage n'existe pas
    if (import.meta.server) return null
    return localStorage.getItem(TOKEN_KEY)
  }

  function saveToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token)
  }

  function clearToken() {
    if (import.meta.server) return
    localStorage.removeItem(TOKEN_KEY)
  }

  function isAuthenticated(): boolean {
    const token = getToken()
    if (!token) return false

    try {
      const { exp } = jwtDecode<JwtPayload>(token)
      if (!exp || exp < Date.now() / 1000) {
        clearToken()
        return false
      }
      return true
    } catch {
      clearToken()
      return false
    }
  }

  return { getToken, saveToken, clearToken, isAuthenticated }
}
