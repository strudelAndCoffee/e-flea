interface ProductImgProps {
  img: {
    image_url: string
    image_upload: any
    image_alt: string
  }
}

export default function ProductImg({ img }: ProductImgProps) {
  return (
    <>
      <img alt={img.image_alt} src={img.image_url} className="product-img" />
    </>
  )
}
