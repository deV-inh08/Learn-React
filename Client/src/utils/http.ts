import axios, { type AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios'
import { toast } from 'react-toastify'
import HttpStatusCode from '../constants/httpStatusCode.enum'
import { AuthReponse, RefreshTokenResponse } from '../types/auth.type'
import {
  clearLS,
  getAccessTokenFromLocalStorage,
  getRefreshTokenFromLocalStorage,
  setAccessTokenToLocalStorage,
  setProfileToLS,
  setRefreshTokenToLS
} from './authLS'
import { config } from '../constants/config'
import { PATH_URLS } from '../apis/auth.apis'
import { isAxiosExpiredTokenError, isAxiosUnauthorizedError } from './uitls'

export class Http {
  instance: AxiosInstance
  // save accessToken in RAM
  private accessToken: string
  private refreshToken: string
  private refreshTokenRequest: Promise<string> | null
  constructor() {
    this.accessToken = getAccessTokenFromLocalStorage()
    this.refreshToken = getRefreshTokenFromLocalStorage()
    this.refreshTokenRequest = null
    this.instance = axios.create({
      baseURL: config.baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        'expire-access-token': 60 * 60 * 24, // 1 day
        'expire-refresh-token': 60 * 60 * 24 * 160 // 160 days
      }
    })
    // Add a response interceptor
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        if (url === PATH_URLS.URL_LOGIN || url === PATH_URLS.URL_REGISTER) {
          // check type SuccessResponse and Error Response
          const data = response.data as AuthReponse
          this.accessToken = data.data.access_token
          this.refreshToken = data.data.refresh_token
          setAccessTokenToLocalStorage(this.accessToken)
          setRefreshTokenToLS(this.refreshToken)
          setProfileToLS(data.data.user)
        } else if (url === PATH_URLS.URL_LOGOUT) {
          this.accessToken = ''
          this.refreshToken = ''
          clearLS()
        }
        return response
      },
      async (error: AxiosError) => {
        // XXXX DON't USE XXXXX
        // if (isAxiosUnprocessableEntityError(error)) {
        //   console.log(error) => when we use "!" => error: never
        // }

        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any | undefined = error.response?.data
          const message = (data?.message || error.message) as string
          toast.error(message, {
            autoClose: 2000
          })
        }
        /* 
          401(Unauthorized) có nhiều trường hợp:
          - Token không đúng
          - Không truyền Token
          - Token hết hạn
        */
        if (isAxiosUnauthorizedError(error)) {
          // if Expired Token
          if (isAxiosExpiredTokenError(error)) {
            const config = error.response?.config || ({ headers: {} } as InternalAxiosRequestConfig) // fix typeScript
            const url = (config && config.url) || ''
            if (isAxiosExpiredTokenError(error) && url !== PATH_URLS.URL_REFRESH_TOKEN) {
              this.refreshTokenRequest = this.refreshTokenRequest
                ? this.refreshTokenRequest
                : this.handleRefreshToken().finally(() => {
                    setTimeout(() => {
                      this.refreshTokenRequest = null
                    }, 10000)
                  })
              return this.refreshTokenRequest.then((access_token) => {
                if (config?.headers) config.headers.authorization = access_token
                return this.instance({ ...config, headers: { ...config.headers, authorization: access_token } })
              })
            }
            clearLS()
            this.accessToken = ''
            this.refreshToken = ''
          }
        }
        return Promise.reject(error)
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
  private handleRefreshToken() {
    // post refresh token
    return (
      this.instance
        .post<RefreshTokenResponse>(PATH_URLS.URL_REFRESH_TOKEN, {
          refresh_token: this.refreshToken
        })
        .then((res) => {
          // get access_token and save in LS
          const { access_token } = res.data.data
          setAccessTokenToLocalStorage(access_token)
          this.accessToken = access_token
          return access_token
        })
        // Error => Refresh token expire
        .catch((error) => {
          clearLS()
          this.accessToken = ''
          this.refreshToken = ''
          throw error
        })
    )
  }
}

const http = new Http().instance
export default http
