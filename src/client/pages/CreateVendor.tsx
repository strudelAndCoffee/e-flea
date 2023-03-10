import { Link } from 'react-router-dom'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { useAuthStore } from '../state'
import { CreateVendorForm } from '../components'

export default function CreateVendor() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)

  return (
    <Container component="section" maxWidth="md">
      {isLoggedIn ? (
        <CreateVendorForm />
      ) : (
        <Box display="flex" flexDirection="column" alignItems="center" pt={5}>
          <Typography variant="h5" gutterBottom>
            You must have a user account to create a new store!
          </Typography>
          <Typography variant="h5" gutterBottom>
            Please{' '}
            <Button variant="outlined">
              <Link to={'/login'}>log in</Link>
            </Button>{' '}
            or{' '}
            <Button variant="outlined">
              <Link to={'/signup'}>sign up</Link>
            </Button>{' '}
            for an account.
          </Typography>
        </Box>
      )}
    </Container>
  )
}
