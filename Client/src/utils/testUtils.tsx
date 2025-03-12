import { screen, waitFor, waitForOptions } from '@testing-library/dom'
import { render } from '@testing-library/react'
import { expect } from 'vitest'
import App from '../App'
import { BrowserRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const delay = (time: number) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, time)
  })

export const logScreen = async (
  body: HTMLElement = document.body.parentElement as HTMLElement,
  options?: waitForOptions
) => {
  const { timeout = 1000 } = options || {}
  await waitFor(
    async () => {
      expect(await delay(timeout - 100)).toBe(true)
    },
    {
      ...options,
      timeout
    }
  )
  screen.debug(body, 99999999)
}

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false
      },
      mutations: {
        retry: false
      }
    }
    // V5 not support
    // logger: {
    //   log: console.log,
    //   warn: console.warn,
    //   error: console.error,
    // }
  })
  const Provider = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
  return Provider
}

const Provider = createWrapper()

export const renderWithRouter = ({ router = '/' } = {}) => {
  window.history.pushState({}, 'Test page', router)
  return {
    user: userEvent.setup(),
    ...render(
      <BrowserRouter>
        <Provider>
          <App />
        </Provider>
      </BrowserRouter>
    )
  }
}
