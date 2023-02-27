import { useState, useEffect } from 'react'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'

import { DoggoImg } from '../'

export default function Product() {
  return (
    <Grid item xs={4}>
      <Paper elevation={2} square>
        <DoggoImg />
      </Paper>
    </Grid>
  )
}
