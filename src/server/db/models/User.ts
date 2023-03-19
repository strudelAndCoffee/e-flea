import mongoose, { Schema, Types } from 'mongoose'
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
  createdAt: Date | number
  updatedAt: Date | number
  owned_vendor_ids: Schema.Types.ObjectId[]
  favorite_vendor_ids: string[]
  saved_item_ids: string[]
  past_orders: Types.ObjectId[]
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
    minlength: 5,
    lowercase: true,
    required: [true, 'Please provide an email address.'],
    unique: true,
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
  createdAt: {
    type: Date || Number,
    immutable: true,
    default: () => Date.now(),
  },
  updatedAt: {
    type: Date || Number,
    default: () => Date.now(),
  },
  owned_vendor_ids: [
    {
      type: Schema.Types.ObjectId,
      required: true,
      default: [],
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
      type: Types.ObjectId,
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
  this.updatedAt = Date.now()
  next()
})

UserSchema.methods.isCorrectPw = async function (pw: string) {
  return await bcrypt.compare(pw, this.password)
}

export const UserModel = mongoose.model<UserType>('users', UserSchema)
