import mongoose from 'mongoose'

const VendorShema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  owner: {
    type: String,
    required: true,
  },
  products: {
    type: [String],
  },
})

export const VendorModel = mongoose.model('vendors', VendorShema)
