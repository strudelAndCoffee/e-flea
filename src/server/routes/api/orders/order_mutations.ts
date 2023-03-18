import express from 'express'
import { OrderModel } from '../../../db/models'

const router = express.Router()

type OrderDataType = {
  user_id: string
  date: number
  item_ids: string[]
  total_cost: number
}

// Create new order
router.post('/', async (req, res) => {
  try {
    const order_data: OrderDataType = req.body
    const new_order = await new OrderModel(order_data)
    res.json({ new_order })
  } catch (err) {
    console.error(err)
    res.json(err)
  }
})

export default router
