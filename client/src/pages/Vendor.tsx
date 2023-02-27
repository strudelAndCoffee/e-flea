import { useParams } from 'react-router-dom'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import { Product } from '../components'
import { NotFound } from './'

export default function Vendor() {
  const { id } = useParams()
  if (id == null || id === undefined) return <NotFound />

  return (
    <Container>
      <h2>Vendor {id}</h2>
      <Grid container spacing={4}>
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
      </Grid>
    </Container>
  )
}
