import mongoose, { Schema } from 'mongoose'
import { UserModel } from './User'

export type OrderType = {
  user_id: string | Schema.Types.ObjectId
  item_ids: string[] | Schema.Types.ObjectId[]
  total_cost: number
  createdAt: Date | number
}

const OrderSchema = new Schema<OrderType>({
  user_id: {
    type: String || Schema.Types.ObjectId,
    immutable: true,
    required: true,
  },
  item_ids: [
    {
      type: String || Schema.Types.ObjectId,
      immutable: true,
      required: true,
    },
  ],
  total_cost: {
    type: Number,
    immutable: true,
    required: true,
  },
  createdAt: {
    type: Date || Number,
    immutable: true,
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
  next()
})

export const OrderModel = mongoose.model<OrderType>('orders', OrderSchema)
