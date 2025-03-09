import { SuccessResponse } from './util.type'
import { User } from './user.type'

export type AuthReponse = SuccessResponse<{
  access_token: string
  expires: number
  refresh_token: string
  expires_refresh_token: number
  user: User
}>

export type RefreshTokenResponse = SuccessResponse<{
  access_token: string
}>
