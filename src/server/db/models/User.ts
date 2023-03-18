import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcrypt'
import { ProductType } from './Product'

type DOBType = {
  day: number
  month: number
  year: number
}

export interface UserType {
  _id: string
  username: string
  email: string
  password: string
  first_name: string
  last_name: string
  dob: DOBType
  vendor_account: boolean
  owned_vendor_ids?: string[]
  favorite_vendor_ids: string[]
  saved_item_ids: string[]
  past_orders: string[]
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
  first_name: {
    type: String,
    required: [true, 'Please provide your first name.'],
  },
  last_name: {
    type: String,
    required: [true, 'Please provide your last name.'],
  },
  dob: DOBSchema,
  vendor_account: {
    type: Boolean,
    default: false,
  },
  owned_vendor_ids: [
    {
      type: String,
    },
  ],
  favorite_vendor_ids: [
    {
      type: String,
      required: true,
      default: [],
    },
  ],
  saved_item_ids: [
    {
      type: String,
      required: true,
      default: [],
    },
  ],
  past_orders: [
    {
      type: String,
      ref: 'orders',
      required: true,
      default: [],
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
