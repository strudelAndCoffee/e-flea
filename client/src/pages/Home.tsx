import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <>
      <h1>Home Page</h1>
      {/* <Grid container spacing={4}></Grid> */}
      <Link to="/vendors">Vendors</Link>
    </>
  )
}
