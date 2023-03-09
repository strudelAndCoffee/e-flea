import mongoose, { Schema } from 'mongoose'

const TagSchema = new Schema({
  name: {
    type: String,
    lowercase: true,
    required: true,
  },
  tagged_product_ids: [
    {
      type: Schema.Types.ObjectId,
      ref: 'products',
    },
  ],
  tagged_vendor_ids: [
    {
      type: Schema.Types.ObjectId,
      ref: 'vendors',
    },
  ],
})

export type TagType = {
  _id: Schema.Types.ObjectId
  name: string
  tagged_product_ids?: Schema.Types.ObjectId[]
  tagged_vendor_ids?: Schema.Types.ObjectId[]
}
export const TagModel = mongoose.model('tags', TagSchema)
