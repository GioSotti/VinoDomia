import { register } from '../../services/auth.service'
import { isPasswordValid } from '#shared/utils/password'
import type { AuthResponse, RegisterPayload } from '#shared/types/auth'

export default defineEventHandler(async (event): Promise<AuthResponse> => {
  const { email, password, name, acceptTerms } = await readBody<Partial<RegisterPayload>>(event)

  if (!email || !password || !name) {
    return { statusCode: 400, body: { success: false, message: 'Le nom, l\'email et le mot de passe sont obligatoires.' } }
  }

  if (acceptTerms !== true) {
    return { statusCode: 400, body: { success: false, message: 'Vous devez accepter les conditions d\'utilisation et la politique de confidentialité.' } }
  }

  if (!isPasswordValid(password)) {
    return { statusCode: 400, body: { success: false, message: 'Votre mot de passe ne respecte pas toutes les règles de sécurité.' } }
  }

  const result = await register({ email, password, name, acceptTerms })

  if (!result.success) {
    return { statusCode: 401, body: { success: false, message: 'Un compte existe déjà avec cette adresse email.' } }
  }

  return { statusCode: 200, body: { success: true, message: 'Register successful', token: result.token } }
})
