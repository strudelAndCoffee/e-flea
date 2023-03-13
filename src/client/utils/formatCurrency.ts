// The following code was copied from a Web Dev Simplified tutorial on YouTube: https://www.youtube.com/watch?v=lATafp15HWA&list=PLZlA0Gpn_vH_z2fqIg50_POJrUkJgBu7g&index=3

const CurrencyFormatter = new Intl.NumberFormat(undefined, {
  currency: 'USD',
  style: 'currency',
})

export default function formatCurrency(number: number) {
  return CurrencyFormatter.format(number)
}
