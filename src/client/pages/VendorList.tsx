import { Link } from 'react-router-dom'

export default function VendorList() {
  return (
    <section>
      <h2>Vendor list</h2>
      <Link to="/vendors/1">Vendor 1</Link>
    </section>
  )
}
