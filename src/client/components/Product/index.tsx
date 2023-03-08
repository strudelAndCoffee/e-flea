import { Schema } from 'mongoose'
import { createTheme, ThemeProvider } from '@mui/material'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Rating from '@mui/material/Rating'

import ProductImg from './ProductImg.jsx'

export type ProductType = {
  _id: Schema.Types.ObjectId
  name: string
  description: string
  rating_total: number
  rating_scores: number[] | []
  reviews: number
  price: number
  categories: string[] | []
  tags: Schema.Types.ObjectId[] | []
  image_url: string
  image_upload: any
  image_alt: string
  vendor_id: Schema.Types.ObjectId
}
interface ProductProps {
  product: ProductType
}

const ratingTheme = createTheme({
  components: {
    MuiTypography: {
      variants: [
        {
          props: {
            variant: 'body2',
          },
          style: {
            fontSize: 11,
          },
        },
      ],
    },
  },
})

export default function Product({ product }: ProductProps) {
  const { image_url, image_upload, image_alt } = product

  return (
    <Grid item xs={4}>
      <ThemeProvider theme={ratingTheme}>
        <Paper elevation={3} square>
          <ProductImg img={{ image_url, image_upload, image_alt }} />
          <Box paddingX={1}>
            <Typography variant="h5" component="h3">
              {product.name}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'flex-end',
              }}
            >
              {/* rating value={null} for no rating */}
              <Rating
                name="read-only"
                value={product.rating_total}
                precision={0.5}
                size="small"
                readOnly
              />
              <Typography variant="body2" component="p" marginLeft={1}>
                {`(${product.reviews} reviews)`}
              </Typography>
            </Box>
            <Typography variant="body1" component="p" marginY={1}>
              {product.description}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <Typography variant="h6" component="h4">
                {`$${product.price}`}
              </Typography>
            </Box>
          </Box>
        </Paper>
      </ThemeProvider>
    </Grid>
  )
}
