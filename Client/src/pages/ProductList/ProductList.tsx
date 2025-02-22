import { omitBy, isUndefined } from 'lodash'
import AsideFilter from './AsideFilter'
import SortProductList from './SortProductList'
import Product from './Product/Product'
import { useQuery, keepPreviousData } from '@tanstack/react-query'
import useQueryParam from '../../hooks/useQueryParam'
import productApi from '../../apis/product.api'
import Paginate from '../../components/Paginate'
import { ProductListConfig } from '../../types/product.type'
import categoryApi from '../../apis/category.apis'
// import { useSearchParams } from 'react-router-dom'

export type QueryConfig = {
  [key in keyof ProductListConfig]: string
}

const ProductList = () => {
  // const [searchParams] = useSearchParams()
  const queryParams: QueryConfig = useQueryParam() // custom hook useQuery Params
  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParams.page || '1',
      exclude: queryParams.exclude,
      limit: queryParams.limit,
      name: queryParams.name,
      price_max: queryParams.price_max,
      price_min: queryParams.price_min,
      rating_filter: queryParams.rating_filter,
      sort_by: queryParams.sort_by,
      category: queryParams.category
    },
    isUndefined
  )

  const { data: productsData } = useQuery({
    queryKey: ['product', queryParams],
    queryFn: () => {
      return productApi.getProducts(queryParams as ProductListConfig)
    },
    placeholderData: keepPreviousData
  })

  const { data: categoryData } = useQuery({
    queryKey: ['categories'],
    queryFn: () => {
      return categoryApi.getCategories()
    }
  })

  return (
    <div className='bg-gray-200 py-6'>
      <div className='container-custom'>
        {productsData && (
          <div className='grid grid-cols-12 gap-6'>
            <div className='col-span-3'>
              <AsideFilter categories={categoryData?.data.data || []} queryConfig={queryConfig}/>
            </div>
            <div className='col-span-9'>
              <SortProductList />
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
