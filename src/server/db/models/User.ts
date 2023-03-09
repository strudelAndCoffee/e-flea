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
