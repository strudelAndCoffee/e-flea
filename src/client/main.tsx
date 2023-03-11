import React from 'react'
import ReactDOM from 'react-dom/client'
// import CssBaseline from '@mui/material/CssBaseline'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ErrorBoundary, ErrorPage } from './error_boundary'
import App from './App'
import './css/index.css'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary fallback={<ErrorPage />}>
        <App />
      </ErrorBoundary>
    </QueryClientProvider>
  </React.StrictMode>
)
