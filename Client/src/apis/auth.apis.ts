import http from '../utils/http'
import { AuthReponse } from '../types/auth.type'
import { path } from '../constants/path'

interface Body {
  email: string
  password: string
}

// Call API '/register' Recive 'body' includes email: string && password: string
export const registerAccount = (body: Body) => http.post<AuthReponse>(path.register, body)

// Call API path.login, Recive 'body' includes email: string && password: string
export const loginAccount = (body: Body) => http.post<AuthReponse>(path.login, body)

// Call API '/logout'
export const logoutAccount = () => http.post(path.logout)
