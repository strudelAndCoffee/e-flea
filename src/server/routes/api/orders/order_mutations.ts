import express from 'express'
import { Schema } from 'mongoose'
import { OrderModel } from '../../../db/models'

const router = express.Router()

type OrderDataType = {
  user_id: Schema.Types.ObjectId
  date: number
  item_ids: Schema.Types.ObjectId[]
  total_cost: number
}

// Create new order
router.post('/', async (req, res) => {
  try {
    const order_data = req.body
    const new_order = await new OrderModel(order_data as OrderDataType)
    res.json({ new_order })
  } catch (err) {
    console.error(err)
    res.json(err)
  }
})

export default router
