import { beforeEach, describe, expect, it, vi } from 'vitest'

const findUnique = vi.fn()
const create = vi.fn()
const update = vi.fn()
const remove = vi.fn()

vi.mock('../../../server/utils/prisma', () => ({
  prisma: { user: { findUnique, create, update, delete: remove } },
}))

const { createUser, updateUser, deleteUser } = await import('../../../server/services/user.service')

const STRONG = 'Bordeaux-2026!'

describe('user.service', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('createUser', () => {
    it('crée un vendeur avec un mot de passe chiffré', async () => {
      findUnique.mockResolvedValue(null)
      create.mockImplementation(async ({ data }) => ({ id: 9, ...data }))

      const result = await createUser({ name: ' Paul ', email: 'Paul@Cave.fr', role: 1, password: STRONG })

      expect(result.success).toBe(true)
      const data = create.mock.calls[0][0].data
      expect(data).toMatchObject({ name: 'Paul', email: 'paul@cave.fr', role: 1 })
      expect(data.password).not.toBe(STRONG)
    })

    it('refuse un rôle inconnu', async () => {
      const result = await createUser({ name: 'Paul', email: 'paul@cave.fr', role: 7, password: STRONG })

      expect(result).toEqual({ success: false, reason: 'INVALID_ROLE' })
    })

    it('refuse un mot de passe faible', async () => {
      const result = await createUser({ name: 'Paul', email: 'paul@cave.fr', role: 1, password: 'faible' })

      expect(result).toEqual({ success: false, reason: 'WEAK_PASSWORD' })
    })

    it('refuse un email déjà utilisé', async () => {
      findUnique.mockResolvedValue({ id: 2 })

      const result = await createUser({ name: 'Paul', email: 'paul@cave.fr', role: 1, password: STRONG })

      expect(result).toEqual({ success: false, reason: 'EMAIL_TAKEN' })
      expect(create).not.toHaveBeenCalled()
    })
  })

  describe('updateUser', () => {
    it('empêche le gérant de retirer son propre rôle', async () => {
      const result = await updateUser(1, 1, { name: 'Moi', email: 'moi@cave.fr', role: 1 })

      expect(result).toEqual({ success: false, reason: 'SELF_DEMOTE' })
      expect(update).not.toHaveBeenCalled()
    })

    it('change le rôle d\'un autre utilisateur sans toucher au mot de passe', async () => {
      findUnique.mockResolvedValue({ id: 2, email: 'paul@cave.fr' })
      update.mockResolvedValue({ id: 2 })

      const result = await updateUser(1, 2, { name: 'Paul', email: 'paul@cave.fr', role: 2 })

      expect(result.success).toBe(true)
      expect(update.mock.calls[0][0].data).toEqual({ name: 'Paul', email: 'paul@cave.fr', role: 2 })
    })
  })

  describe('deleteUser', () => {
    it('empêche de se supprimer soi-même', async () => {
      const result = await deleteUser(1, 1)

      expect(result).toEqual({ success: false, reason: 'SELF_DELETE' })
      expect(remove).not.toHaveBeenCalled()
    })

    it('supprime un autre utilisateur', async () => {
      findUnique.mockResolvedValue({ id: 2 })

      const result = await deleteUser(1, 2)

      expect(result).toEqual({ success: true })
      expect(remove).toHaveBeenCalledWith({ where: { id: 2 } })
    })
  })
})
