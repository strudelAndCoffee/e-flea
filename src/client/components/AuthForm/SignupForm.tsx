// Starter code for SignIn form component example template copied from Material UI: https://github.com/mui/material-ui/blob/v5.11.12/docs/data/material/getting-started/templates/sign-up/SignUp.tsx

import { FormEvent } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
// import FormControlLabel from '@mui/material/FormControlLabel'
// import Checkbox from '@mui/material/Checkbox'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
// import { createTheme, ThemeProvider } from '@mui/material/styles'

import { shallow } from 'zustand/shallow'
import { useAuthStore } from '../../state'

// const theme = createTheme()

export default function SignUpForm() {
  const { setIsLoggedIn, setUserID } = useAuthStore(
    (state) => ({
      setIsLoggedIn: state.setIsLoggedIn,
      setUserID: state.setUserID,
    }),
    shallow
  )

  const navigate = useNavigate()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    const username = data.get('username')
    const email = data.get('email')
    const password = data.get('password')

    try {
      const response = await axios.post(
        'http://localhost:3000/auth/users/signup',
        {
          username,
          email,
          password,
        },
        { withCredentials: true }
      )

      console.log(response)

      setUserID(response.data.new_user._id)
      setIsLoggedIn(true)
      navigate('/')
    } catch (err) {
      console.error(err)
      alert('This account already exists. Please try a different username')
    }
  }

  return (
    // <ThemeProvider theme={theme}>
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              Already have an account?
              <Link to={'/login'}> Sign in</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
    // </ThemeProvider>
  )
}
