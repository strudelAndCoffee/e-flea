import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import { createTheme, ThemeProvider } from '@mui/material'
// import Paper from '@mui/material/Paper'
// import Grid from '@mui/material/Grid'

import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Rating from '@mui/material/Rating'
import Button from '@mui/material/Button'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import FavoriteIcon from '@mui/icons-material/Favorite'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'

import ProductImg from './ProductImg.jsx'
import { ProductType } from '../../../server/db/models/Product.js'
import { VendorType } from '../../../server/db/models/Vendor.js'
import { getVendorById } from '../../api'
import { ErrorBoundary, ErrorPage } from '../../error_boundary'
import formatCurrency from '../../utils/formatCurrency.js'
import FormButtons from '../Forms/SignupForm/FormButtons.js'
import { useCartStore } from '../../state'

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
  const { image, rating } = product
  const product_id = product._id.toString()
  const vendor_id = product.vendor_id.toString()

  const { isLoading, isError, data } = useQuery({
    queryKey: ['products', 'all-products', 'vendor-products'],
    queryFn: () => getVendorById(vendor_id),
  })

  const cartStore = useCartStore()

  return (
    <ErrorBoundary fallback={<ErrorPage />}>
      <Card variant="outlined" sx={{ maxWidth: 400, padding: 1 }}>
        <CardHeader
          sx={{ padding: 0 }}
          title={product.name}
          subheader={
            <Link to={`/vendors/${vendor_id}`}>
              {isLoading && 'Loading store name...'}
              {data && data.vendor.store_title}
            </Link>
          }
        />
        <CardMedia
          component="img"
          height="194"
          image={image.image_upload ?? image.image_url}
          alt={image.image_alt}
          sx={{ objectPosition: 'center', objectFit: 'cover' }}
        />
        <CardContent sx={{ paddingX: 1, paddingBottom: 0 }}>
          <ThemeProvider theme={ratingTheme}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'flex-end',
              }}
            >
              {/* rating value={null} for no rating */}
              <Rating
                name="read-only"
                value={rating.rating_total}
                precision={0.5}
                size="small"
                readOnly
              />
              <Typography variant="body2" component="p" marginLeft={1}>
                {`(${rating.reviews} reviews)`}
              </Typography>
            </Box>
          </ThemeProvider>
          <Typography variant="body1" component="p" mt={2}>
            {product.description}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <Typography variant="h6" component="h4">
              {formatCurrency(product.price)}
            </Typography>
          </Box>
        </CardContent>
        <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
          {/* <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton> */}
          {cartStore.getItemQuantity(product_id) === 0 ? (
            <Button
              variant="contained"
              size="small"
              onClick={() => cartStore.increaseItemQuantity(product_id)}
            >
              + Add to Cart
            </Button>
          ) : (
            <>
              <IconButton
                aria-label="add one more to cart"
                color="primary"
                onClick={() => {
                  cartStore.increaseItemQuantity(product_id)
                }}
              >
                <AddCircleIcon />
              </IconButton>
              <Typography variant="subtitle2" component="span" align="center">
                {cartStore.getItemQuantity(product_id)} in cart
              </Typography>
              <IconButton
                aria-label="remove one from cart"
                color="primary"
                onClick={() => {
                  cartStore.getItemQuantity(product_id) === 0
                    ? cartStore.removeItemFromCart(product_id)
                    : cartStore.decreaseItemQuantity(product_id)
                }}
              >
                <RemoveCircleIcon />
              </IconButton>
            </>
          )}
        </CardActions>
      </Card>
    </ErrorBoundary>
  )
}
