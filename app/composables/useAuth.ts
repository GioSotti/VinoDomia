// Gestion du token d'authentification côté front (auto-importé par Nuxt).
import { jwtDecode } from 'jwt-decode'
import type { JwtPayload } from '#shared/types/auth'

const TOKEN_KEY = 'authToken'
const ROLE_COOKIE = 'vd-role'

export function useAuth() {
  function getToken(): string | null {
    if (import.meta.server) return null
    return localStorage.getItem(TOKEN_KEY)
  }

  function saveToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token)
    try {
      const { role } = jwtDecode<JwtPayload>(token)
      if (role !== undefined) document.cookie = `${ROLE_COOKIE}=${role}; path=/; SameSite=Lax`
    } catch {
      document.cookie = `${ROLE_COOKIE}=; path=/; max-age=0`
    }
  }

  function clearToken() {
    if (import.meta.server) return
    localStorage.removeItem(TOKEN_KEY)
    document.cookie = `${ROLE_COOKIE}=; path=/; max-age=0`
  }

  function isAuthenticated(): boolean {
    const token = getToken()
    if (!token) return false

    try {
      const { exp, role } = jwtDecode<JwtPayload>(token)
      if (!exp || exp < Date.now() / 1000 || role === undefined) {
        clearToken()
        return false
      }
      return true
    } catch {
      clearToken()
      return false
    }
  }

  function getPayload(): JwtPayload | null {
    const token = getToken()
    if (!token) return null
    try {
      return jwtDecode<JwtPayload>(token)
    } catch {
      return null
    }
  }

  function authHeaders(): Record<string, string> {
    const token = getToken()
    return token ? { Authorization: `Bearer ${token}` } : {}
  }

  return { getToken, saveToken, clearToken, isAuthenticated, authHeaders, getPayload }
}
