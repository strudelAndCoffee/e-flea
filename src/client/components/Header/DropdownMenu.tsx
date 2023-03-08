import React, { useState } from 'react'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MenuIcon from '@mui/icons-material/Menu'
import { Link } from 'react-router-dom'

export default function DropdownMenu() {
  // default starter code for menu state copied from Material UI docs page: https://mui.com/material-ui/react-menu/
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="open menu"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        sx={{ mr: 2 }}
        onClick={handleClick}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>
          <Link to={'/'}>Home</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to={'/login'}>Login</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to={'/signup'}>Signup</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to={'/'}>Logout</Link>
        </MenuItem>
      </Menu>
    </>
  )
}
