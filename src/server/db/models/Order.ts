import mongoose, { Schema } from 'mongoose'
import { UserModel } from './User'

export type OrderType = {
  user_id: string
  date: number
  item_ids: string[]
  total_cost: number
  createdAt: Date | number
  updatedAt: Date | number
}

const OrderSchema = new Schema<OrderType>({
  user_id: {
    type: String,
    required: true,
  },
  date: {
    type: Number,
    required: true,
  },
  item_ids: [
    {
      type: String,
      required: true,
    },
  ],
  total_cost: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date || Number,
    immutable: true,
    default: () => Date.now(),
  },
  updatedAt: {
    type: Date || Number,
    default: () => Date.now(),
  },
})

OrderSchema.pre('save', async function (next) {
  if (this.isNew) {
    const user = await UserModel.findById(this.user_id)
    const order_id = this._id
    user?.past_orders.push(order_id)
    await user?.save()
  }
  this.updatedAt = Date.now()
  next()
})

export const OrderModel = mongoose.model<OrderType>('orders', OrderSchema)
