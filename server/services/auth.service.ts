import bcrypt from 'bcrypt'
import { prisma } from '../utils/prisma'
import { signToken } from '../utils/jwt'
import { TERMS_VERSION } from '#shared/utils/legal'
import type { LoginPayload, RegisterPayload } from '#shared/types/auth'

const SALT_ROUNDS = 10

export type AuthResult =
  | { success: true, token: string }
  | { success: false, reason: 'INVALID_CREDENTIALS' | 'USER_ALREADY_EXISTS' }

export async function login({ email, password }: LoginPayload): Promise<AuthResult> {
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    return { success: false, reason: 'INVALID_CREDENTIALS' }
  }

  const validPassword = await bcrypt.compare(password, user.password)
  if (!validPassword) {
    return { success: false, reason: 'INVALID_CREDENTIALS' }
  }

  return { success: true, token: signToken({ id: user.id, email: user.email }) }
}

export async function register({ email, password, name }: RegisterPayload): Promise<AuthResult> {
  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    return { success: false, reason: 'USER_ALREADY_EXISTS' }
  }

  const user = await prisma.user.create({
    data: {
      email,
      name,
      password: await bcrypt.hash(password, SALT_ROUNDS),
      role: 0,
      termsAcceptedAt: new Date(),
      termsVersion: TERMS_VERSION,
    },
  })

  return { success: true, token: signToken({ id: user.id, email: user.email }) }
}
