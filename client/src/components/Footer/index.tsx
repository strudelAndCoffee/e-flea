import AppBar from '@mui/material/AppBar'
import GitHub from '@mui/icons-material/GitHub'

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
      <a
        href="https://github.com/strudelAndCoffee"
        target="_blank"
        className="footer-link"
      >
        <GitHub fontSize="small" sx={{ marginRight: 0.5 }} /> strudelAndCoffee
      </a>
    </AppBar>
  )
}
