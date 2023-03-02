import { Link } from 'react-router-dom'
import Typography from '@mui/material/Typography'

export default function SiteTitle() {
  return (
    <Typography
      variant="h4"
      noWrap
      component="h1"
      sx={{
        flexGrow: 1,
        display: { xs: 'none', sm: 'block' },
      }}
    >
      <Link to="/" className="main-title">
        eFlea
      </Link>
    </Typography>
  )
}
