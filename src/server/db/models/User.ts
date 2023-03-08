import mongoose from 'mongoose'

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
  owned_vendor_ids: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'vendors',
      default: [],
    },
  ],
  favorite_vendor_ids: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'vendors',
      default: [],
    },
  ],
  purchased_item_ids: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'products',
      default: [],
    },
  ],
})

export const UserModel = mongoose.model('users', UserSchema)
