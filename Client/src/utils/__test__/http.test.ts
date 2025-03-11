import { describe, expect, it } from 'vitest'
import { Http } from '../http'
import HttpStatusCode from '../../constants/httpStatusCode.enum'
import { beforeEach } from 'node:test'
import { setAccessTokenToLocalStorage, setRefreshTokenToLS } from '../authLS'

describe('http axios', () => {
  const access_token_1s =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YjQyMmUxZmIzNzMyMDQxNjFlZTlkMSIsImVtYWlsIjoidHJhbnZpbmgyMHRAZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyNS0wMy0xMVQwMzo1NzoyOS41OTZaIiwiaWF0IjoxNzQxNjY1NDQ5LCJleHAiOjE3NDE2NjU0NTB9.l7HzXCHM8du4vkRMoTl-LYLYNbDXGEkBC0ljlcDNu28'
  const refresh_token_1000days =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YjQyMmUxZmIzNzMyMDQxNjFlZTlkMSIsImVtYWlsIjoidHJhbnZpbmgyMHRAZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyNS0wMy0xMVQwMzo1NzoyOS41OTZaIiwiaWF0IjoxNzQxNjY1NDQ5LCJleHAiOjE3NTAzMDU0NDl9.KU3OZ2OqNjlmbWIHDnwnXlNTW6A2FvgKD4Kv0jp6T1M'

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
