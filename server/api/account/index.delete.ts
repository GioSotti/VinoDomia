import { deleteAccount } from '../../services/account.service'
import { requireUserId } from '../../utils/session'
import { accountError } from '../../utils/accountErrors'
import type { DeleteAccountPayload } from '#shared/types/account'

export default defineEventHandler(async (event) => {
  const body = await readBody<Partial<DeleteAccountPayload>>(event)

  const result = await deleteAccount(requireUserId(event), body.password ?? '')
  if (!result.success) throw accountError(result.reason)

  return { success: true }
})
