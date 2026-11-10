import { login } from '../../services/auth.service'
import type { AuthResponse, LoginPayload } from '#shared/types/auth'

export default defineEventHandler(async (event): Promise<AuthResponse> => {
  const { email, password } = await readBody<Partial<LoginPayload>>(event)

  if (!email || !password) {
    return { statusCode: 400, body: { success: false, message: 'Email and password are required' } }
  }

  const result = await login({ email, password })

  if (!result.success) {
    return { statusCode: 401, body: { success: false, message: 'Invalid email or password' } }
  }

  return { statusCode: 200, body: { success: true, message: 'Login successful', token: result.token } }
})
