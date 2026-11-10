import bcrypt from 'bcrypt'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const findUnique = vi.fn()
const update = vi.fn()
const remove = vi.fn()

vi.mock('../../../server/utils/prisma', () => ({
  prisma: { user: { findUnique, update, delete: remove } },
}))
vi.mock('../../../server/utils/jwt', () => ({
  signToken: vi.fn(() => 'new-token'),
}))

const { updateProfile, changePassword, deleteAccount } = await import('../../../server/services/account.service')

const STRONG = 'Bordeaux-2026!'

async function existingUser() {
  return { id: 1, email: 'a@test.dev', name: 'Alice', password: await bcrypt.hash('Ancien-mdp-2026', 4) }
}

describe('account.service', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('updateProfile', () => {
    it('change le nom sans demander le mot de passe', async () => {
      findUnique.mockResolvedValue(await existingUser())
      update.mockResolvedValue({ id: 1, email: 'a@test.dev' })

      const result = await updateProfile(1, { name: 'Alice Martin', email: 'a@test.dev' })

      expect(result).toEqual({ success: true })
      expect(update).toHaveBeenCalledWith({ where: { id: 1 }, data: { name: 'Alice Martin', email: 'a@test.dev' } })
    })

    it('exige le mot de passe pour changer d\'email', async () => {
      findUnique.mockResolvedValue(await existingUser())

      const result = await updateProfile(1, { name: 'Alice', email: 'b@test.dev', currentPassword: 'faux' })

      expect(result).toEqual({ success: false, reason: 'WRONG_PASSWORD' })
      expect(update).not.toHaveBeenCalled()
    })

    it('refuse un email déjà utilisé', async () => {
      findUnique.mockResolvedValueOnce(await existingUser()).mockResolvedValueOnce({ id: 2 })

      const result = await updateProfile(1, { name: 'Alice', email: 'b@test.dev', currentPassword: 'Ancien-mdp-2026' })

      expect(result).toEqual({ success: false, reason: 'EMAIL_TAKEN' })
    })

    it('renvoie un nouveau token quand l\'email change', async () => {
      findUnique.mockResolvedValueOnce(await existingUser()).mockResolvedValueOnce(null)
      update.mockResolvedValue({ id: 1, email: 'b@test.dev' })

      const result = await updateProfile(1, { name: 'Alice', email: ' B@test.dev ', currentPassword: 'Ancien-mdp-2026' })

      expect(result).toEqual({ success: true, token: 'new-token' })
      expect(update.mock.calls[0][0].data.email).toBe('b@test.dev')
    })

    it('refuse un email invalide', async () => {
      const result = await updateProfile(1, { name: 'Alice', email: 'pas-un-email' })

      expect(result).toEqual({ success: false, reason: 'INVALID_INPUT' })
    })
  })

  describe('changePassword', () => {
    it('refuse un mot de passe faible', async () => {
      const result = await changePassword(1, { currentPassword: 'Ancien-mdp-2026', newPassword: 'court' })

      expect(result).toEqual({ success: false, reason: 'WEAK_PASSWORD' })
    })

    it('refuse si le mot de passe actuel est faux', async () => {
      findUnique.mockResolvedValue(await existingUser())

      const result = await changePassword(1, { currentPassword: 'faux', newPassword: STRONG })

      expect(result).toEqual({ success: false, reason: 'WRONG_PASSWORD' })
    })

    it('enregistre le nouveau mot de passe chiffré', async () => {
      findUnique.mockResolvedValue(await existingUser())

      const result = await changePassword(1, { currentPassword: 'Ancien-mdp-2026', newPassword: STRONG })

      expect(result).toEqual({ success: true })
      const saved = update.mock.calls[0][0].data.password
      expect(await bcrypt.compare(STRONG, saved)).toBe(true)
    })
  })

  describe('deleteAccount', () => {
    it('ne supprime rien sans le bon mot de passe', async () => {
      findUnique.mockResolvedValue(await existingUser())

      const result = await deleteAccount(1, 'faux')

      expect(result).toEqual({ success: false, reason: 'WRONG_PASSWORD' })
      expect(remove).not.toHaveBeenCalled()
    })

    it('supprime le compte avec le bon mot de passe', async () => {
      findUnique.mockResolvedValue(await existingUser())

      const result = await deleteAccount(1, 'Ancien-mdp-2026')

      expect(result).toEqual({ success: true })
      expect(remove).toHaveBeenCalledWith({ where: { id: 1 } })
    })
  })
})
