import { createUser } from '../../services/user.service'
import { requireAdmin } from '../../utils/session'
import { userError } from '../../utils/userErrors'
import type { CreateUserPayload } from '#shared/types/users'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const body = await readBody<Partial<CreateUserPayload>>(event)

  const result = await createUser({ name: body.name ?? '', email: body.email ?? '', role: body.role as number, password: body.password ?? '' })
  if (!result.success) throw userError(result.reason)

  return result.user
})
