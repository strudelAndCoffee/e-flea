import mongoose, { Schema } from 'mongoose'

const VendorShema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  owner_id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  product_ids: [
    {
      type: Schema.Types.ObjectId,
      ref: 'products',
    },
  ],
})

export type VendorType = {
  _id: Schema.Types.ObjectId
  name: string
  owner_id: Schema.Types.ObjectId
  product_ids?: Schema.Types.ObjectId[]
}
export const VendorModel = mongoose.model('vendors', VendorShema)
