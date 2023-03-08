import AppBar from '@mui/material/AppBar'
// import GitHub from '@mui/icons-material/GitHub'
import Copyright from './Copyright'

export default function Footer() {
  return (
    <AppBar
      position="fixed"
      color="inherit"
      sx={{
        top: 'auto',
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingY: 0.5,
      }}
    >
      <Copyright />
    </AppBar>
  )
}

// <GitHub fontSize="small" sx={{ marginRight: 0.5 }} />
