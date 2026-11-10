export type ManagedUser = {
  id: number
  name: string | null
  email: string
  role: number
  createdAt: string
  termsAcceptedAt: string | null
}

export type CreateUserPayload = {
  name: string
  email: string
  role: number
  password: string
}

export type UpdateUserPayload = {
  name: string
  email: string
  role: number
  password?: string
}
