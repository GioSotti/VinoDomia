import type {Profil} from '~/utils/navigation'

export function useProfil() {
  const profil = useCookie<Profil>('vd-profil', {
    default: () => 'admin',
    sameSite: 'lax',
  })

  return {profil}
}
