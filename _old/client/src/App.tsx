import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Outlet,
  RouterProvider,
} from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import { Home, Vendor, VendorList, NotFound } from './pages'
import { Header, Footer } from './components'

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Home />} />
        <Route path="/vendors">
          <Route index element={<VendorList />} />
          <Route path=":id" element={<Vendor />} />
        </Route>
        <Route path="*" element={<Home />} />
      </Route>
    )
  )

  return (
    <div className="App">
      <CssBaseline />
      <RouterProvider router={router} />
    </div>
  )
}

function Root() {
  return (
    <>
      <Header />
      <Container
        component="main"
        sx={{
          marginTop: '5rem',
          marginBottom: '3rem',
        }}
      >
        <Outlet />
      </Container>
      <Footer />
    </>
  )
}

export default App
