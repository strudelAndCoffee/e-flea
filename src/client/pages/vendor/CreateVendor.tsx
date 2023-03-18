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
      <Typography variant="h5" gutterBottom>
        You must have a user account to create a new store!
      </Typography>
      <Typography variant="h5" gutterBottom>
        Please{' '}
        <Button variant="outlined" onClick={() => setFromRedirect(true)}>
          <Link to={'/login'}>log in</Link>
        </Button>{' '}
        or{' '}
        <Button variant="outlined" onClick={() => setFromRedirect(true)}>
          <Link to={'/signup'}>sign up</Link>
        </Button>{' '}
        for an account.
      </Typography>
    </Box>
  )
}

export default function CreateVendor() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)

  return (
    <ErrorBoundary fallback={<ErrorPage />}>
      <Container maxWidth={isLoggedIn ? 'sm' : 'md'}>
        {isLoggedIn ? <CreateVendorForm /> : <RedirectMessage />}
      </Container>
    </ErrorBoundary>
  )
}
