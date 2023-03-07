import mongoose, { Model } from 'mongoose'
import { VendorModel } from './index.js'

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  owned_vendors: {
    type: [VendorModel],
  },
  favorite_vendors: {
    type: [VendorModel],
  },
})

export const UserModel: typeof Model = mongoose.model('users', UserSchema)
