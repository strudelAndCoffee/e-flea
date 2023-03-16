import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'

import DropdownMenu from './DropdownMenu.jsx'
import SiteTitle from './SiteTitle.jsx'
import SearchBar from './SearchBar.jsx'
import Cart from './Cart'

export default function Header() {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <DropdownMenu />
        <SiteTitle />
        <SearchBar />
        <Cart />
      </Toolbar>
    </AppBar>
  )
}
