import { Link } from 'react-router-dom'
import Container from '@mui/material/Container'

export default function VendorList() {
  return (
    <Container>
      <h2>Vendor list</h2>
      <Link to="/vendors/1">Vendor 1</Link>
    </Container>
  )
}
