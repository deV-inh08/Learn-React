import { describe, test, expect } from 'vitest'
import '@testing-library/jest-dom/vitest'
import { screen, waitFor } from '@testing-library/react'
import { renderWithRouter } from './utils/testUtils'
import { path } from './constants/path'

describe('App', () => {
  test('App render và chuyển trang', async () => {
    const { user } = renderWithRouter()
    // App nằm trong browser router
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
    await user.click(screen.getByText(/Đăng nhập/i))

    // Chờ nội dung "Bạn chưa có tài khoản?" xuất hiện sau khi chuyển trang
    await waitFor(() => {
      expect(screen.getByText(/Bạn chưa có tài khoản/i)).toBeInTheDocument()
    })

    await waitFor(() => {
      expect(document.querySelector('title')?.textContent).toBe('Đăng nhập | Shopee Clone')
    })
    screen.debug(document.body.parentElement as HTMLElement, 99999999)
  })

  test('To Not Found Page', async () => {
    const badRouter = '/some/bad/route'
    renderWithRouter({ router: badRouter })
    await waitFor(() => {
      expect(screen.getByText(/404/i)).toBeInTheDocument()
    })
  })

  test('Render register page', async () => {
    renderWithRouter({ router: path.register })
    await waitFor(() => {
      expect(screen.getByText(/Bạn đã có tài khoản?/i)).toBeInTheDocument()
    })
  })
})
