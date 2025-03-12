import { describe, expect, it } from 'vitest'
import { Http } from '../http'
import HttpStatusCode from '../../constants/httpStatusCode.enum'
import { beforeEach } from 'node:test'
import { setAccessTokenToLocalStorage, setRefreshTokenToLS } from '../authLS'

describe('http axios', () => {
  const access_token_1s =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YjQyMmUxZmIzNzMyMDQxNjFlZTlkMSIsImVtYWlsIjoidHJhbnZpbmgyMHRAZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyNS0wMy0xMlQwOTowMjo1MC42MzdaIiwiaWF0IjoxNzQxNzcwMTcwLCJleHAiOjE3NTE3NzAxNjl9.E7G8qyEwDzJwI0UCxCgD88x5oBSTzr_K7AGMrUA9bNY'
  const refresh_token_1000days =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YjQyMmUxZmIzNzMyMDQxNjFlZTlkMSIsImVtYWlsIjoidHJhbnZpbmgyMHRAZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyNS0wMy0xMlQwOTowMjo1MC42MzdaIiwiaWF0IjoxNzQxNzcwMTcwLCJleHAiOjE3NTA0MTAxNzB9.4oWGlzr3_4CS5PnlIErpZKQID_xPst16b6CF5acN9p0'
  let http = new Http().instance
  // clear LS
  beforeEach(() => {
    localStorage.clear()
    http = new Http().instance
  })

  // test get Products
  it('Call API', async () => {
    const res = await http.get('products')
    expect(res.status).toBe(HttpStatusCode.Ok)
  })

  // test get Me
  it('Auth Request', async () => {
    // Login, get access_token
    await http.post('login', {
      email: 'tranvinh24t@gmail.com',
      password: '301108'
    })
    // need access_token to get me
    const res = await http.get('me')
    expect(res.status).toBe(HttpStatusCode.Ok)
  })

  it('Refres Token', async () => {
    setAccessTokenToLocalStorage(access_token_1s)
    setRefreshTokenToLS(refresh_token_1000days)
    const httpNew = new Http().instance
    const res = await httpNew.get('me')
    console.log(res)
    expect(res.status).toBe(HttpStatusCode.Ok)
  })
})
