import express from 'express'
import { createOrder, readOrder, readAllOrders } from '../db/controllers/Order'
import userAuth from '../middleware/userAuth'
import { validateSchema, Schemas } from '../middleware/validateSchema'

const router = express.Router()

router.post('/create', validateSchema(Schemas.order.create), createOrder)
router.get('/', readAllOrders)
router.get('/:order_id', userAuth, readOrder)

export default router
