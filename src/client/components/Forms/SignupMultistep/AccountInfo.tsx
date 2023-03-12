import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

export default function AccountInfo() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="subtitle2" align="center">
          Accout Info
        </Typography>
      </Grid>
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
          type="email"
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
  )
}
