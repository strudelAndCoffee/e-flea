import Paper from '@mui/material/Paper'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'

import CartItem from './CartItem'
import { useCartStore } from '../../../state'
import calcTotalPrice from '../../../utils/calcTotalPrice.js'
import { Typography } from '@mui/material'

export default function CartTable() {
  const cartStore = useCartStore()

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 'auto' }} aria-label="cart items table">
        <TableHead>
          <TableRow>
            <TableCell size="small">Qty.</TableCell>
            <TableCell size="small">Name</TableCell>
            <TableCell align="center" size="small" sx={{ paddingLeft: 5 }}>
              Price
            </TableCell>
            <TableCell align="right" size="small">
              Edit
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cartStore.items.length > 0 &&
            cartStore.items.map((item) => (
              <TableRow key={item.id}>
                <CartItem
                  item={item}
                  total_price={calcTotalPrice(item.price, item.quantity)}
                />
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
