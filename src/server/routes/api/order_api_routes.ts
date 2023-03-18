import express from 'express'
import { OrderModel } from '../../db/models'

const router = express.Router()

router.post('/', async (req, res) => {
  const new_order = await new OrderModel(req.body)
  res.json({ new_order })
})

export default router
