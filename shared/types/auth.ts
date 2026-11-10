export type AuthResponse = {
  statusCode: number
  body: {
    success: boolean
    message: string
    token?: string
  }
}

export type LoginPayload = {
  email: string
  password: string
}

export type RegisterPayload = LoginPayload & {
  name: string
}

export type JwtPayload = {
  id: number
  email: string
  exp?: number
}
