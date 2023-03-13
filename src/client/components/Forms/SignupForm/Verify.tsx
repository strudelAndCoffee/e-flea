import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CheckIcon from '@mui/icons-material/Check'

type VerifyData = {
  username: string
  email: string
  password: string
  first_name: string
  last_name: string
  dob_day: number | string
  dob_month: { value: number | string; name: string }
  dob_year: number | string
  vendor_account: boolean
}
type VerifyProps = VerifyData

interface InfoLineProps {
  title: string
  data: string | boolean
  isAlt?: boolean
}

function InfoLine({ title, data, isAlt }: InfoLineProps) {
  return (
    <Box width="100%" display="flex" alignItems="center" gap={3}>
      <Typography variant="body1" sx={{ flex: '1 0 30%', textAlign: 'right' }}>
        {title}
      </Typography>
      <Typography variant={isAlt ? 'subtitle2' : 'h5'} sx={{ flex: '2 0 70%' }}>
        {typeof data !== 'boolean' ? (
          <>{data}</>
        ) : (
          <>{data ? <CheckIcon fontSize="medium" color="success" /> : 'No'}</>
        )}
      </Typography>
    </Box>
  )
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
}: VerifyProps) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="subtitle2" align="center">
          Verify
        </Typography>
        <Grid item xs={12}>
          <InfoLine title="Username:" data={username} />
          <InfoLine title="Full Name:" data={`${first_name} ${last_name}`} />
          <InfoLine title="Email:" data={email} />
          <InfoLine
            title="Date of Birth:"
            data={`${dob_month.name} ${dob_day}, ${dob_year}`}
            isAlt={true}
          />
          <InfoLine
            title="Vendor Account?"
            data={vendor_account}
            isAlt={true}
          />
        </Grid>
        <Grid item xs={12} textAlign="center" mt={5}>
          <Button variant="contained" type="submit">
            Create Account
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}
