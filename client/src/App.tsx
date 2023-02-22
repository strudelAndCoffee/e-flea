import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Link,
  Outlet,
  RouterProvider,
} from 'react-router-dom'
import { Home, Vendor } from './pages'
import { Header } from './components'

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Home />} />
        <Route path="vendor/1" element={<Vendor id={1} />} />
      </Route>
    )
  )

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

function Root() {
  return (
    <div className="app-container">
      <Header />
      <Outlet />
    </div>
  )
}

export default App
