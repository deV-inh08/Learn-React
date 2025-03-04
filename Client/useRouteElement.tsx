import { JSX, useContext } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import { AppContext } from './src/contexts/app.context'
import { path } from './src/constants/path'
import ProductList from './src/pages/ProductList'
import Login from './src/pages/Login'
import Register from './src/pages/Register'
import RegisterLayout from './src/layouts/RegisterLayout'
import MainLayout from './src/layouts/MainLayout'
import NotFound from './src/pages/NotFound/NotFound'
import ProductDetail from './src/pages/ProductDetail'
import Cart from './src/pages/Cart'
import CartLayout from './src/layouts/CartLayout'
import UserLayout from './src/pages/User/layouts/UserLayout'
import ChangePassword from './src/pages/User/pages/ChangePassword'
import Profile from './src/pages/User/pages/Profile'

const ProtectRoute = (): JSX.Element => {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to={path.login} />
}

const RejectedRoute = (): JSX.Element => {
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to={path.home} />
}

const useRouteElement = () => {
  const routeElement = useRoutes([
    {
      path: path.home,
      element: (
        <MainLayout>
          <ProductList />
        </MainLayout>
      ),
      index: true // set main page
    },
    {
      path: path.productDetail,
      element: (
        <MainLayout>
          <ProductDetail />
        </MainLayout>
      )
    },
    // Protect Route
    {
      path: '',
      element: <ProtectRoute />,
      children: [
        {
          path: path.cart,
          element: (
            <CartLayout>
              <Cart />
            </CartLayout>
          )
        },
        {
          path: path.user,
          element: (
            <MainLayout>
              <UserLayout></UserLayout>
            </MainLayout>
          ),
          children: [
            {
              path: path.profile,
              element: <Profile />
            },
            {
              path: path.changePassword,
              element: <ChangePassword />
            }
          ]
        }
      ]
    },
    // Reject Route
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: path.login,
          element: (
            <RegisterLayout>
              <Login />
            </RegisterLayout>
          )
        },
        {
          path: path.register,
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
