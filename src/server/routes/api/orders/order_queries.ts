import express from 'express'
import { OrderModel } from '../../../db/models'

const router = express.Router()

// Get order by ID
router.get('/:id', async (req, res) => {
  const order_id = req.params.id

  try {
    const order = await OrderModel.findById(order_id)
    res.json(order)
  } catch (err) {
    console.error(err)
    res.json(err)
  }
})

export default router
