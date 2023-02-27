import { useParams } from 'react-router-dom'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'

import { Product } from '../components'
import { NotFound } from './'

import useProductStore from '../state/productStore.js'

export default function Vendor() {
  const products = useProductStore((state) => state.products)
  const { id } = useParams()
  if (id == null || id === undefined) return <NotFound />

  return (
    <Container>
      <h2>Vendor {id}</h2>
      <Grid container spacing={4}>
        {products.map((product) => (
          <Product product={product} key={product.id} />
        ))}
      </Grid>
    </Container>
  )
}
