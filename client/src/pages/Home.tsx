// import '../css/home.css'
import { Container, Grid } from '@mui/material'
import { Product } from '../components'

export default function Home() {
  return (
    <main>
      <Container>
        <Grid container spacing={4}>
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
        </Grid>
      </Container>
    </main>
  )
}
