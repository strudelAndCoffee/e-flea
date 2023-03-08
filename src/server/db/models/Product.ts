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
  rating: {
    total: {
      type: Schema.Types.Decimal128,
      min: 0,
      max: 5,
      default: 0,
    },
    rating_scores: {
      type: [Number],
      min: 1,
      max: 5,
      default: [],
    },
  },
  reviews: {
    type: Number,
    min: 0,
    default: 0,
  },
  price: {
    type: Schema.Types.Decimal128,
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
    type: [String],
    lowercase: true,
    default: [],
  },
  image: {
    url: {
      type: String,
      default: 'https://random.dog/068fc183-d4e3-4780-b01c-6cce0d019d13.jpg',
    },
    upload: {
      type: Schema.Types.Mixed,
      default: null,
    },
    alt: {
      type: String,
      default: 'Placeholder product image',
    },
  },
  vendor_id: {
    type: Schema.Types.ObjectId,
    ref: 'vendors',
    required: true,
  },
})

export const ProductModel = mongoose.model('products', ProductSchema)
