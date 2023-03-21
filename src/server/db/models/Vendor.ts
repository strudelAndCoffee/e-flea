import mongoose, { Schema, Types } from 'mongoose'
import { UserModel } from './'

export type VendorType = {
  owner_id: string | Types.ObjectId
  store_title: string
  store_description: string
  categories: string[]
  product_ids: Types.ObjectId[]
  image: {
    store_image_url: string | undefined | null
    store_image_upload?: any
    store_image_alt: string | undefined | null
  }
  createdAt: Date | number
  updatedAt: Date | number
}

const VendorSchema = new Schema<VendorType>({
  owner_id: {
    type: String || Types.ObjectId,
    required: [true, 'Please provide the owner ID.'],
  },
  store_title: {
    type: String,
    minlength: 3,
    maxlength: 128,
    required: [true, 'Your store needs a name to be found!'],
    unique: true,
  },
  store_description: {
    type: String,
    minLength: 3,
    maxLength: 256,
    required: [true, 'Describe what your store has to offer.'],
  },
  categories: [
    {
      type: String,
      required: true,
    },
  ],
  product_ids: [
    {
      type: Types.ObjectId,
      ref: 'products',
      default: [],
    },
  ],
  image: {
    store_image_url: {
      type: String || undefined || null,
      default: 'https://random.dog/068fc183-d4e3-4780-b01c-6cce0d019d13.jpg',
    },
    store_image_upload: {
      type: Schema.Types.Mixed,
      default: null,
    },
    store_image_alt: {
      type: String || undefined || null,
      maxlength: 128,
      default: 'Placeholder store image',
    },
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
})

VendorSchema.pre('save', async function (next) {
  if (this.isNew) {
    const owner = await UserModel.findOne({ _id: this.owner_id })
    const vendor_id = this._id
    owner?.owned_vendor_ids.push(vendor_id)
    await owner?.save()
  }
  this.updatedAt = Date.now()
  next()
})

export const VendorModel = mongoose.model<VendorType>('vendors', VendorSchema)
