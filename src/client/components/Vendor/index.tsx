import { Link, useNavigate } from 'react-router-dom'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import { VendorType } from '../../../server/db/models/Vendor'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import Box from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'

interface VendorCardProps {
  vendor: VendorType & {
    _id?: string
  }
}

export default function VendorCard({ vendor }: VendorCardProps) {
  const navigate = useNavigate()
  return (
    <Card variant="elevation" sx={{ maxWidth: 400, padding: 1 }}>
      <CardMedia
        component="img"
        height="194"
        image={vendor.image.store_image_upload ?? vendor.image.store_image_url}
        alt={vendor.image.store_image_alt!!}
        sx={{ objectPosition: 'center', objectFit: 'cover' }}
      />
      <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
        <Link to={`/vendors/${vendor._id}`}>
          <Typography variant="h5" component="h3">
            {vendor.store_title}
          </Typography>
        </Link>
      </CardActions>
      <CardContent sx={{ paddingX: 1, paddingBottom: 0 }}>
        <Typography variant="body2" component="p" marginY={1}>
          {vendor.categories.map((cat, idx) => (
            <span key={idx}>{cat}, </span>
          ))}
        </Typography>
        <Typography variant="body1" component="p" marginY={1}>
          {vendor.store_description}
        </Typography>
      </CardContent>
    </Card>
  )
}
