import { useEffect } from 'react'
import { useCartStore } from '../../state'

export default function CheckoutComplete() {
  const deleteAllItems = useCartStore((state) => state.deleteAllItems)

  useEffect(() => deleteAllItems(), [])

  return <div>CHECKOUT COMPLETE!</div>
}
