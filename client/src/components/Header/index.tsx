import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'

import Menu from './Menu.jsx'
import SiteTitle from './SiteTitle.jsx'
import Search from './Search.jsx'
import Cart from './Cart.jsx'

import '../../css/header.css'

export default function Header() {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Menu />
        <SiteTitle />
        <Search />
        <Cart />
      </Toolbar>
    </AppBar>
  )
}
