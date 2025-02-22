import http from '../utils/http'
import { AuthReponse } from '../types/auth.type'
import { path } from '../constants/path'

interface Body {
  email: string
  password: string
}

const authApi = {
  // Call API '/register' Recive 'body' includes email: string && password: string
  registerAccount: (body: Body) => http.post<AuthReponse>(path.register, body),
  // Call API path.login, Recive 'body' includes email: string && password: string
  loginAccount: (body: Body) => http.post<AuthReponse>(path.login, body),
  // Call API '/logout'
  logoutAccount: () => http.post(path.logout)
}

export default authApi
