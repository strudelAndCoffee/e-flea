import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import Grid from '@mui/material/Grid'

import { Product } from '../components'
import { NotFound } from './'

import useProductStore from '../state/productStore.js'
import getProductId from '../api/getProductId.js'

export default function Vendor() {
  const products = useProductStore((state) => state.products)
  const { id } = useParams()
  if (id == null || id === undefined) return <NotFound />

  const { isLoading, isError, data } = useQuery({
    queryKey: ['products'],
    queryFn: () => getProductId(),
  })

  return (
    <>
      <h2>Vendor {id}</h2>
      <h3>id from api: {data && data.data}</h3>
      <Grid container spacing={4}>
        {products.map((product) => (
          <Product product={product} key={product.id} />
        ))}
      </Grid>
    </>
  )
}
