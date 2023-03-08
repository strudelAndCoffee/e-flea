import mongoose from 'mongoose'

const VendorShema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  owner_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  product_ids: [
    {
      type: mongoose.Schema.Types.ObjectId,
      default: [],
    },
  ],
})

export const VendorModel = mongoose.model('vendors', VendorShema)
