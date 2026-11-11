export type Account = {
  id: number
  name: string | null
  email: string
  role: number
  createdAt: string
  termsAcceptedAt: string | null
  termsVersion: string | null
}

export type UpdateProfilePayload = {
  name: string
  email: string
  currentPassword?: string
}

export type ChangePasswordPayload = {
  currentPassword: string
  newPassword: string
}

export type DeleteAccountPayload = {
  password: string
}
