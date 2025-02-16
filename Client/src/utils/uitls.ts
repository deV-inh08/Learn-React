import { AxiosError, isAxiosError } from 'axios'
import HttpStatusCode from '../constants/httpStatusCode.enum'

// Type Predicate Function

export function isAxiosErrorFunc(error: unknown): error is AxiosError {
  return isAxiosError(error)
}

// Check Error UnprocessableEntityError
export function isAxiosUnprocessableEntityError<FormError>(error: unknown): error is AxiosError<FormError> {
  return isAxiosErrorFunc(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}