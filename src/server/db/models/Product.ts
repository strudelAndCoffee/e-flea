import mongoose, { Schema } from 'mongoose'

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  rating_total: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
    required: true,
  },
  rating_scores: {
    type: [Number],
    min: 1,
    max: 5,
    default: [],
    required: true,
  },
  reviews: {
    type: Number,
    min: 0,
    default: 0,
    required: true,
  },
  price: {
    type: Number,
    min: 0,
    required: true,
  },
  categories: {
    type: [String],
    lowercase: true,
    required: true,
    default: [],
  },
  tags: {
    type: [Schema.Types.ObjectId],
    ref: 'tags',
    required: true,
    default: [],
  },
  image_url: {
    type: String,
    default: 'https://random.dog/068fc183-d4e3-4780-b01c-6cce0d019d13.jpg',
    required: true,
  },
  image_upload: {
    type: Schema.Types.Mixed,
    default: null,
    required: true,
  },
  image_alt: {
    type: String,
    default: 'Placeholder product image',
    required: true,
  },
  vendor_id: {
    type: Schema.Types.ObjectId,
    ref: 'vendors',
    required: true,
  },
})

export const ProductModel = mongoose.model('products', ProductSchema)
