import mongoose, { Schema, Types } from 'mongoose'
import { UserModel } from './'

type ImageSchemaType = {
  store_image_url: string | undefined
  store_image_upload?: any
  store_image_alt: string | undefined
}
export interface VendorType {
  _id: string | Schema.Types.ObjectId
  owner_id: String
  store_title: string
  store_description: string
  categories: string[]
  product_ids: Types.ObjectId[]
  image: ImageSchemaType
  createdAt: Date | number
  updatedAt: Date | number
}

const ImageSchema = new Schema<ImageSchemaType>({
  store_image_url: {
    type: String,
    default: 'https://random.dog/068fc183-d4e3-4780-b01c-6cce0d019d13.jpg',
    required: true,
  },
  store_image_upload: {
    type: Schema.Types.Mixed,
    default: null,
  },
  store_image_alt: {
    type: String,
    minlength: 3,
    maxlength: 128,
    default: 'Placeholder store image',
    required: true,
  },
})

const VendorSchema = new Schema<VendorType>({
  owner_id: {
    type: String,
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
      required: true,
      default: [],
    },
  ],
  image: {
    type: ImageSchema,
    required: true,
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
    const owner = await UserModel.findById(this.owner_id)
    const vendor_id = this._id
    owner?.owned_vendor_ids.push(vendor_id as Schema.Types.ObjectId)
    await owner?.save()
  }
  this.updatedAt = Date.now()
  next()
})

export const VendorModel = mongoose.model<VendorType>('vendors', VendorSchema)
