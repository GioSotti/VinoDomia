import type { AccountError } from '../services/account.service'

const ERRORS: Record<AccountError, { statusCode: number, message: string }> = {
  NOT_FOUND: { statusCode: 404, message: 'Compte introuvable.' },
  WRONG_PASSWORD: { statusCode: 403, message: 'Le mot de passe actuel est incorrect.' },
  EMAIL_TAKEN: { statusCode: 409, message: 'Un compte existe déjà avec cette adresse email.' },
  WEAK_PASSWORD: { statusCode: 400, message: 'Le nouveau mot de passe ne respecte pas toutes les règles de sécurité.' },
  INVALID_INPUT: { statusCode: 400, message: 'Veuillez renseigner un nom et une adresse email valide.' },
}

export function accountError(reason: AccountError) {
  return createError(ERRORS[reason])
}
