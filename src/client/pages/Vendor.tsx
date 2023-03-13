import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'

import { Product } from '../components'
import { NotFound } from './'
import { ProductType } from '../../server/db/models/Product.js'

export default function Vendor() {
  const { id } = useParams()
  if (id == null || id === undefined) return <NotFound />

  const [products, setProducts] = useState<ProductType[] | []>([])

  useEffect(() => {}, [])

  return (
    <section>
      <h2>Vendor {id}</h2>
      {/* <h3>API data: {apiData}</h3> */}
      {/* <Button
        onClick={() => {
          axios.get('/api/products/1').then((res) => setApiData(res.data.data))
        }}
      >
        query
      </Button> */}
      <Grid container spacing={4}>
        {products &&
          products.map((product, idx) => (
            <Grid item xs={4} key={idx}>
              <Product product={product} />
            </Grid>
          ))}
      </Grid>
    </section>
  )
}
