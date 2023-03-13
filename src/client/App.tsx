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
        <Route path="/login">
          <Route index element={<Login />} />
        </Route>
        <Route path="/signup">
          <Route index element={<Signup />} />
        </Route>
        <Route path="/products">
          <Route index element={<BrowseProducts />} />
        </Route>
        <Route path="/create-vendor">
          <Route index element={<CreateVendor />} />
        </Route>
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
