import { beforeAll, describe, expect, it } from 'vitest'
import { renderWithRouter } from '../../utils/testUtils'
import { path } from '../../constants/path'
import { fireEvent, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'

describe('Test Login Page', () => {
  let emailInput: HTMLInputElement, passwordInput: HTMLInputElement, submitButton: HTMLButtonElement
  // 🔥 beforeAll: Chạy 1 lần trước tất cả tests
  beforeAll(async () => {
    renderWithRouter({ router: path.login })
    await waitFor(() => {
      expect(document.querySelector('title')?.textContent).toBe('Đăng nhập | Shopee Clone')
      expect(screen.getByPlaceholderText(/Enter your email/i)).toBeInTheDocument()
      expect(screen.getByPlaceholderText(/Enter your password/i)).toBeInTheDocument()
      screen.debug()
    })
    emailInput = document.querySelector('form input[type="email"]') as HTMLInputElement
    passwordInput = document.querySelector('form input[type="password"]') as HTMLInputElement
    submitButton = document.querySelector('form button[type="submit"]') as HTMLButtonElement
  })
  it('Display required error when nothing is entered', async () => {
    submitButton = document.querySelector('form button[type="submit"]') as HTMLButtonElement
    fireEvent.click(submitButton)

    // findByText || get => Promise
    expect(await screen.findByText('Email là bắt buộc !')).toBeTruthy()
    expect(await screen.findByText('Password là bắt buộc !')).toBeTruthy()
  })

  it('Enter email and password in incorrect format', async () => {
    fireEvent.change(emailInput, {
      target: {
        value: 'test@gml'
      }
    })
    fireEvent.change(passwordInput, {
      target: {
        value: '12'
      }
    })
    fireEvent.submit(submitButton)
    expect(await screen.findByText('Email là bắt buộc !')).toBeTruthy()
    expect(await screen.findByText('Độ dài từ 5 - 160 ký tự')).toBeTruthy()
  })
  it('Errors should not be display when entering valid email and password', async () => {
    fireEvent.change(emailInput, {
      target: {
        value: 'tranvinh20t@gmail.com'
      }
    })
    fireEvent.change(passwordInput, {
      target: {
        value: '301108'
      }
    })
    await waitFor(() => {
      // queryByText: return HTML Element | null
      expect(screen.queryByText('Email không đúng định dạng')).toBeFalsy()
      expect(screen.queryByText('Độ dài từ 5 - 160 ký tự')).toBeFalsy()
    })
    fireEvent.submit(submitButton)
    await waitFor(() => {
      expect(document.querySelector('title')?.textContent).toBe('Trang chủ | Shopee Clone')
    })
  })
})
