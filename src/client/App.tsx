import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Outlet,
  RouterProvider,
} from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import {
  Home,
  Vendor,
  VendorList,
  Login,
  Signup,
  BrowseProducts,
  CreateVendor,
} from './pages'
import { Header, Footer } from './components'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

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

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/products" element={<BrowseProducts />} />
        <Route path="/create-vendor" element={<CreateVendor />} />
        <Route path="/vendors">
          <Route index element={<VendorList />} />
          <Route path=":id" element={<Vendor />} />
        </Route>
        <Route path="*" element={<Home />} />
      </Route>
    )
  )

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="App">
        <CssBaseline />
        <RouterProvider
          router={router}
          fallbackElement={<div>Loading...</div>}
        />
      </div>
    </ThemeProvider>
  )
}

export default App
