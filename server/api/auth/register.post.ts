import { register } from '../../services/auth.service'
import type { AuthResponse, RegisterPayload } from '#shared/types/auth'

export default defineEventHandler(async (event): Promise<AuthResponse> => {
  const { email, password, name } = await readBody<Partial<RegisterPayload>>(event)

  if (!email || !password || !name) {
    return { statusCode: 400, body: { success: false, message: 'Email, password and name are required' } }
  }

  const result = await register({ email, password, name })

  if (!result.success) {
    return { statusCode: 401, body: { success: false, message: 'User already exists' } }
  }

  return { statusCode: 200, body: { success: true, message: 'Register successful', token: result.token } }
})
