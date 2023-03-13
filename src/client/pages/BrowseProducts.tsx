import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid/Grid'
import Typography from '@mui/material/Typography'

import { ErrorPage } from '../error_boundary'
import { Product } from '../components'
import { ProductType } from '../../server/db/models/Product.js'

// async function getAllProducts() {
//   const res = await axios.get('http://localhost:3000/api/products/', {
//     withCredentials: true,
//   })
//   console.log(res.data)
// }

export default function BrowseProducts() {
  const { isLoading, isError, data } = useQuery({
    queryKey: ['all-products'],
    queryFn: async () =>
      axios
        .get('http://localhost:3000/api/products/', {
          withCredentials: true,
        })
        .then((res) => {
          return res.data
        })
        .catch((err) => {
          console.error(err)
          throw err
        }),
  })

  if (isLoading) return <div>'Loading...'</div>
  if (isError) return <ErrorPage />
  return (
    <Container component="section">
      <Typography variant="h3" component="h1">
        All Products
      </Typography>
      <Grid container spacing={4}>
        {data.products &&
          data.products.map((product: ProductType, idx: number) => (
            <Product product={product} key={idx} />
          ))}
      </Grid>
    </Container>
  )
}
