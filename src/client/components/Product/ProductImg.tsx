import { ImageSchemaType } from '../../../server/db/models/Product'

interface ProductImgProps {
  img: ImageSchemaType
}

export default function ProductImg({ img }: ProductImgProps) {
  return (
    <>
      <img alt={img.image_alt} src={img.image_url} className="product-img" />
    </>
  )
}
