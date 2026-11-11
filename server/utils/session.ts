import type { H3Event } from 'h3'
import { verifyToken } from './jwt'
import { prisma } from './prisma'
import { ADMIN_ROLE } from '#shared/utils/roles'

export function requireUserId(event: H3Event): number {
  const header = getHeader(event, 'authorization') ?? ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : ''
  const payload = token ? verifyToken(token) : null

  if (!payload?.id) {
    throw createError({ statusCode: 401, message: 'Votre session a expiré, veuillez vous reconnecter.' })
  }

  return payload.id
}

export async function requireAdmin(event: H3Event): Promise<number> {
  const id = requireUserId(event)
  const user = await prisma.user.findUnique({ where: { id }, select: { role: true } })

  if (!user) {
    throw createError({ statusCode: 401, message: 'Votre session a expiré, veuillez vous reconnecter.' })
  }
  if (user.role !== ADMIN_ROLE) {
    throw createError({ statusCode: 403, message: 'Cette action est réservée au gérant.' })
  }

  return id
}
