import { prisma } from '../utils/prisma'

const publicUserFields = {
  id: true,
  email: true,
  name: true,
  role: true,
  createdAt: true,
  updatedAt: true,
} as const

export function findAllUsers() {
  return prisma.user.findMany({ select: publicUserFields })
}
