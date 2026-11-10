import type {Account} from '#shared/types/account'

export function useAccount() {
  const account = useState<Account | null>('account', () => null)
  const {authHeaders, clearToken} = useAuth()

  async function request<T>(url: string, options: Parameters<typeof $fetch>[1] = {}): Promise<T> {
    try {
      return await $fetch<T>(url, {...options, headers: {...authHeaders(), ...(options.headers as Record<string, string>)}})
    } catch (error) {
      const status = (error as { statusCode?: number }).statusCode
      if (status === 401) {
        clearToken()
        account.value = null
        await navigateTo('/login')
      }
      throw error
    }
  }

  async function loadAccount(force = false) {
    if (account.value && !force) return account.value
    account.value = await request<Account>('/api/account')
    return account.value
  }

  return {account, loadAccount, request}
}

export function apiErrorMessage(error: unknown, fallback = 'Une erreur est survenue. Veuillez réessayer.') {
  const data = (error as { data?: { message?: string } }).data
  return data?.message ?? fallback
}

export function initials(name?: string | null) {
  if (!name) return '?'
  return name.trim().split(/\s+/).slice(0, 2).map(part => part[0]?.toUpperCase()).join('')
}
