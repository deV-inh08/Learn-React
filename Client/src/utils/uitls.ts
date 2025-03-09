import { AxiosError, isAxiosError } from 'axios'
import HttpStatusCode from '../constants/httpStatusCode.enum'
import { config } from '../constants/config'
import { avatar_default } from '../constants/avatar'
// import { ErrorResponse } from 'react-router-dom'
import { ErrorResponse } from '../types/util.type'

// Type Predicate Function

export function isAxiosErrorFunc(error: unknown): error is AxiosError {
  return isAxiosError(error)
}

// Check Error UnprocessableEntityError
export function isAxiosUnprocessableEntityError<FormError>(error: unknown): error is AxiosError<FormError> {
  return isAxiosErrorFunc(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}

// check Error UnanthorizedError
export function isAxiosUnauthorizedError<UnauthorizedError>(error: unknown): error is AxiosError<UnauthorizedError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.Unauthorized
}

// check Error ExpiredToken
export function isAxiosExpiredTokenError<ExpiredTokenError>(error: unknown): error is ExpiredTokenError {
  return (
    isAxiosUnauthorizedError<ErrorResponse<{ name: string; message: string }>>(error) &&
    error.response?.data.data?.name === 'EXPIRED_TOKEN'
  )
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

const removeSpecialCharacter = (str: string) =>
  // eslint-disable-next-line no-useless-escape
  str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, '')

export const generateNameId = ({ name, id }: { name: string; id: string }) => {
  return removeSpecialCharacter(name).replace(/\s/g, '-') + `-i-${id}`
}

export const getIdFromNameId = (nameId: string) => {
  const arr = nameId.split('-i-')
  return arr[arr.length - 1]
}

export const getAvatarName = (avatarName?: string) =>
  avatarName ? `${config.baseURL}/images/${avatarName}` : avatar_default
