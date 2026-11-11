import { updateUser } from '../../services/user.service'
import { requireAdmin } from '../../utils/session'
import { userError } from '../../utils/userErrors'
import type { UpdateUserPayload } from '#shared/types/users'

export default defineEventHandler(async (event) => {
  const actorId = await requireAdmin(event)
  const id = Number(getRouterParam(event, 'id'))
  const body = await readBody<Partial<UpdateUserPayload>>(event)

  const result = await updateUser(actorId, id, { name: body.name ?? '', email: body.email ?? '', role: body.role as number, password: body.password || undefined })
  if (!result.success) throw userError(result.reason)

  return result.user
})
