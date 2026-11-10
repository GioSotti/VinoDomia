import { describe, expect, it } from 'vitest'
import { isPasswordValid } from '#shared/utils/password'

describe('isPasswordValid', () => {
  it('accepte un mot de passe qui respecte toutes les règles', () => {
    expect(isPasswordValid('Vendanges2026!')).toBe(true)
  })

  it.each([
    ['trop court', 'Vin2026!'],
    ['sans majuscule', 'vendanges2026!'],
    ['sans minuscule', 'VENDANGES2026!'],
    ['sans chiffre', 'Vendanges-Tardives!'],
    ['sans caractère spécial', 'Vendanges2026'],
  ])('refuse un mot de passe %s', (_, password) => {
    expect(isPasswordValid(password)).toBe(false)
  })
})
