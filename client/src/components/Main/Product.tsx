import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

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
          <Typography variant="subtitle1" component="p">
            A doggo, ready to please
          </Typography>
        </Box>
      </Paper>
    </Grid>
  )
}
