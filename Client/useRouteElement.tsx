import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import ProductList from './src/pages/ProductList'
import Login from './src/pages/Login'
import Register from './src/pages/Register'
import RegisterLayout from './src/layouts/RegisterLayout'
import MainLayout from './src/layouts/MainLayout'
import NotFound from './src/pages/NotFound/NotFound'
import Profile from './src/pages/Profile'

const isAuthenticated = true

const ProtectRoute = () => {
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}

const RejectedRoute = () => {
  return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
}

const useRouteElement = () => {
  const routeElement = useRoutes([
    {
      path: '/',
      element: (
        <MainLayout>
          <ProductList />
        </MainLayout>
      ),
      index: true // set main page
    },
    // Protect Route
    {
      path: '',
      element: <ProtectRoute />,
      children: [
        {
          path: 'profile',
          element: (
            <MainLayout>
              <Profile />
            </MainLayout>
          )

        }
      ]
    },
    // Reject Route
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: '/login',
          element: (
            <RegisterLayout>
              <Login />
            </RegisterLayout>
          )
        },
        {
          path: '/register',
          element: (
            <RegisterLayout>
              <Register />
            </RegisterLayout>
          )
        }
      ]
    },
    // Route 404 page
    {
      path: '*',
      element: (
        <MainLayout>
          <NotFound />
        </MainLayout>
      )
    }
  ])
  return routeElement
}

export default useRouteElement
