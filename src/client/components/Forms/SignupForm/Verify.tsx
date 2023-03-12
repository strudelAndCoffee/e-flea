import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { DOBType } from '../../../lib/form_data'

interface VerifyProps {
  username: string
  email: string
  password: string
  first_name: string
  last_name: string
  dob: DOBType
  vendor_account: boolean
}

export default function Verify({
  username,
  email,
  password,
  first_name,
  last_name,
  dob,
  vendor_account,
}: VerifyProps) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="subtitle2" align="center">
          Verify
        </Typography>
      </Grid>
    </Grid>
  )
}
