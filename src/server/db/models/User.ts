import mongoose, { Document, Schema } from 'mongoose'
import bcrypt from 'bcrypt'

export interface IUser {
  username: string
  email: string
  password: string
  dob: {
    day: number
    month: number
    year: number
  }
  orders: string[]
  isCorrectPw(pw: string): Promise<boolean>
}

export interface IUserModel extends IUser, Document {}

const UserSchema: Schema = new Schema(
  {
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
    dob: {
      day: {
        type: Number,
        required: true,
        immuatble: true,
      },
      month: {
        type: Number,
        required: true,
        immuatble: true,
      },
      year: {
        type: Number,
        required: true,
        immuatble: true,
      },
    },
    order: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Order',
        default: [],
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
    password: false,
  }
)

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

export default mongoose.model<IUserModel>('User', UserSchema)
