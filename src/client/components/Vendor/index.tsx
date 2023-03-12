import { Link } from 'react-router-dom'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import { VendorType } from '../../../server/db/models/Vendor'

interface VendorCardProps {
  vendor: VendorType
  idx: number
}

export default function VendorCard({ vendor, idx }: VendorCardProps) {
  return (
    <Grid item key={`${vendor.store_title}${idx}`}>
      <Paper elevation={3} square>
        <Link to={`/vendors/${vendor._id}`}>
          <Typography variant="h5" component="h3">
            {vendor.store_title}
          </Typography>
        </Link>
        <Typography variant="body2" component="p" marginY={1}>
          {vendor.categories.map((cat) => (
            <span>{cat}, </span>
          ))}
        </Typography>
        <Typography variant="body1" component="p" marginY={1}>
          {vendor.store_description}
        </Typography>
      </Paper>
    </Grid>
  )
}
