import { createTheme, ThemeProvider } from '@mui/material'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Rating from '@mui/material/Rating'
// import { } from '@mui/icons-material'

import { DoggoImg } from '../'

export type ProductType = {
  id: number
  name: string
  description: string
  rating: number
  reviews: number
  price: number
  categories: string[]
  tags: string[]
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
  return (
    <Grid item xs={4}>
      <ThemeProvider theme={ratingTheme}>
        <Paper elevation={3} square>
          <DoggoImg />
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
                value={product.rating}
                precision={0.5}
                size="small"
                readOnly
              />
              <Typography variant="body2" component="p" marginLeft={0.5}>
                {product.rating}
              </Typography>
              <Typography variant="body2" component="p" marginLeft={1.5}>
                {`(${product.reviews})`}
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
