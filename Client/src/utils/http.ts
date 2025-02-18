import axios, { type AxiosInstance, AxiosError } from 'axios'
import { toast } from 'react-toastify'
import HttpStatusCode from '../constants/httpStatusCode.enum'
import { AuthReponse } from '../types/auth.type'
import { clearAccessTokenLocalStorage, getAccessTokenFromLocalStorage, saveAccessTokenToLocalStorage } from './authLS'

class Http {
  instance: AxiosInstance
  // save accessToken in RAM
  private accessToken: string
  constructor() {
    this.accessToken = getAccessTokenFromLocalStorage()
    this.instance = axios.create({
      baseURL: 'https://api-ecom.duthanhduoc.com',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    // Add a response interceptor
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        if (url === '/login' || url === '/register') {
          // check type SuccessResponse and Error Response
          this.accessToken = (response.data as AuthReponse).data.access_token
          saveAccessTokenToLocalStorage(this.accessToken)
        } else if (url == '/logout') {
          this.accessToken = ''
          clearAccessTokenLocalStorage()
        }
        return response
      },
      function (error: AxiosError) {
        // XXXX DON't USE XXXXX
        // if (isAxiosUnprocessableEntityError(error)) {
        //   console.log(error) => when we use "!" => error: never
        // }

        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any | undefined = error.response?.data
          const message = (data.message || error.message) as string
          toast.error(message, {
            autoClose: 2000
          })
        }
        return error
      }
    )

    // Add request interceptor
    this.instance.interceptors.request.use(
      (config) => {
        // send 'accessToken' when user request
        if (this.accessToken && config.headers) {
          config.headers.authorization = this.accessToken
          return config
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance
export default http
