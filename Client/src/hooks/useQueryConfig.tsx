import useQueryParam from './useQueryParam'
import { omitBy, isUndefined } from 'lodash'
import { QueryConfig } from '../pages/ProductList/ProductList'

export const useQueryConfig = () => {
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
      category: queryParams.category,
      order: queryParams.order
    },
    isUndefined
  )
  return queryConfig
}
