import { NextFunction, Request, Response } from 'express'
import { Types } from 'mongoose'
import OrderModel from '../models/Order'

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  const { user_id, items, total_cost } = req.body

  const order = await new OrderModel({
    _id: new Types.ObjectId(),
    user_id,
    items,
    total_cost,
  })

  try {
    const result = await order.save()
    return res.status(201).json({ order })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error })
  }
}

const readOrder = async (req: Request, res: Response, next: NextFunction) => {
  const order_id = req.params.order_id

  try {
    const order = await OrderModel.findById(order_id)
    return order
      ? res.status(200).json({ order })
      : res.status(404).json({ message: 'Order not found.' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error })
  }
}

const readAllOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orders = await OrderModel.find()
    return orders
      ? res.status(200).json({ orders })
      : res.status(404).json({ message: 'No orders found.' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error })
  }
}

export { createOrder, readOrder, readAllOrders }
