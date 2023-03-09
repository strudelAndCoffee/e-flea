import mongoose, { Schema } from 'mongoose'

export interface ProductType {
  name: string
  description: string
  rating_total?: number
  rating_scores?: number[]
  reviews?: number
  price: number
  categories: string[] | []
  tags?: Schema.Types.ObjectId[]
  image_url: string
  image_upload?: any
  image_alt: string
  vendor_id: Schema.Types.ObjectId
}

const ProductSchema = new Schema<ProductType>({
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
  },
  rating_scores: {
    type: [Number],
    min: 1,
    max: 5,
    default: [],
  },
  reviews: {
    type: Number,
    min: 0,
    default: 0,
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
  tags: [
    {
      type: Schema.Types.ObjectId,
      ref: 'tags',
    },
  ],
  image_url: {
    type: String,
    default: 'https://random.dog/068fc183-d4e3-4780-b01c-6cce0d019d13.jpg',
    required: true,
  },
  image_upload: {
    type: Schema.Types.Mixed,
    default: null,
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

export const ProductModel = mongoose.model<ProductType>(
  'products',
  ProductSchema
)
