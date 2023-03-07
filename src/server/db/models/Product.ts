import mongoose, { Model } from 'mongoose'

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
})

export const ProductModel: typeof Model = mongoose.model(
  'products',
  ProductSchema
)
