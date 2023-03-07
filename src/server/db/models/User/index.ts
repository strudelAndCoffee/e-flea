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
  owned_vendors: {
    type: [String],
  },
  favorite_vendors: {
    type: [String],
  },
})

export const UserModel = mongoose.model('users', UserSchema)
