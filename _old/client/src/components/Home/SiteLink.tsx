import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import StorefrontIcon from '@mui/icons-material/Storefront'
import CartIcon from '@mui/icons-material/ShoppingCart'
import WorkIcon from '@mui/icons-material/Work'

interface SiteLinkProps {
  icon: string
  text: string
}

export default function SiteLink({ icon, text }: SiteLinkProps) {
  let iconEl
  if (icon === 'vendors')
    iconEl = <StorefrontIcon color="primary" fontSize="large" />
  if (icon === 'products')
    iconEl = <CartIcon color="primary" fontSize="large" />
  if (icon === 'create') iconEl = <WorkIcon color="primary" fontSize="large" />

  return (
    <Grid item xs={4}>
      <Link to="/vendors">
        <Paper
          elevation={2}
          sx={{
            height: '30vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {iconEl}
          <Typography
            variant="h5"
            component="h3"
            fontWeight="bold"
            color="primary"
          >
            {text}
          </Typography>
        </Paper>
      </Link>
    </Grid>
  )
}
