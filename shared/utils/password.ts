export const PASSWORD_RULES = [
  {id: 'length', label: '12 caractères minimum', test: (p: string) => p.length >= 12},
  {id: 'upper', label: 'Une majuscule', test: (p: string) => /[A-Z]/.test(p)},
  {id: 'lower', label: 'Une minuscule', test: (p: string) => /[a-z]/.test(p)},
  {id: 'digit', label: 'Un chiffre', test: (p: string) => /\d/.test(p)},
  {id: 'special', label: 'Un caractère spécial', test: (p: string) => /[^A-Za-z0-9]/.test(p)},
] as const

export function isPasswordValid(password: string): boolean {
  return PASSWORD_RULES.every(rule => rule.test(password))
}
