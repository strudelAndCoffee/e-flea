import express from 'express'
import { createOrder, readOrder, readAllOrders } from '../db/controllers/Order'

const router = express.Router()

router.post('/create', createOrder)
router.get('/', readAllOrders)
router.get('/:order_id', readOrder)

export default router
