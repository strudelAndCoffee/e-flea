import React from 'react'

class ErrorBoundary extends React.Component<
  { children: any; fallback: any },
  { hasError: boolean }
> {
  state = { hasError: false }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error(error, errorInfo)
  }

  render() {
    if (this.state.hasError) return this.props.fallback
    return this.props.children
  }
}

export default ErrorBoundary
