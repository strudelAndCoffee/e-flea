import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import FavoriteIcon from '@mui/icons-material/Favorite'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'

import { ProductType } from '../../../server/db/models/Product.js'
import { ErrorBoundary, ErrorPage } from '../../error_boundary'
import ProductContent from './ProductContent.js'
import { useCartStore } from '../../state'

interface ProductProps {
  product: ProductType
}

export default function Product({ product }: ProductProps) {
  const { name, description, price, image, rating, _id } = product
  const product_id = _id.toString()
  const vendor_id = product.vendor_id.toString()
  const cartStore = useCartStore()

  return (
    <ErrorBoundary fallback={<ErrorPage />}>
      <Card variant="outlined" sx={{ maxWidth: 400, padding: 1 }}>
        <ProductContent
          name={name}
          image={image}
          rating={rating}
          description={description}
          price={price}
          vendor_id={vendor_id}
        />
        <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
          {/* <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton> */}
          {cartStore.getItemQuantity(product_id) === 0 ? (
            <Button
              variant="contained"
              size="small"
              onClick={() =>
                cartStore.addItemToCart(
                  product_id,
                  name,
                  price,
                  image.image_url
                )
              }
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
                <AddCircleIcon fontSize="large" />
              </IconButton>
              <Typography variant="button" component="span" align="center">
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
                <RemoveCircleIcon fontSize="large" />
              </IconButton>
            </>
          )}
        </CardActions>
      </Card>
    </ErrorBoundary>
  )
}
