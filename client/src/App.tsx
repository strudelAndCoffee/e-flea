import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Link,
  Outlet,
  RouterProvider,
} from 'react-router-dom'
import { Home } from './pages'
import { Header, Test } from './components'

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Home />} />
        <Route path="test" element={<Test />} />
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
    <>
      <Header />
      <div>
        <Link to="/">Home</Link>
        <Link to="/test">Test</Link>
      </div>
      <Outlet />
    </>
  )
}

export default App
