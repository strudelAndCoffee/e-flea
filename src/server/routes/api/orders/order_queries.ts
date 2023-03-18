import express from 'express'
import { OrderModel } from '../../../db/models'

const router = express.Router()

// Get order by ID
router.get('/:id', async (req, res) => {
  try {
    const order = await OrderModel.findById(req.params.id)
    if (!order) res.json({ message: 'No order found with that ID.' })
    res.json({ order })
  } catch (err) {
    console.error(err)
    res.json(err)
  }
})

export default router
