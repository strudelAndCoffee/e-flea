import mongoose, { Schema } from 'mongoose'

export interface TagType {
  tag_name: string
  tagged_product_ids?: Schema.Types.ObjectId[]
  tagged_vendor_ids?: Schema.Types.ObjectId[]
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
