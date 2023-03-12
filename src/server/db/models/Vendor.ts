import mongoose, { Schema } from 'mongoose'

type ImageSchemaType = {
  store_image_url: string | undefined
  store_image_upload?: any
  store_image_alt: string | undefined
}
export interface VendorType {
  _id: Schema.Types.ObjectId
  owner_id: String
  store_title: string
  store_description: string
  categories: string[]
  product_ids?: Schema.Types.ObjectId[]
  image: ImageSchemaType
}

const ImageSchema = new Schema<ImageSchemaType>({
  store_image_url: {
    type: String,
    default: 'https://random.dog/068fc183-d4e3-4780-b01c-6cce0d019d13.jpg',
    // required: [
    //   true,
    //   'A placeholder image will be used if no image is provided.',
    // ],
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
    // required: [
    //   true,
    //   'Default alt text will be used if no alt text is provided.',
    // ],
  },
})

const VendorShema = new Schema<VendorType>({
  owner_id: {
    type: Schema.Types.ObjectId,
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
  categories: {
    type: [String],
    required: true,
  },
  product_ids: [
    {
      type: Schema.Types.ObjectId,
      ref: 'products',
    },
  ],
  image: {
    type: ImageSchema,
    required: true,
  },
})

export const VendorModel = mongoose.model<VendorType>('vendors', VendorShema)
