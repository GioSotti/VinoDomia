export type Profil = 'admin' | 'vendeur' | 'vigneron'

export const ROLES: Record<number, { profil: Profil, label: string }> = {
  0: { profil: 'admin', label: 'Gérant' },
  1: { profil: 'vendeur', label: 'Vendeur' },
  2: { profil: 'vigneron', label: 'Vigneron' },
}

export const ADMIN_ROLE = 0
export const DEFAULT_ROLE = ADMIN_ROLE

export function isValidRole(role: unknown): role is number {
  return typeof role === 'number' && role in ROLES
}

export function profilFromRole(role: number | undefined): Profil | null {
  return role === undefined ? null : ROLES[role]?.profil ?? null
}

export function roleLabel(role: number | undefined): string {
  return role === undefined ? '' : ROLES[role]?.label ?? ''
}
