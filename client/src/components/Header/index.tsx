import { Link } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

import Menu from './Menu.jsx'
import Search from './Search.jsx'
import Cart from './Cart.jsx'

import '../../css/header.css'

export default function Header() {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Menu />
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
        <Search />
        <Cart />
      </Toolbar>
    </AppBar>
  )
}
