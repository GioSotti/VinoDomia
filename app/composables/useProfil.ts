import {DEFAULT_ROLE, profilFromRole, roleLabel} from '#shared/utils/roles'

export function useProfil() {
  const role = useCookie<number | null>('vd-role', {default: () => null, sameSite: 'lax'})
  const {getPayload} = useAuth()

  if (import.meta.client) {
    const fromToken = getPayload()?.role
    if (fromToken !== undefined && fromToken !== role.value) role.value = fromToken
  }

  const profil = computed(() => profilFromRole(role.value ?? DEFAULT_ROLE) ?? 'admin')
  const label = computed(() => roleLabel(role.value ?? DEFAULT_ROLE))

  return {role, profil, label}
}
