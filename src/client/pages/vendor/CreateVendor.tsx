import { Link } from 'react-router-dom'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { useAuthStore, useNavStore } from '../../state'
import { CreateVendorForm } from '../../components'
import { ErrorBoundary, ErrorPage } from '../../error_boundary'

function RedirectMessage() {
  const setFromRedirect = useNavStore((state) => state.setFromRedirect)
  return (
    <Box display="flex" flexDirection="column" alignItems="center" pt={5}>
      <Typography variant="h6" align="center" gutterBottom>
        You must have a vendor account to create a new store! You may go to
        settings on your{' '}
        <Link to="/account" onClick={() => setFromRedirect(true)}>
          account page
        </Link>{' '}
        to change to a vendor account.
      </Typography>
      <Typography variant="h6" align="center" gutterBottom>
        If you already have an account, please{' '}
        <Link to="/login" onClick={() => setFromRedirect(true)}>
          log in
        </Link>
        , or{' '}
        <Link to="/signup" onClick={() => setFromRedirect(true)}>
          sign up{' '}
        </Link>
        to create a new account.
      </Typography>
    </Box>
  )
}

export default function CreateVendor() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)
  const isVendorAccount = useAuthStore((state) => state.isVendorAccount)

  return (
    <ErrorBoundary fallback={<ErrorPage />}>
      <Container maxWidth={isLoggedIn || isVendorAccount ? 'sm' : 'md'}>
        {isLoggedIn && isVendorAccount ? (
          <CreateVendorForm />
        ) : (
          <RedirectMessage />
        )}
      </Container>
    </ErrorBoundary>
  )
}
