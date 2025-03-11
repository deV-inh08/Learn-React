import { describe, test, expect } from 'vitest'
import '@testing-library/jest-dom/vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

describe('App', () => {
  test('App render và chuyển trang', async () => {
    // App nằm trong browser router
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )

    const user = userEvent.setup()

    // verify to Home Page
    await waitFor(
      () => {
        expect(document.querySelector('title')?.textContent).toBe('Trang chủ | Shopee Clone')
      },
      {
        timeout: 1000
      }
    )

    // verify to Login Page
    // Đảm bảo nút "Đăng nhập" xuất hiện trước khi click
    const loginButton = await screen.getByText(/Đăng nhập/i)
    await user.click(loginButton)

    // Chờ nội dung "Bạn chưa có tài khoản?" xuất hiện sau khi chuyển trang
    await waitFor(() => {
      expect(screen.getByText(/Bạn chưa có tài khoản/i)).toBeInTheDocument()
    })
    await waitFor(() => {
      expect(document.querySelector('title')?.textContent).toBe('Đăng nhập | Shopee Clone')
    })
    screen.debug(document.body.parentElement as HTMLElement, 99999999)
  })
})
