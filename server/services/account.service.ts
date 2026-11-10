import bcrypt from 'bcrypt'
import { prisma } from '../utils/prisma'
import { signToken } from '../utils/jwt'
import { isPasswordValid } from '#shared/utils/password'
import type { ChangePasswordPayload, UpdateProfilePayload } from '#shared/types/account'

const SALT_ROUNDS = 10

const accountFields = {
  id: true,
  name: true,
  email: true,
  role: true,
  createdAt: true,
  termsAcceptedAt: true,
  termsVersion: true,
} as const

export type AccountError = 'NOT_FOUND' | 'WRONG_PASSWORD' | 'EMAIL_TAKEN' | 'WEAK_PASSWORD' | 'INVALID_INPUT'

type Result<T> = { success: true } & T | { success: false, reason: AccountError }

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function getAccount(id: number) {
  return prisma.user.findUnique({ where: { id }, select: accountFields })
}

export async function updateProfile(id: number, { name, email, currentPassword }: UpdateProfilePayload): Promise<Result<{ token?: string }>> {
  const cleanName = name?.trim()
  const cleanEmail = email?.trim().toLowerCase()
  if (!cleanName || !cleanEmail || !EMAIL_PATTERN.test(cleanEmail)) {
    return { success: false, reason: 'INVALID_INPUT' }
  }

  const user = await prisma.user.findUnique({ where: { id } })
  if (!user) return { success: false, reason: 'NOT_FOUND' }

  const emailChanged = cleanEmail !== user.email
  if (emailChanged) {
    if (!currentPassword || !(await bcrypt.compare(currentPassword, user.password))) {
      return { success: false, reason: 'WRONG_PASSWORD' }
    }
    const taken = await prisma.user.findUnique({ where: { email: cleanEmail } })
    if (taken) return { success: false, reason: 'EMAIL_TAKEN' }
  }

  const updated = await prisma.user.update({ where: { id }, data: { name: cleanName, email: cleanEmail } })

  return emailChanged
    ? { success: true, token: signToken({ id: updated.id, email: updated.email, role: updated.role }) }
    : { success: true }
}

export async function changePassword(id: number, { currentPassword, newPassword }: ChangePasswordPayload): Promise<Result<object>> {
  if (!newPassword || !isPasswordValid(newPassword)) {
    return { success: false, reason: 'WEAK_PASSWORD' }
  }

  const user = await prisma.user.findUnique({ where: { id } })
  if (!user) return { success: false, reason: 'NOT_FOUND' }

  if (!currentPassword || !(await bcrypt.compare(currentPassword, user.password))) {
    return { success: false, reason: 'WRONG_PASSWORD' }
  }

  await prisma.user.update({ where: { id }, data: { password: await bcrypt.hash(newPassword, SALT_ROUNDS) } })
  return { success: true }
}

export async function deleteAccount(id: number, password: string): Promise<Result<object>> {
  const user = await prisma.user.findUnique({ where: { id } })
  if (!user) return { success: false, reason: 'NOT_FOUND' }

  if (!password || !(await bcrypt.compare(password, user.password))) {
    return { success: false, reason: 'WRONG_PASSWORD' }
  }

  await prisma.user.delete({ where: { id } })
  return { success: true }
}
