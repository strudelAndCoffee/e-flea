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
          <Box width="100%" display="flex" alignItems="center" gap={3}>
            <Typography
              variant="body1"
              sx={{ flex: '1 0 30%', textAlign: 'right' }}
            >
              Username:
            </Typography>
            <Typography variant="h5" sx={{ flex: '2 0 70%' }}>
              {username}
            </Typography>
          </Box>
          <Box width="100%" display="flex" alignItems="center" gap={3}>
            <Typography
              variant="body1"
              sx={{ flex: '1 0 30%', textAlign: 'right' }}
            >
              Email:
            </Typography>
            <Typography variant="h5" sx={{ flex: '2 0 70%' }}>
              {email}
            </Typography>
          </Box>
          <Box width="100%" display="flex" alignItems="center" gap={3}>
            <Typography
              variant="body1"
              sx={{ flex: '1 0 30%', textAlign: 'right' }}
            >
              Full Name:
            </Typography>
            <Typography variant="h5" sx={{ flex: '2 0 70%' }}>
              {first_name} {last_name}
            </Typography>
          </Box>
          <Box width="100%" display="flex" alignItems="center" gap={3}>
            <Typography
              variant="body1"
              sx={{ flex: '1 0 30%', textAlign: 'right' }}
            >
              Date of Birth:
            </Typography>
            <Typography variant="subtitle2" sx={{ flex: '2 0 70%' }}>
              {dob_month.name} {dob_day}, {dob_year}
            </Typography>
          </Box>
          <Box width="100%" display="flex" alignItems="center" gap={3}>
            <Typography
              variant="body1"
              sx={{ flex: '1 0 30%', textAlign: 'right' }}
            >
              Vendor Account?
            </Typography>
            <Typography variant="subtitle2" sx={{ flex: '2 0 70%' }}>
              {vendor_account ? (
                <CheckIcon fontSize="medium" color="success" />
              ) : (
                'No'
              )}
            </Typography>
          </Box>
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
