// import { afterAll, afterEach, beforeAll } from 'vitest'
// import { setupServer } from 'msw/node'
// import { http, HttpResponse } from 'msw'
// import { config } from '../constants/config'
// import HttpStatusCode from '../constants/httpStatusCode.enum'

// export const access_token_1s =
//   'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YjQyMmUxZmIzNzMyMDQxNjFlZTlkMSIsImVtYWlsIjoidHJhbnZpbmgyMHRAZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyNS0wMy0xMlQwOTowMjo1MC42MzdaIiwiaWF0IjoxNzQxNzcwMTcwLCJleHAiOjE3NTE3NzAxNjl9.E7G8qyEwDzJwI0UCxCgD88x5oBSTzr_K7AGMrUA9bNY'
// export const refresh_token_1000days =
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YjQyMmUxZmIzNzMyMDQxNjFlZTlkMSIsImVtYWlsIjoidHJhbnZpbmgyMHRAZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyNS0wMy0xMlQwOTowMjo1MC42MzdaIiwiaWF0IjoxNzQxNzcwMTcwLCJleHAiOjE3NTA0MTAxNzB9.4oWGlzr3_4CS5PnlIErpZKQID_xPst16b6CF5acN9p0'

// export const loginRes = {
//   "message": "Đăng nhập thành công",
//   "data": {
//     "access_token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YjQyMmUxZmIzNzMyMDQxNjFlZTlkMSIsImVtYWlsIjoidHJhbnZpbmgyMHRAZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyNS0wMy0xMlQwNjoxMjowNC40NDNaIiwiaWF0IjoxNzQxNzU5OTI0LCJleHAiOjE3NDE3NTk5MjV9.xisV7WLhYQ3wBWG73CAzWcVXc4Xie5-7L0ynGoQY6lw",
//     "expires": 1,
//     "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YjQyMmUxZmIzNzMyMDQxNjFlZTlkMSIsImVtYWlsIjoidHJhbnZpbmgyMHRAZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyNS0wMy0xMlQwNjoxMjowNC40NDNaIiwiaWF0IjoxNzQxNzU5OTI0LCJleHAiOjE3NTAzOTk5MjR9.CVUA_6YsbGuB_NphnrSvARqQ2pBL1HqNVqu5hsMWvqg",
//     "expires_refresh_token": 8640000,
//     "user": {
//       "_id": "67b422e1fb373204161ee9d1",
//       "roles": [
//         "User"
//       ],
//       "email": "tranvinh20t@gmail.com",
//       "createdAt": "2025-02-18T06:04:17.939Z",
//       "updatedAt": "2025-02-18T06:04:17.939Z",
//       "__v": 0
//     }
//   }
// }

// const loginRequest = http.post(`${config.baseURL}login`, () => {
//   return {
//     status: HttpStatusCode.Ok,
//     body: HttpResponse.json(loginRes)
//   }
// })

