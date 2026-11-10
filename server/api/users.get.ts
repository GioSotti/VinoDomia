import { findAllUsers } from '../services/user.service'

export default defineEventHandler(() => findAllUsers())
