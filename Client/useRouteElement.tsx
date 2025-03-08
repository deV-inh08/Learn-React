import { JSX, useContext, lazy, Suspense } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import { AppContext } from './src/contexts/app.context'
import { path } from './src/constants/path'
import ProductList from './src/pages/ProductList'

import RegisterLayout from './src/layouts/RegisterLayout'
import MainLayout from './src/layouts/MainLayout'
import CartLayout from './src/layouts/CartLayout'
import UserLayout from './src/pages/User/layouts/UserLayout'

// import NotFound from './src/pages/NotFound/NotFound'
// import ProductDetail from './src/pages/ProductDetail'
// import Cart from './src/pages/Cart'
// import ChangePassword from './src/pages/User/pages/ChangePassword'
// import Profile from './src/pages/User/pages/Profile'
// import HistoryPurchase from './src/pages/User/pages/HistoryPurchase'
// import Login from './src/pages/Login'
// import Register from './src/pages/Register'

const Login = lazy(() => import('./src/pages/Login'))
const Register = lazy(() => import('./src/pages/Register'))
const NotFound = lazy(() => import('./src/pages/NotFound/NotFound'))
const ProductDetail = lazy(() => import('./src/pages/ProductDetail'))
const Cart = lazy(() => import('./src/pages/Cart'))
const ChangePassword = lazy(() => import('./src/pages/User/pages/ChangePassword'))
const Profile = lazy(() => import('./src/pages/User/pages/Profile'))
const HistoryPurchase = lazy(() => import('./src/pages/User/pages/HistoryPurchase'))

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
          <Suspense>
            <ProductList />
          </Suspense>
        </MainLayout>
      ),
      index: true // set main page
    },
    {
      path: path.productDetail,
      element: (
        <MainLayout>
          <Suspense>
            <ProductDetail />
          </Suspense>
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
              <Suspense>
                <Cart />
              </Suspense>
            </CartLayout>
          )
        },
        {
          path: path.user,
          element: (
            <MainLayout>
              <Suspense>
                <UserLayout></UserLayout>
              </Suspense>
            </MainLayout>
          ),
          children: [
            {
              path: path.profile,
              element: (
                <Suspense>
                  <Profile />
                </Suspense>
              )
            },
            {
              path: path.changePassword,
              element: (
                <Suspense>
                  <ChangePassword />
                </Suspense>
              )
            },
            {
              path: path.histotyPurchase,
              element: (
                <Suspense>
                  <HistoryPurchase />
                </Suspense>
              )
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
              <Suspense>
                <Login />
              </Suspense>
            </RegisterLayout>
          )
        },
        {
          path: path.register,
          element: (
            <RegisterLayout>
              <Suspense>
                <Register />
              </Suspense>
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
          <Suspense>
            <NotFound />
          </Suspense>
        </MainLayout>
      )
    }
  ])
  return routeElement
}

export default useRouteElement
