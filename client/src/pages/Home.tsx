import { Link } from 'react-router-dom'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

import { SiteLink } from '../components'

const siteLinkInfo = [
  {
    icon: 'vendors',
    text: 'Explore Vendors',
  },
  {
    icon: 'products',
    text: 'Browse Merchandise',
  },
  {
    icon: 'create',
    text: 'Create Vendor Account',
  },
]

export default function Home() {
  return (
    <Grid container spacing={4} paddingTop={15}>
      {siteLinkInfo.map(({ icon, text }) => (
        <SiteLink icon={icon} text={text} />
      ))}
    </Grid>
  )
}
