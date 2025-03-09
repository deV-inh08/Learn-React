import { User } from '../types/user.type'

export const LocalStorageEventTarget = new EventTarget()

export const setAccessTokenToLocalStorage = (access_token: string) => {
  localStorage.setItem('access_token', access_token)
}

export const setRefreshTokenToLS = (refresh_token: string) => {
  localStorage.setItem('refresh_token', refresh_token)
}

export const getAccessTokenFromLocalStorage = (): string => {
  return localStorage.getItem('access_token') || ''
}

export const getRefreshTokenFromLocalStorage = (): string => {
  return localStorage.getItem('refresh_token') || ''
}

export const clearLS = () => {
  localStorage.clear()
  const clearLSEvent = new Event('clearLS')
  LocalStorageEventTarget.dispatchEvent(clearLSEvent)
}

export const getProfileFromLS = () => {
  const result = localStorage.getItem('profile')
  return result ? JSON.parse(result) : null
}

export const setProfileToLS = (profile: User) => {
  localStorage.setItem('profile', JSON.stringify(profile))
}
