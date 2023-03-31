import { useLocation } from 'react-router-dom'

import Box from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Rating from '@mui/material/Rating'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

import { ImageSchemaType } from '../../../server/db/models/Product'
import formatCurrency from '../../utils/formatCurrency'
import ProductHeader from './ProductHeader'

interface ProductImgProps {
  name: string
  image: ImageSchemaType
  rating: {
    rating_total: number
    rating_scores?: number[] | []
    reviews: number
  }
  description: string
  price: number
  vendor_id: string
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

export default function ProductContent({
  name,
  vendor_id,
  image,
  rating,
  description,
  price,
}: ProductImgProps) {
  const location = useLocation()
  return (
    <>
      <ProductHeader
        name={name}
        vendor_id={
          location.pathname === `/vendors/${vendor_id}` ? null : vendor_id
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
          {/* rating value={null} for no rating */}
          <Rating
            name="read-only"
            value={rating.rating_total}
            precision={0.5}
            size="small"
            readOnly
          />
          <Typography variant="body2" component="p">
            {`${rating.reviews} reviews`}
          </Typography>
        </ThemeProvider>
        <Typography variant="body1" component="p" mt={2}>
          {description}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Typography variant="h6" component="h4">
            {formatCurrency(price)}
          </Typography>
        </Box>
      </CardContent>
    </>
  )
}
