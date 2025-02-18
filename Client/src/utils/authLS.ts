export const saveAccessTokenToLocalStorage = (access_token: string) => {
  localStorage.setItem('access_token', access_token)
}

export const getAccessTokenFromLocalStorage = (): string => {
  return localStorage.getItem('access_token') || ''
}

export const clearAccessTokenLocalStorage = () => {
  localStorage.clear()
}
