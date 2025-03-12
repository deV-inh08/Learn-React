import React from 'react'
import { withRouter } from 'storybook-addon-remix-react-router'
import type { Preview } from '@storybook/react'
import '../src/index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AppProvider } from '../src/contexts/app.context'
import { HelmetProvider } from 'react-helmet-async'
import ErrorBoundary from '../src/components/ErrorBoundary/ErrorBoundary'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      // turn off retry API, when errors
      retry: 0
    }
  }
})

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  },
  decorators: [
    withRouter,
    (Story) => (
       <QueryClientProvider client={queryClient}>
          <AppProvider>
            <HelmetProvider>
              <AppProvider>
                <ErrorBoundary>
                  <Story></Story>
                </ErrorBoundary>
              </AppProvider>
            </HelmetProvider>
          </AppProvider>
        </QueryClientProvider>
       
    )
  ]
}

export default preview
