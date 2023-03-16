// Starter template code for Drawer component copid from Material UI: https://mui.com/material-ui/react-drawer/#permanent-drawer

import { KeyboardEvent, MouseEvent } from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

import { useCartStore } from '../../../state'
import CartTable from './CartTable'
import CartSummary from './CartSummary'

export default function CartMenu() {
  const cartStore = useCartStore()
  const anchor = 'right'

  const toggleDrawer = (event: KeyboardEvent | MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as KeyboardEvent).key === 'Tab' ||
        (event as KeyboardEvent).key === 'Shift')
    ) {
      return
    }

    if (cartStore.isOpen) cartStore.closeCart()
  }

  return (
    <Drawer
      anchor={anchor}
      open={cartStore.isOpen}
      onClose={toggleDrawer}
      // hideBackdrop={true}
    >
      <Box
        sx={{ width: 500, maxWidth: 500 }}
        role="presentation"
        onKeyDown={toggleDrawer}
      >
        <Box display="flex" alignItems="center" padding={1}>
          <Typography variant="h6" align="center" sx={{ flexGrow: 2 }}>
            Shopping Cart
          </Typography>
          <IconButton
            size="large"
            color="inherit"
            aria-label="close cart"
            sx={{ marginRight: 1 }}
            onClick={() => cartStore.closeCart()}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>
        <Divider />
        <CartTable />
        <CartSummary />
      </Box>
    </Drawer>
  )
}
