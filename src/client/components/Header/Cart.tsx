import { useState } from 'react'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import CartIcon from '@mui/icons-material/ShoppingCart'
import Badge from '@mui/material/Badge'

export default function Cart() {
  const [openCart, setOpenCart] = useState(false)

  return (
    <Box flexGrow={1} display="flex" justifyContent="flex-end">
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="open cart"
      >
        <Badge
          badgeContent={4}
          color="error"
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
        >
          <CartIcon sx={{ fontSize: 35 }} />
        </Badge>
      </IconButton>
    </Box>
  )
}
