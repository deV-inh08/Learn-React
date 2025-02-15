import { ResponseApi } from './util.type'
import { User } from './user.type'

export type AuthReponse = ResponseApi<{
  access_token: string
  expires: string
  user: User
}>
