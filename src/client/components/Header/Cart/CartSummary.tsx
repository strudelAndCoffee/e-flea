import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'

import formatCurrency from '../../../utils/formatCurrency'
import { useCartStore } from '../../../state'

const TAX_RATE = 0.085

export default function CartSummary() {
  const getCartTotalPrice = useCartStore((state) => state.getCartTotalPrice)
  return (
    <>
      {/* <TableRow>
        <TableCell rowSpan={3} />
        <TableCell colSpan={2}>Subtotal</TableCell>
        <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Tax</TableCell>
        <TableCell align="right">{`${(TAX_RATE * 100).toFixed(
          0
        )} %`}</TableCell>
        <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
      </TableRow> */}
      <TableRow>
        <TableCell colSpan={2}>
          <Typography variant="h6">Total</Typography>
        </TableCell>
        <TableCell align="right">
          <Typography variant="h5">
            {formatCurrency(getCartTotalPrice())}
          </Typography>
        </TableCell>
      </TableRow>
    </>
  )
}
