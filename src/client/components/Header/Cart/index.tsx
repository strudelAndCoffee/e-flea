import { useRef } from 'react'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import CartIcon from '@mui/icons-material/ShoppingCart'
import Badge from '@mui/material/Badge'
import Slide from '@mui/material/Slide'
import { useCartStore } from '../../../state'
import CartMenu from './CartMenu'

export default function Cart() {
  const cartStore = useCartStore()
  // const [openCart, setOpenCart] = useState(false)

  const cartContainerRef = useRef(null)

  return (
    <Box
      flexGrow={1}
      display="flex"
      justifyContent="flex-end"
      ref={cartContainerRef}
    >
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="open cart"
        onClick={() => {
          console.log(cartStore.items)
          if (cartStore.isOpen) cartStore.closeCart()
          if (!cartStore.isOpen) cartStore.openCart()
        }}
      >
        <Badge
          badgeContent={cartStore.getCartQuantity() ?? 0}
          color="error"
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
        >
          <CartIcon sx={{ fontSize: 35 }} />
        </Badge>
      </IconButton>
      {cartStore.isOpen && <CartMenu />}
    </Box>
  )
}
