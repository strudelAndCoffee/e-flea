import mongoose, { Schema } from 'mongoose'

export interface TagType {
  tag_name: string
  tagged_product_ids: string[]
  tagged_vendor_ids: string[]
}

const TagSchema = new Schema<TagType>({
  tag_name: {
    type: String,
    minlength: 3,
    maxlength: 64,
    lowercase: true,
    required: [true, 'Your tag needs a name to be found!'],
  },
  tagged_product_ids: [
    {
      type: String,
      required: true,
      default: [],
    },
  ],
  tagged_vendor_ids: [
    {
      type: String,
      required: true,
      default: [],
    },
  ],
})

export const TagModel = mongoose.model<TagType>('tags', TagSchema)
