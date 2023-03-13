import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'

import { VendorType } from '../../server/db/models/Vendor'
import { VendorCard } from '../components'
import { ErrorBoundary, ErrorPage } from '../error_boundary'
import { getAllVendors } from '../api'

export default function VendorList() {
  const { isLoading, isError, data } = useQuery({
    queryKey: ['vendors', 'all-vendors'],
    queryFn: () => getAllVendors(),
  })

  if (isLoading) return <div>'Loading...'</div>
  if (isError) return <ErrorPage />
  return (
    <ErrorBoundary fallback={<ErrorPage />}>
      <Container component="section">
        <Typography variant="h3" component="h1">
          Vendor list
        </Typography>
        <Grid container spacing={4}>
          {data.vendors &&
            data.vendors.map((vendor: VendorType, idx: number) => (
              <Grid item key={idx}>
                <VendorCard vendor={vendor} />
              </Grid>
            ))}
        </Grid>
      </Container>
    </ErrorBoundary>
  )
}
