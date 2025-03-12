import { afterAll, afterEach, beforeAll } from 'vitest'
import { setupServer } from 'msw/node'
import { http, HttpResponse } from 'msw'
import { config } from './src/constants/config' 

const loginRes = {
  "message": "Đăng nhập thành công",
  "data": {
      "access_token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YjQyMmUxZmIzNzMyMDQxNjFlZTlkMSIsImVtYWlsIjoidHJhbnZpbmgyMHRAZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyNS0wMy0xMlQwNjoxMjowNC40NDNaIiwiaWF0IjoxNzQxNzU5OTI0LCJleHAiOjE3NDE3NTk5MjV9.xisV7WLhYQ3wBWG73CAzWcVXc4Xie5-7L0ynGoQY6lw",
      "expires": 1,
      "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YjQyMmUxZmIzNzMyMDQxNjFlZTlkMSIsImVtYWlsIjoidHJhbnZpbmgyMHRAZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyNS0wMy0xMlQwNjoxMjowNC40NDNaIiwiaWF0IjoxNzQxNzU5OTI0LCJleHAiOjE3NTAzOTk5MjR9.CVUA_6YsbGuB_NphnrSvARqQ2pBL1HqNVqu5hsMWvqg",
      "expires_refresh_token": 8640000,
      "user": {
          "_id": "67b422e1fb373204161ee9d1",
          "roles": [
              "User"
          ],
          "email": "tranvinh20t@gmail.com",
          "createdAt": "2025-02-18T06:04:17.939Z",
          "updatedAt": "2025-02-18T06:04:17.939Z",
          "__v": 0
      }
  }
}

// export const restHandlers = [http.post(`${config.baseURL}login`, (req, res, ctx) => {
//   return res(ctx.status(HttpStatusCode.Ok), ctx.json(loginRes))
// })]

// const server = setupServer(...restHandlers)

const server = setupServer(
  http.post(`${config.baseURL}login`, async ({ request }) => {
    const { email, password } = await request.json()

    // Kiểm tra email hợp lệ & password phải có ít nhất 6 ký tự
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    const isValidPassword = password.length >= 5
    if (isValidEmail && isValidPassword) {
      return HttpResponse.json(loginRes)
    }
    return new HttpResponse(
      JSON.stringify({ error: 'Invalid email or password' }),
      { status: 401 }
    )
  })
)

// start server before all test
beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }))

// close server after all tests
afterAll(() => server.close())

// Reset handlers after each test 'important for test isolations'
afterEach(() => server.resetHandlers())