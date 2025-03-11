import { beforeEach, describe, expect, it } from 'vitest'
import { clearLS, getAccessTokenFromLocalStorage, getProfileFromLS, getRefreshTokenFromLocalStorage, setAccessTokenToLocalStorage, setProfileToLS, setRefreshTokenToLS } from '../authLS'

const access_token ='Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3Y2JkZGQzMjE2Y2E0MDMzZWQxMGU1NiIsImVtYWlsIjoidHJhbnZpbmgyNHRAZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyNS0wMy0xMVQwMzowMzozOC44NDhaIiwiaWF0IjoxNzQxNjYyMjE4LCJleHAiOjE3NDE3NDg2MTh9.s9X5S0TOroHBy0fb5NQqHCktoqWv-n7_rw5bU1EOAgA'

const refresh_token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3Y2JkZGQzMjE2Y2E0MDMzZWQxMGU1NiIsImVtYWlsIjoidHJhbnZpbmgyNHRAZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyNS0wMy0xMVQwMzowMzozOC44NDhaIiwiaWF0IjoxNzQxNjYyMjE4LCJleHAiOjE3NTU0ODYyMTh9.BtuuYZssXJdeuJCYzOtHg_aBShmbxaQbEIlwm2htVBk'

const profile='{"_id":"67cbddd3216ca4033ed10e56","roles":["User"],"email":"tranvinh24t@gmail.com","createdAt":"2025-03-08T06:04:03.893Z","updatedAt":"2025-03-08T06:04:03.893Z","__v":0}'

beforeEach(() => {
  localStorage.clear()
})

describe('setAccessToken', () => {
  it('access_token được set vào localstorage', () => {
    setAccessTokenToLocalStorage(access_token)
    expect(getAccessTokenFromLocalStorage()).toBe(access_token)
  })
})

describe('setRefreshTokenToLS', () => {
  it('refresh_token được set vào localstorage', () => {
    setRefreshTokenToLS(refresh_token)
    expect(getRefreshTokenFromLocalStorage()).toBe(refresh_token)
  })
})

describe('setProfileToLS', () => {
  it('profile được set vào localstorage', () => {
    setProfileToLS(JSON.parse(profile))
    // toEqual: check Object
    expect(getProfileFromLS()).toEqual(JSON.parse(profile))
  })
})

describe('clearLS', () => {
  it('Xóa hết access_token, fresh_token, profile trong localstorage', () => {
    // Set trước , clear sau cho an toàn
    setAccessTokenToLocalStorage(access_token)
    setRefreshTokenToLS(refresh_token)
    setProfileToLS(JSON.parse(profile))
    clearLS()
    expect(getAccessTokenFromLocalStorage()).toBe('')
    expect(getRefreshTokenFromLocalStorage()).toBe('')
    expect(getProfileFromLS()).toBe(null)
  })
})
