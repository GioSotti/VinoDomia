import type { UserError } from '../services/user.service'

const ERRORS: Record<UserError, { statusCode: number, message: string }> = {
  NOT_FOUND: { statusCode: 404, message: 'Utilisateur introuvable.' },
  EMAIL_TAKEN: { statusCode: 409, message: 'Un compte existe déjà avec cette adresse email.' },
  WEAK_PASSWORD: { statusCode: 400, message: 'Le mot de passe ne respecte pas toutes les règles de sécurité.' },
  INVALID_INPUT: { statusCode: 400, message: 'Veuillez renseigner un nom et une adresse email valide.' },
  INVALID_ROLE: { statusCode: 400, message: 'Rôle inconnu.' },
  SELF_DELETE: { statusCode: 400, message: 'Vous ne pouvez pas supprimer votre propre compte depuis cette page.' },
  SELF_DEMOTE: { statusCode: 400, message: 'Vous ne pouvez pas retirer votre propre rôle de gérant.' },
}

export function userError(reason: UserError) {
  return createError(ERRORS[reason])
}
