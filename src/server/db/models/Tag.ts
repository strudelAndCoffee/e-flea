import mongoose, { Schema } from 'mongoose'

const TagSchema = new Schema({
  name: {
    type: String,
    lowercase: true,
    required: true,
  },
  tagged_product_ids: {
    type: [Schema.Types.ObjectId],
    ref: 'products',
    default: [],
  },
  tagged_vendor_ids: {
    type: [Schema.Types.ObjectId],
    ref: 'vendors',
    default: [],
  },
})

export const TagModel = mongoose.model('tags', TagSchema)
