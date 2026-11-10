import { describe, expect, it } from 'vitest'
import { parsePrice } from '../../app/utils/parsePriceUtils'

describe('parsePrice', () => {
  it('formate un prix avec le séparateur donné', () => {
    expect(parsePrice(12.5, ',')).toBe('12,50')
    expect(parsePrice(12.5, '.')).toBe('12.50')
  })

  it('ajoute un zéro devant les centimes < 10', () => {
    expect(parsePrice(3.05, ',')).toBe('3,05')
  })

  it('affiche 00 pour un prix rond', () => {
    expect(parsePrice(20, ',')).toBe('20,00')
  })
})
