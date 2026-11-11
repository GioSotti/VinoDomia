import { findAllUsers } from '../../services/user.service'
import { requireAdmin } from '../../utils/session'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  return findAllUsers()
})
