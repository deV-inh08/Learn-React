import http from '../utils/http'
import { AuthReponse } from '../types/auth.type'

// Recive 'body' includes email: string && password: string
export const registerAccount = (body: { email: string; password: string }) => http.post<AuthReponse>('/registerr', body)

// tranvinh16t@gmail.com
// 301108