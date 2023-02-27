// import { useQuery } from '@tanstack/react-query'
// import axios from 'axios'
import '../../css/home.css'

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

  // const { isLoading, isError, data } = useQuery({
  //   queryKey: ['dogs'],
  //   queryFn: () =>
  //     axios
  //       .get('https://random.dog/woof.json')
  //       .then((res) => {
  //         return res.data
  //       })
  //       .catch((err) => {
  //         throw err
  //       }),
  // })

  // if (isLoading) return <span>Loading...</span>
  // if (isError || !data.url) return <span>No image</span>
  // return (
  //   <>
  //     <img alt="doggo" src={data.url} className="product-img" />
  //   </>
  // )
}
