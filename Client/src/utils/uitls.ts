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

// Format number 'price'
export function formatCurrency(currency: number) {
  return new Intl.NumberFormat('de-DE').format(currency)
}

export function formatNumberToSocialStyle(value: number) {
  return new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 1
  })
    .format(value)
    .replace('.', ',')
    .toLocaleLowerCase()
}

export function rateSale(original: number, sale: number): string {
  return Math.round(((original - sale) / original) * 100) + '%'
}
