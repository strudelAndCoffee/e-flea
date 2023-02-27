import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Rating from '@mui/material/Rating'
// import { } from '@mui/icons-material'

import { DoggoImg } from '../'

export default function Product() {
  return (
    <Grid item xs={4}>
      <Paper elevation={3} square>
        <DoggoImg />
        <Box paddingX={1}>
          <Typography variant="h5" component="h3">
            Doggo
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            {/* rating value={null} for no rating */}
            <Rating
              name="read-only"
              value={4.5}
              precision={0.5}
              size="small"
              readOnly
            />
            <Typography variant="body2" component="p">
              4.5
            </Typography>
            <Typography variant="body2" component="p">
              (3 billion reviews)
            </Typography>
          </Box>
          <Typography variant="body1" component="p" marginY={1}>
            A doggo, ready to please
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <Typography variant="h6" component="h4">
              $1,000,000
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Grid>
  )
}