import { beforeAll, describe, expect, it } from 'vitest'
import { renderWithRouter } from '../../utils/testUtils'
import { path } from '../../constants/path'
import { screen, waitFor, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'

describe('Test Login Page', () => {
  // 🔥 beforeAll: Chạy 1 lần trước tất cả tests
  beforeAll(async () => {
    renderWithRouter({ router: path.login })
    await waitFor(() => {
      expect(screen.getByPlaceholderText(/Enter your email/i)).toBeInTheDocument()
      expect(screen.getByPlaceholderText(/Enter your password/i)).toBeInTheDocument()
    })
  })
  it('Display required error when nothing is entered', async () => {
    const submitButton = document.querySelector('form button[type="submit"]') as HTMLButtonElement
    fireEvent.click(submitButton)
    expect(await screen.findByText('Email là bắt buộc !')).toBeTruthy()
    expect(await screen.findByText('Password là bắt buộc !')).toBeTruthy()
  })

  it('Enter email and password in incorrect format', async () => {
    const emailInput = document.querySelector('form input[type="email"]') as HTMLInputElement
    const passwordInput = document.querySelector('form input[type="password"]') as HTMLInputElement
    const submitButton = document.querySelector('form button[type="submit"]') as HTMLButtonElement
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
})
