// Starter template code for Drawer component copied from Material UI: https://mui.com/material-ui/react-drawer/#permanent-drawer

import { KeyboardEvent, MouseEvent } from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

import { useCartStore, useAuthStore, useNavStore } from '../../../state'
import CartTable from './CartTable'
import CartSummary from './CartSummary'
import { Link } from 'react-router-dom'

export default function CartMenu() {
  const setFromRedirect = useNavStore((state) => state.setFromRedirect)
  const cartStore = useCartStore()
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)
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
        {!cartStore.items.length ? (
          <>
            <Typography align="center" py={3}>
              No items in cart...
            </Typography>
            <Divider />
          </>
        ) : (
          <>
            <CartSummary />
            {!isLoggedIn && (
              <>
                <Typography variant="body2" sx={{ paddingLeft: 2 }}>
                  You must be logged in to checkout.
                </Typography>
                <Typography variant="body2" sx={{ paddingLeft: 2 }}>
                  <Link
                    to={'/login'}
                    onClick={() => {
                      setFromRedirect(true)
                      cartStore.closeCart()
                    }}
                  >
                    Login
                  </Link>
                  {' / '}
                  <Link
                    to={'/signup'}
                    onClick={() => {
                      setFromRedirect(true)
                      cartStore.closeCart()
                    }}
                  >
                    Sign up
                  </Link>
                </Typography>
              </>
            )}
          </>
        )}
      </Box>
    </Drawer>
  )
}
