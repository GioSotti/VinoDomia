import { getAccount } from '../../services/account.service'
import { requireUserId } from '../../utils/session'

export default defineEventHandler(async (event) => {
  const account = await getAccount(requireUserId(event))
  if (!account) throw createError({ statusCode: 404, message: 'Compte introuvable.' })
  return account
})
