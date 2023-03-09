import mongoose, { Schema } from 'mongoose'

export interface VendorType {
  shop_title: string
  owner_id: Schema.Types.ObjectId
  product_ids?: Schema.Types.ObjectId[]
}

const VendorShema = new Schema<VendorType>({
  shop_title: {
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

export const VendorModel = mongoose.model<VendorType>('vendors', VendorShema)
