import { changePassword } from '../../services/account.service'
import { requireUserId } from '../../utils/session'
import { accountError } from '../../utils/accountErrors'
import type { ChangePasswordPayload } from '#shared/types/account'

export default defineEventHandler(async (event) => {
  const body = await readBody<Partial<ChangePasswordPayload>>(event)

  const result = await changePassword(requireUserId(event), { currentPassword: body.currentPassword ?? '', newPassword: body.newPassword ?? '' })
  if (!result.success) throw accountError(result.reason)

  return { success: true }
})
