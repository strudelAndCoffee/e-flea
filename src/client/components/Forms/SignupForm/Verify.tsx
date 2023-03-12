import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

type VerifyData = {
  username: string
  email: string
  password: string
  first_name: string
  last_name: string
  dob_day: number | string
  dob_month: number | string
  dob_year: number | string
  vendor_account: boolean
}
type VerifyProps = VerifyData & {
  updateFields: (fields: Partial<VerifyData>) => void
}

export default function Verify({
  username,
  email,
  password,
  first_name,
  last_name,
  dob_day,
  dob_month,
  dob_year,
  vendor_account,
  updateFields,
}: VerifyProps) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="subtitle2" align="center">
          Verify
        </Typography>
        <Button type="submit">Create Account</Button>
      </Grid>
    </Grid>
  )
}
