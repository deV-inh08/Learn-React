import { useRoutes } from 'react-router-dom'
import ProductList from './src/pages/ProductList'
import Login from './src/pages/Login'
import Register from './src/pages/Register'
import RegisterLayout from './src/layouts/RegisterLayout'
import MainLayout from './src/layouts/MainLayout'
import NotFound from './src/pages/NotFound/NotFound'

const useRouteElement = () => {
  const routeElement = useRoutes([
    {
      path: '/',
      element: (
        <MainLayout>
          <ProductList />
        </MainLayout>
      )
    },
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
    },
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
