// Starter code for SignIn form component example template copied from Material UI: https://github.com/mui/material-ui/blob/v5.11.12/docs/data/material/getting-started/templates/sign-in/SignIn.tsx

import { FormEvent } from 'react'
import axios from 'axios'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
// import FormControlLabel from '@mui/material/FormControlLabel'
// import Checkbox from '@mui/material/Checkbox'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import { Link, useNavigate } from 'react-router-dom'

import { shallow } from 'zustand/shallow'
import { useAuthStore, useNavStore } from '../../state'

export default function LoginForm() {
  const { setIsLoggedIn, setUserID } = useAuthStore(
    (state) => ({
      setIsLoggedIn: state.setIsLoggedIn,
      setUserID: state.setUserID,
    }),
    shallow
  )
  const { fromRedirect, setFromRedirect } = useNavStore(
    (state) => ({
      fromRedirect: state.fromRedirect,
      setFromRedirect: state.setFromRedirect,
    }),
    shallow
  )

  const navigate = useNavigate()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    const email = data.get('email')
    const password = data.get('password')

    try {
      const response = await axios.post(
        'http://localhost:3000/auth/users/login',
        {
          email,
          password,
        },
        { withCredentials: true }
      )

      setUserID(response.data.user._id)
      setIsLoggedIn(true)

      if (fromRedirect) {
        setFromRedirect(false)
        navigate(-1)
      }
      navigate('/')
    } catch (err) {
      console.error(err)
      alert('No account exists with these credentials. Please try again.')
    }
  }

  return (
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
        Log In
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          type="email"
          autoComplete="email"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
        <Grid container>
          {/* <Grid item xs>
            <Link to={'/'}>Forgot password?</Link>
          </Grid> */}
          <Grid item>
            Don't have an account?<Link to={'/signup'}> Sign Up</Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}
