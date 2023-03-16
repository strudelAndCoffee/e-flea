import Paper from '@mui/material/Paper'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'

import CartItem from './CartItem'
import { useCartStore } from '../../../state'

const TAX_RATE = 0.07

function ccyFormat(num: number) {
  return `${num.toFixed(2)}`
}

function priceRow(qty: number, unit: number) {
  return qty * unit
}

function createRow(desc: string, qty: number, unit: number) {
  const price = priceRow(qty, unit)
  return { desc, qty, unit, price }
}

interface Row {
  desc: string
  qty: number
  unit: number
  price: number
}

function subtotal(items: readonly Row[]) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0)
}

const rows = [
  createRow('Paperclips (Box)', 100, 1.15),
  createRow('Paper (Case)', 10, 45.99),
  createRow('Waste Basket', 2, 17.99),
]

const invoiceSubtotal = subtotal(rows)
const invoiceTaxes = TAX_RATE * invoiceSubtotal
const invoiceTotal = invoiceTaxes + invoiceSubtotal

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
          {cartStore.items.map((item) => (
            <TableRow key={item.id}>
              <CartItem item={item} />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
