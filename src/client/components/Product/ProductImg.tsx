interface ProductImgProps {
  img: {
    url: string
    alt: string
  }
}

export default function ProductImg({ img }: ProductImgProps) {
  return (
    <>
      <img alt={img.alt} src={img.url} className="product-img" />
    </>
  )
}
