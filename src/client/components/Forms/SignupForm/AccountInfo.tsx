import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

type AccountInfoData = {
  username: string
  email: string
  password: string
}

type AccountInfoProps = AccountInfoData & {
  updateFields: (fields: Partial<AccountInfoData>) => void
  invalidUsername: boolean
  invalidEmail: boolean
}

export default function AccountInfo({
  username,
  email,
  password,
  updateFields,
  invalidUsername,
  invalidEmail,
}: AccountInfoProps) {
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
          value={username}
          onChange={(e) => updateFields({ username: e.target.value })}
          error={invalidUsername}
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
          value={email}
          onChange={(e) => updateFields({ email: e.target.value })}
          error={invalidEmail}
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
          value={password}
          onChange={(e) => updateFields({ password: e.target.value })}
        />
      </Grid>
    </Grid>
  )
}
