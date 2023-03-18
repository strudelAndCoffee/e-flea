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
  Account,
  Vendor,
  VendorList,
  Login,
  Signup,
  BrowseProducts,
  CreateVendor,
  CheckoutComplete,
  CheckoutCancelled,
} from './pages'
import { Header, Footer } from './components'
import { ErrorPage } from './error_boundary'

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
        <Route index element={<Home />} errorElement={<ErrorPage />} />
        <Route path="/login" element={<Login />} errorElement={<ErrorPage />} />
        <Route
          path="/signup"
          element={<Signup />}
          errorElement={<ErrorPage />}
        />
        <Route
          path="/account"
          element={<Account />}
          errorElement={<ErrorPage />}
        />
        <Route
          path="/products"
          element={<BrowseProducts />}
          errorElement={<ErrorPage />}
        />
        <Route path="/vendors" errorElement={<ErrorPage />}>
          <Route index element={<VendorList />} errorElement={<ErrorPage />} />
          <Route path=":id" element={<Vendor />} errorElement={<ErrorPage />} />
          <Route
            path="create-vendor"
            element={<CreateVendor />}
            errorElement={<ErrorPage />}
          />
        </Route>
        <Route path="/checkout-complete" element={<CheckoutComplete />} />
        <Route path="/checkout-cancelled" element={<CheckoutCancelled />} />
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
