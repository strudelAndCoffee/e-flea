import mongoose, { Schema } from 'mongoose'

export type OrderType = {
  user_id: string
  date: number
  item_ids: string[]
  total_cost: number
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
})

export const OrderModel = mongoose.model<OrderType>('orders', OrderSchema)
