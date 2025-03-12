import { describe, expect, it } from 'vitest'
import { logScreen, renderWithRouter } from '../../utils/testUtils'
import { path } from '../../constants/path'
import { screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'

describe('Test Login Page', () => {
  it('Hiển thị require khi không nhập gì', async () => {
    const { user } = renderWithRouter({ router: path.login })
    await waitFor(() => {
      expect(screen.queryByPlaceholderText(/Enter your email/i)).toBeInTheDocument()
      expect(screen.queryByPlaceholderText(/Enter your password/i)).toBeInTheDocument()
    })
    const submitButton = document.querySelector('form button[type="submit"]') as HTMLElement
    user.click(submitButton)
    expect(await screen.findByText('Email là bắt buộc !')).toBeTruthy()
    expect(await screen.findByText('Password là bắt buộc !')).toBeTruthy()
    await logScreen()
  })
})
