import { Helmet } from 'react-helmet-async'
import AsideFilter from './components/AsideFilter'
import SortProductList from './components/SortProductList'
import Product from './components/Product/Product'
import { useQuery, keepPreviousData } from '@tanstack/react-query'
import useQueryParam from '../../hooks/useQueryParam'
import productApi from '../../apis/product.api'
import Paginate from '../../components/Paginate'
import { ProductListConfig } from '../../types/product.type'
import categoryApi from '../../apis/category.apis'
import { useQueryConfig } from '../../hooks/useQueryConfig'
// import { useSearchParams } from 'react-router-dom'

export type QueryConfig = {
  [key in keyof ProductListConfig]: string
}

const ProductList = () => {
  // const [searchParams] = useSearchParams()
  const queryParams: QueryConfig = useQueryParam() // custom hook useQuery Params
  const queryConfig = useQueryConfig()

  const { data: productsData } = useQuery({
    queryKey: ['product', queryParams],
    queryFn: () => {
      return productApi.getProducts(queryParams as ProductListConfig)
    },
    placeholderData: keepPreviousData,
    staleTime: 3 * 60 * 1000
  })

  const { data: categoryData } = useQuery({
    queryKey: ['categories'],
    queryFn: () => {
      return categoryApi.getCategories()
    }
  })

  return (
    <div className='bg-gray-200 py-6'>
      <Helmet>
        <title>Trang chủ | Shopee Clone</title>
        <meta name='description' content='Trang chủ dự án Shopee Clone'></meta>
      </Helmet>
      <div className='container-custom'>
        {productsData && (
          <div className='grid grid-cols-12 gap-6'>
            <div className='col-span-3'>
              <AsideFilter categories={categoryData?.data.data || []} queryConfig={queryConfig} />
            </div>
            <div className='col-span-9'>
              <SortProductList queryConfig={queryConfig} />
              <div className='mt-6 grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3'>
                {productsData &&
                  productsData.data.data.products.map((item, index) => {
                    return (
                      <div key={index} className='col-span-1'>
                        <Product product={item} />
                      </div>
                    )
                  })}
              </div>
              <Paginate queryConfig={queryConfig} pageSize={productsData.data.data.pagination.page_size}></Paginate>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductList
