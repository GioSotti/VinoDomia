import { getAccount, updateProfile } from '../../services/account.service'
import { requireUserId } from '../../utils/session'
import { accountError } from '../../utils/accountErrors'
import type { UpdateProfilePayload } from '#shared/types/account'

export default defineEventHandler(async (event) => {
  const id = requireUserId(event)
  const body = await readBody<Partial<UpdateProfilePayload>>(event)

  const result = await updateProfile(id, { name: body.name ?? '', email: body.email ?? '', currentPassword: body.currentPassword })
  if (!result.success) throw accountError(result.reason)

  return { account: await getAccount(id), token: result.token }
})
