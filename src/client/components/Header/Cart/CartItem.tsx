import Box from '@mui/material/Box'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import ClearIcon from '@mui/icons-material/Clear'

import formatCurrency from '../../../utils/formatCurrency'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import useCartStore from '../../../state/config/cartStore'

interface CartItemProps {
  item: {
    id: string
    quantity: number
    name: string
    price: number
    img_url: string
  }
}

export default function CartItem({ item }: CartItemProps) {
  const removeItemFromCart = useCartStore((state) => state.removeItemFromCart)
  const calcPrice = () => {
    const total = formatCurrency(item.quantity * item.price)
    return total
  }
  return (
    <>
      <TableCell sx={{ paddingLeft: 3 }}>
        <Typography variant="h6">{item.quantity}</Typography>
      </TableCell>
      <TableCell>
        <Box display="flex" alignItems="center" gap={1}>
          <Avatar
            alt={item.name}
            src={item.img_url}
            variant="rounded"
            sx={{ width: 33, height: 33 }}
          />
          <Typography variant="h6" noWrap={true}>
            {item.name}
          </Typography>
        </Box>
      </TableCell>
      <TableCell align="right">
        <Box display="flex" flexDirection="column" alignItems="flex-end">
          <Typography>{calcPrice()}</Typography>
          <Typography variant="caption">{item.price}/ea.</Typography>
        </Box>
      </TableCell>
      <TableCell align="right">
        <IconButton
          aria-label="remove item"
          sx={{ padding: 0 }}
          onClick={() => removeItemFromCart(item.id)}
        >
          <ClearIcon />
        </IconButton>
      </TableCell>
    </>
  )
}
