import jwt from 'jsonwebtoken'
import type { JwtPayload } from '#shared/types/auth'

const TOKEN_TTL = '24h'

function getSecret(): string {
  const { jwtSecret } = useRuntimeConfig()
  if (!jwtSecret) {
    throw new Error('Missing NUXT_JWT_SECRET environment variable.')
  }
  return jwtSecret
}

export function signToken(payload: Omit<JwtPayload, 'exp'>): string {
  return jwt.sign(payload, getSecret(), { expiresIn: TOKEN_TTL })
}

export function verifyToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, getSecret()) as JwtPayload
  } catch {
    return null
  }
}
