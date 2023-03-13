import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import { VendorType } from '../../server/db/models/Vendor'
import { VendorCard } from '../components'
import Container from '@mui/material/Container'
import { ErrorBoundary, ErrorPage } from '../error_boundary'

export default function VendorList() {
  const [allVendors, setAllVendors] = useState<VendorType[] | []>([])

  useEffect(() => {
    const getAllVendors = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/vendors')
        setAllVendors(res.data.vendors)
      } catch (err) {
        console.log(err)
        alert('error')
      }
    }
    getAllVendors()
  }, [])

  return (
    <ErrorBoundary fallback={<ErrorPage />}>
      <Container component="section">
        <Typography variant="h3" component="h1">
          Vendor list
        </Typography>
        <Grid container spacing={4}>
          {allVendors.map((vendor, idx) => (
            <Grid item key={idx}>
              <VendorCard vendor={vendor} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </ErrorBoundary>
  )
}
