import { deleteUser } from '../../services/user.service'
import { requireAdmin } from '../../utils/session'
import { userError } from '../../utils/userErrors'

export default defineEventHandler(async (event) => {
  const actorId = await requireAdmin(event)

  const result = await deleteUser(actorId, Number(getRouterParam(event, 'id')))
  if (!result.success) throw userError(result.reason)

  return { success: true }
})
