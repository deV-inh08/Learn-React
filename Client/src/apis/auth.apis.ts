import http from '../utils/http'
import { AuthReponse } from '../types/auth.type'
interface Body {
  email: string
  password: string
}

export const PATH_URLS = {
  URL_REGISTER: 'register',
  URL_LOGIN: 'login',
  URL_LOGOUT: 'logout',
  URL_REFRESH_TOKEN: 'refresh-access-token'
} as const

const authApi = {
  // Call API '/register' Recive 'body' includes email: string && password: string
  registerAccount: (body: Body) => http.post<AuthReponse>(PATH_URLS.URL_REGISTER, body),
  // Call API path.login, Recive 'body' includes email: string && password: string
  loginAccount: (body: Body) => http.post<AuthReponse>(PATH_URLS.URL_LOGIN, body),
  // Call API '/logout'
  logoutAccount: () => http.post(PATH_URLS.URL_LOGOUT)
}

export default authApi
