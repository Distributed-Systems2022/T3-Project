import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  Router,
  Routes
} from 'react-router-dom'
import App from './App'
import Navbar from './components/Navbar'
import ClinicPage from './pages/ClinicPage'
import DashboardPage from './pages/DashboardPage'
import HomePage from './pages/HomePage'

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <HomePage /> },
      {
        path: 'clinic/:pageId',
        element: <ClinicPage />
      },
      {
        path: 'dashboard',
        element: <DashboardPage />
      }
    ]
  }
])

export default router