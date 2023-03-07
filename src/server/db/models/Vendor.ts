import mongoose, { Model } from 'mongoose'
import { UserModel, ProductModel } from './index.js'

const VendorShema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  owner: {
    type: UserModel,
    required: true,
  },
  products: {
    type: [ProductModel],
  },
})

export const VendorModel: typeof Model = mongoose.model('vendors', VendorShema)
