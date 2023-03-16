import formatCurrency from './formatCurrency'

export default function calcPrice(price: number, quantity: number) {
  const total = formatCurrency(quantity * price)
  return total
}
