import axios, { type AxiosInstance, AxiosError } from 'axios'
import { toast } from 'react-toastify'
import HttpStatusCode from '../constants/httpStatusCode.enum'

class Http {
  instance: AxiosInstance
  constructor() {
    this.instance = axios.create({
      baseURL: 'https://api-ecom.duthanhduoc.com',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    // Add a response interceptor
    this.instance.interceptors.response.use(
      function (response) {
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
  }
}

const http = new Http().instance
export default http
