import { useQuery } from '@tanstack/react-query'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

import formatCurrency from '../../../utils/formatCurrency'
import { useAuthStore, useCartStore } from '../../../state'
import { getCheckoutUrl } from '../../../api'
import { useState } from 'react'

export default function CartSummary() {
  const cartStore = useCartStore()
  // const userID = useAuthStore((state) => state.userID)
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)
  const total_price = formatCurrency(cartStore.getCartTotalPrice())
  const [isLoading, setIsLoading] = useState(false)

  const checkoutHandler = async () => {
    setIsLoading(true)

    const items = cartStore.items.map((item) => ({
      id: item.id,
      quantity: item.quantity,
    }))

    const data = await getCheckoutUrl(items)
    if (data) {
      setIsLoading(false)
      cartStore.closeCart()
      window.location = data.url
    }
  }

  return (
    // <Box display="flex" flexDirection="column" alignItems="center">
    //
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="flex-start"
      paddingY={1}
      paddingX={2}
    >
      <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
        <Typography variant="h6" align="right">
          Total {total_price}
        </Typography>
        <Button
          fullWidth
          variant="contained"
          color="success"
          aria-label="Proceed to checkout"
          disabled={!isLoggedIn || isLoading}
          onClick={checkoutHandler}
        >
          {isLoading ? '...' : 'Checkout'}
        </Button>
      </Box>
      <Button
        aria-label="Remove all items from cart"
        size="small"
        onClick={() => cartStore.deleteAllItems()}
      >
        Clear Entire Cart
      </Button>
    </Box>
  )
}
