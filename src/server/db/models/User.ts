import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcrypt'

type DOBType = {
  day: number
  month: number
  year: number
}

export interface UserType {
  _id: Schema.Types.ObjectId
  username: string
  email: string
  password: string
  first_name: string
  last_name: string
  dob: DOBType
  vendor_account: boolean
  owned_vendor_ids?: Schema.Types.ObjectId[]
  favorite_vendor_ids?: Schema.Types.ObjectId[]
  saved_item_ids?: Schema.Types.ObjectId[]
  purchased_item_ids?: Schema.Types.ObjectId[]
  isCorrectPw(pw: string): Promise<boolean>
}

const DOBSchema = new Schema<DOBType>({
  day: {
    type: Number,
    min: 1,
    max: 31,
    required: true,
  },
  month: {
    type: Number,
    min: 1,
    max: 12,
    required: true,
  },
  year: {
    type: Number,
    min: 1900,
    required: true,
  },
})

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
  dob: DOBSchema,
  vendor_account: {
    type: Boolean,
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

UserSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10
    this.password = await bcrypt.hash(this.password, saltRounds)
  }
  next()
})

UserSchema.methods.isCorrectPw = async function (pw: string) {
  return await bcrypt.compare(pw, this.password)
}

export const UserModel = mongoose.model<UserType>('users', UserSchema)
