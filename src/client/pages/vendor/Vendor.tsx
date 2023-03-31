import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'

import { Product } from '../../components'
import { NotFound } from '../'
import { ProductType } from '../../../server/db/models/Product.js'
import { ErrorBoundary, ErrorPage } from '../../error_boundary'
import { getProductsByVendorId } from '../../api'

export default function Vendor() {
  const { id } = useParams()
  if (id == null || id === undefined) return <NotFound />

  const { isLoading, isError, data } = useQuery({
    queryKey: ['products', 'vendor-products', 'vendors'],
    queryFn: () => getProductsByVendorId(id),
  })

  if (isLoading) return <div>'Loading...'</div>
  if (isError) return <ErrorPage />
  return (
    <ErrorBoundary fallback={<ErrorPage />}>
      <section>
        <h2>{data.vendor.store_title}</h2>
        <Grid container spacing={4}>
          {data?.products.map((product: ProductType, idx: number) => (
            <Grid item xs={4} key={idx}>
              <Product product={product} />
            </Grid>
          ))}
        </Grid>
      </section>
    </ErrorBoundary>
  )
}
