import mongoose, { Schema, Types } from 'mongoose'
import { VendorModel } from '.'

export type ImageSchemaType = {
  image_url: string
  image_upload?: any
  image_alt: string
}
export type ProductType = {
  _id: Types.ObjectId
  name: string
  vendor_id: string | Types.ObjectId
  description: string
  price: number
  categories: string[]
  rating: {
    rating_total: number
    rating_scores?: number[] | []
    reviews: number
  }
  image: ImageSchemaType
  createdAt: Date | number
  updatedAt: Date | number
}

const ImageSchema = new Schema<ImageSchemaType>({
  image_url: {
    type: String,
    default: 'https://random.dog/068fc183-d4e3-4780-b01c-6cce0d019d13.jpg',
    required: [
      true,
      'A placeholder image will be used if no image is provided.',
    ],
  },
  image_upload: {
    type: Schema.Types.Mixed,
    default: null,
  },
  image_alt: {
    type: String,
    minlength: 3,
    maxlength: 128,
    default: 'Placeholder product image',
    required: [
      true,
      'Default alt text will be used if no alt text is provided.',
    ],
  },
})

const ProductSchema = new Schema<ProductType>({
  name: {
    type: String,
    minlength: 3,
    maxlength: 256,
    required: [true, 'Your product needs a name.'],
  },
  vendor_id: {
    type: String || Types.ObjectId,
    ref: 'vendors',
    required: [true, 'Please provide the vendor ID.'],
  },
  description: {
    type: String,
    minlength: 3,
    maxlength: 256,
    required: [true, 'Please describe your product.'],
  },
  price: {
    // store in cents, i.e. 1000 = $10, 50 = 50 cents
    type: Number,
    min: 0,
    required: [true, 'You need to get paid!'],
  },
  categories: [
    {
      type: String,
      lowercase: true,
      required: [true, 'Your product needs a category to be found!'],
    },
  ],
  rating: {
    rating_total: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
      required: true,
    },
    rating_scores: [
      {
        type: Number,
        min: 1,
        max: 5,
      },
    ],
    reviews: {
      type: Number,
      min: 0,
      default: 0,
      required: true,
    },
  },
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

ProductSchema.pre('save', async function (next) {
  if (this.isNew) {
    const vendor_id = this.vendor_id
    const product_id = this._id
    const vendor = await VendorModel.findById(vendor_id)
    vendor?.product_ids.push(product_id)
    await vendor?.save()
  }
  this.updatedAt = Date.now()
  next()
})

ProductSchema.statics.findByVendorId = function (
  vendor_id: string | Schema.Types.ObjectId
) {
  return this.where('vendor_id').equals(vendor_id)
}

export const ProductModel = mongoose.model<ProductType>(
  'products',
  ProductSchema
)
