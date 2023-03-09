import mongoose, { Schema } from 'mongoose'

type ImageSchemaType = {
  store_image_url: string
  store_image_upload?: any
  store_image_alt: string
}
export interface VendorType {
  store_title: string
  owner_id: Schema.Types.ObjectId
  product_ids?: Schema.Types.ObjectId[]
  image: ImageSchemaType
}

const ImageSchema = new Schema<ImageSchemaType>({
  store_image_url: {
    type: String,
    default: 'https://random.dog/068fc183-d4e3-4780-b01c-6cce0d019d13.jpg',
    required: [
      true,
      'A placeholder image will be used if no image is provided.',
    ],
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
    required: [
      true,
      'Default alt text will be used if no alt text is provided.',
    ],
  },
})

const VendorShema = new Schema<VendorType>({
  store_title: {
    type: String,
    minlength: 3,
    maxlength: 128,
    required: [true, 'Your store needs a name to be found!'],
    unique: true,
  },
  owner_id: {
    type: Schema.Types.ObjectId,
    required: [true, 'Please provide the owner ID.'],
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
