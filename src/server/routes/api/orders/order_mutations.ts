import express from 'express'
import { OrderModel } from '../../../db/models'
import { OrderType } from '../../../db/models/Order'
import { withAuth } from '../../../utils/auth'

const router = express.Router()

// Create new order
router.post('/', withAuth, async (req, res) => {
  const order_data: OrderType = req.body
  const new_order = await new OrderModel(order_data)

  try {
    const response = await new_order.save()
    res.json(response)
  } catch (err) {
    console.error(err)
    res.json(err)
  }
})

export default router
