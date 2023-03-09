import mongoose, { Schema } from 'mongoose'

export interface TagType {
  name: string
  tagged_product_ids?: Schema.Types.ObjectId[]
  tagged_vendor_ids?: Schema.Types.ObjectId[]
}

const TagSchema = new Schema<TagType>({
  name: {
    type: String,
    lowercase: true,
    required: true,
  },
  tagged_product_ids: [
    {
      type: Schema.Types.ObjectId,
      ref: 'products',
    },
  ],
  tagged_vendor_ids: [
    {
      type: Schema.Types.ObjectId,
      ref: 'vendors',
    },
  ],
})

export const TagModel = mongoose.model<TagType>('tags', TagSchema)
