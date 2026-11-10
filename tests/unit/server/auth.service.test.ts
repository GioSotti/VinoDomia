import bcrypt from 'bcrypt'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { TERMS_VERSION } from '#shared/utils/legal'

const findUnique = vi.fn()
const create = vi.fn()

vi.mock('../../../server/utils/prisma', () => ({
  prisma: { user: { findUnique, create } },
}))
vi.mock('../../../server/utils/jwt', () => ({
  signToken: vi.fn(() => 'fake-token'),
}))

const { login, register } = await import('../../../server/services/auth.service')
const { signToken } = await import('../../../server/utils/jwt')

describe('auth.service', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('login', () => {
    it('refuse un email inconnu', async () => {
      findUnique.mockResolvedValue(null)

      const result = await login({ email: 'nobody@test.dev', password: 'x' })

      expect(result).toEqual({ success: false, reason: 'INVALID_CREDENTIALS' })
    })

    it('refuse un mauvais mot de passe', async () => {
      findUnique.mockResolvedValue({ id: 1, email: 'a@test.dev', password: await bcrypt.hash('good', 4) })

      const result = await login({ email: 'a@test.dev', password: 'bad' })

      expect(result).toEqual({ success: false, reason: 'INVALID_CREDENTIALS' })
    })

    it('renvoie un token avec les bons identifiants', async () => {
      findUnique.mockResolvedValue({ id: 1, email: 'a@test.dev', password: await bcrypt.hash('good', 4) })

      const result = await login({ email: 'a@test.dev', password: 'good' })

      expect(result).toEqual({ success: true, token: 'fake-token' })
    })

    it('met le rôle de l\'utilisateur dans le token', async () => {
      findUnique.mockResolvedValue({ id: 1, email: 'a@test.dev', role: 1, password: await bcrypt.hash('good', 4) })

      await login({ email: 'a@test.dev', password: 'good' })

      expect(signToken).toHaveBeenCalledWith({ id: 1, email: 'a@test.dev', role: 1 })
    })
  })

  describe('register', () => {
    it('refuse un email déjà utilisé', async () => {
      findUnique.mockResolvedValue({ id: 1 })

      const result = await register({ email: 'a@test.dev', password: 'pwd', name: 'A', acceptTerms: true })

      expect(result).toEqual({ success: false, reason: 'USER_ALREADY_EXISTS' })
      expect(create).not.toHaveBeenCalled()
    })

    it('crée l\'utilisateur avec un mot de passe hashé', async () => {
      findUnique.mockResolvedValue(null)
      create.mockImplementation(async ({ data }) => ({ id: 2, ...data }))

      const result = await register({ email: 'b@test.dev', password: 'pwd', name: 'B', acceptTerms: true })

      expect(result).toEqual({ success: true, token: 'fake-token' })
      const saved = create.mock.calls[0]![0].data
      expect(saved.password).not.toBe('pwd')
      expect(await bcrypt.compare('pwd', saved.password)).toBe(true)
    })

    it('enregistre la date et la version des conditions acceptées', async () => {
      findUnique.mockResolvedValue(null)
      create.mockImplementation(async ({ data }) => ({ id: 3, ...data }))

      await register({ email: 'c@test.dev', password: 'pwd', name: 'C', acceptTerms: true })

      const saved = create.mock.calls[0]![0].data
      expect(saved.termsAcceptedAt).toBeInstanceOf(Date)
      expect(saved.termsVersion).toBe(TERMS_VERSION)
    })
  })
})
