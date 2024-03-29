// Starter code for Menu component example template copied from Material UI docs page: https://mui.com/material-ui/react-menu/

import React, { useState } from 'react'
import axios from 'axios'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MenuIcon from '@mui/icons-material/Menu'
import { Link, useNavigate } from 'react-router-dom'

import { shallow } from 'zustand/shallow'
import { useAuthStore } from '../../state'
import Button from '@mui/material/Button'

export default function DropdownMenu() {
  const { isLoggedIn, userID, setIsLoggedIn, setUserID } = useAuthStore(
    (state) => ({
      isLoggedIn: state.isLoggedIn,
      setIsLoggedIn: state.setIsLoggedIn,
      userID: state.userID,
      setUserID: state.setUserID,
    }),
    shallow
  )

  const navigate = useNavigate()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleLogout = async () => {
    const response = await axios.post(
      'http://localhost:3000/auth/users/logout',
      {},
      { withCredentials: true }
    )

    handleClose()
    setUserID(null)
    setIsLoggedIn(false)
    navigate('/')
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
        {!isLoggedIn && (
          <MenuItem onClick={handleClose}>
            <Link to={'/login'}>Log In</Link>
          </MenuItem>
        )}
        {!isLoggedIn && (
          <MenuItem onClick={handleClose}>
            <Link to={'/signup'}>Sign Up</Link>
          </MenuItem>
        )}
        {isLoggedIn && (
          <MenuItem>
            <Link to={'/account'}>Account</Link>
          </MenuItem>
        )}
        {isLoggedIn && <MenuItem onClick={handleLogout}>Log Out</MenuItem>}
      </Menu>
    </>
  )
}
