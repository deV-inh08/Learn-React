import http from '../utils/http'
import { AuthReponse } from '../types/auth.type'

interface Body {
  email: string
  password: string
}

// Call API '/register' Recive 'body' includes email: string && password: string
export const registerAccount = (body: Body) => http.post<AuthReponse>('/register', body)

// Call API '/login', Recive 'body' includes email: string && password: string
export const loginAccount = (body: Body) => http.post('/login', body)
