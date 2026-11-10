import bcrypt from 'bcrypt'
import { prisma } from '../utils/prisma'
import { isPasswordValid } from '#shared/utils/password'
import { ADMIN_ROLE, isValidRole } from '#shared/utils/roles'
import type { CreateUserPayload, UpdateUserPayload } from '#shared/types/users'

const SALT_ROUNDS = 10
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const publicUserFields = {
  id: true,
  email: true,
  name: true,
  role: true,
  createdAt: true,
  termsAcceptedAt: true,
} as const

export type UserError = 'NOT_FOUND' | 'EMAIL_TAKEN' | 'WEAK_PASSWORD' | 'INVALID_INPUT' | 'INVALID_ROLE' | 'SELF_DELETE' | 'SELF_DEMOTE'

type Result<T> = { success: true } & T | { success: false, reason: UserError }

function clean(name: string, email: string) {
  return { name: name?.trim() ?? '', email: email?.trim().toLowerCase() ?? '' }
}

export function findAllUsers() {
  return prisma.user.findMany({ select: publicUserFields, orderBy: [{ role: 'asc' }, { name: 'asc' }] })
}

export async function createUser(payload: CreateUserPayload): Promise<Result<{ user: Awaited<ReturnType<typeof findAllUsers>>[number] }>> {
  const { name, email } = clean(payload.name, payload.email)
  if (!name || !EMAIL_PATTERN.test(email)) return { success: false, reason: 'INVALID_INPUT' }
  if (!isValidRole(payload.role)) return { success: false, reason: 'INVALID_ROLE' }
  if (!payload.password || !isPasswordValid(payload.password)) return { success: false, reason: 'WEAK_PASSWORD' }

  if (await prisma.user.findUnique({ where: { email } })) return { success: false, reason: 'EMAIL_TAKEN' }

  const user = await prisma.user.create({
    data: { name, email, role: payload.role, password: await bcrypt.hash(payload.password, SALT_ROUNDS) },
    select: publicUserFields,
  })
  return { success: true, user }
}

export async function updateUser(actorId: number, id: number, payload: UpdateUserPayload): Promise<Result<{ user: Awaited<ReturnType<typeof findAllUsers>>[number] }>> {
  const { name, email } = clean(payload.name, payload.email)
  if (!name || !EMAIL_PATTERN.test(email)) return { success: false, reason: 'INVALID_INPUT' }
  if (!isValidRole(payload.role)) return { success: false, reason: 'INVALID_ROLE' }
  if (payload.password && !isPasswordValid(payload.password)) return { success: false, reason: 'WEAK_PASSWORD' }
  if (actorId === id && payload.role !== ADMIN_ROLE) return { success: false, reason: 'SELF_DEMOTE' }

  const existing = await prisma.user.findUnique({ where: { id } })
  if (!existing) return { success: false, reason: 'NOT_FOUND' }

  if (email !== existing.email && await prisma.user.findUnique({ where: { email } })) {
    return { success: false, reason: 'EMAIL_TAKEN' }
  }

  const user = await prisma.user.update({
    where: { id },
    data: {
      name,
      email,
      role: payload.role,
      ...(payload.password ? { password: await bcrypt.hash(payload.password, SALT_ROUNDS) } : {}),
    },
    select: publicUserFields,
  })
  return { success: true, user }
}

export async function deleteUser(actorId: number, id: number): Promise<Result<object>> {
  if (actorId === id) return { success: false, reason: 'SELF_DELETE' }

  const existing = await prisma.user.findUnique({ where: { id } })
  if (!existing) return { success: false, reason: 'NOT_FOUND' }

  await prisma.user.delete({ where: { id } })
  return { success: true }
}
