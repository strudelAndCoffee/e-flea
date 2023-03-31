import mongoose, { Document, Schema } from 'mongoose'
import { UserModel } from './'

export interface IOrder {
  user_id: string
  items: string[]
  total_cost: number
  purchase_date: number
}

export interface IOrderModel extends IOrder, Document {}

const OrderSchema: Schema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    immutable: true,
    required: true,
  },
  items: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      immutable: true,
      required: true,
    },
  ],
  total_cost: {
    type: Number,
    immutable: true,
    required: true,
  },
  purchase_date: {
    type: Number,
    immutable: true,
    default: () => Date.now(),
  },
})

// OrderSchema.pre('save', async function (next) {
//   if (this.isNew) {
//     const user = await UserModel.findById(this.user_id)
//     const order_id = this._id
//     user?.orders.push(order_id as string)
//     await user?.save()
//   }
//   next()
// })

// OrderSchema.statics.findUserOrders = async function (user_id: string) {
//   return await this.where('user_id').equals(user_id)
// }

export default mongoose.model<IOrderModel>('Order', OrderSchema)
