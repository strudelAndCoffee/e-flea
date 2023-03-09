import mongoose, { Schema } from 'mongoose'

export interface UserType {
  _id: Schema.Types.ObjectId
  username: string
  email: string
  password: string
  owned_vendor_ids?: Schema.Types.ObjectId[]
  favorite_vendor_ids?: Schema.Types.ObjectId[]
  saved_item_ids?: Schema.Types.ObjectId[]
  purchased_item_ids?: Schema.Types.ObjectId[]
}

const UserSchema = new Schema<UserType>({
  username: {
    type: String,
    minlength: 3,
    maxlength: 64,
    required: [true, 'Please provide a unique username.'],
    unique: true,
  },
  email: {
    type: String,
    minlength: 3,
    required: [true, 'Please provide an email address.'],
  },
  password: {
    type: String,
    minlength: 5,
    maxlength: 64,
    required: [true, 'Please provide a password.'],
  },
  owned_vendor_ids: [
    {
      type: Schema.Types.ObjectId,
      ref: 'vendors',
    },
  ],
  favorite_vendor_ids: [
    {
      type: Schema.Types.ObjectId,
      ref: 'vendors',
    },
  ],
  saved_item_ids: [
    {
      type: Schema.Types.ObjectId,
      ref: 'products',
    },
  ],
  purchased_item_ids: [
    {
      type: Schema.Types.ObjectId,
      ref: 'products',
    },
  ],
})

export const UserModel = mongoose.model<UserType>('users', UserSchema)
