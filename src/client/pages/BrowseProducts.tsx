import { useQuery } from '@tanstack/react-query'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid/Grid'
import Typography from '@mui/material/Typography'

import { Product } from '../components'
import { ProductType } from '../../server/db/models/Product.js'
import { ErrorBoundary, ErrorPage } from '../error_boundary'
import { getAllProducts } from '../api'

export default function BrowseProducts() {
  const { isLoading, isError, data } = useQuery({
    queryKey: ['products'],
    queryFn: () => getAllProducts(),
  })

  if (data) console.log(data)

  if (isLoading) return <div>'Loading...'</div>
  if (isError) return <ErrorPage />
  return (
    <ErrorBoundary fallback={<ErrorPage />}>
      <Container component="section">
        <Typography variant="h3" component="h1">
          All Products
        </Typography>
        <Grid container spacing={4}>
          {data?.map((product: ProductType, idx: number) => (
            <Grid item xs={3} key={idx}>
              <Product product={product} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </ErrorBoundary>
  )
}
