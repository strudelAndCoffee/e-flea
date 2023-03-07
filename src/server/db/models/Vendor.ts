import mongoose from 'mongoose'
import { UserModel } from './User.js'

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
})

export const VendorModel = mongoose.model('vendors', VendorShema)
