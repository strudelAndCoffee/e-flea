import axios from 'axios'
import { useAuthStore, useCartStore } from '../../state'

export default function CheckoutComplete() {
  const userID = useAuthStore((state) => state.userID)
  const items = useCartStore((state) => state.items)
  const getCartTotalPrice = useCartStore((state) => state.getCartTotalPrice)

  const date = Date.now()
  const item_ids = items.map((item) => item.id)
  const total_cost = getCartTotalPrice()
  const order = {
    user_id: userID,
    date,
    item_ids,
    total_cost,
  }

  axios
    .post('http://localhost:3000/api/orders', order, {
      withCredentials: true,
    })
    .then((res) => {
      console.log(res)
    })

  return <div>Checkout Complete!</div>
}
