import { QueryConfig } from "../../ProductList"
import { sort_by as sortBy, order as orderConstant } from "../../../../constants/product"
import { createSearchParams, useNavigate } from "react-router-dom"
import { path } from "../../../../constants/path"
import { ProductListConfig } from "../../../../types/product.type"
import classNames from "classnames"

interface Props {
  queryConfig: QueryConfig
}

type FilterPriceType = Exclude<ProductListConfig['order'], undefined>

const SortProductList = ({ queryConfig }: Props) => {
  const navigate = useNavigate()
  const { sort_by = sortBy.createdAt } = queryConfig

  const isActiveSortByButton = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined> | FilterPriceType): boolean => {
    return sort_by === sortByValue
  }

  const handleSort = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        sort_by: sortByValue
      }).toString()
    })
  }

  const handlePriceOrder = (orderValue: FilterPriceType) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        sort_by: sortBy.price,
        order: orderValue
      }).toString()
    })
  }

  return (
    <div className='bg-gray-300/40 py-4 px-3'>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <div className='flex items-center gap-2'>
          <p>Sắp xếp theo</p>
          <button
            onClick={() => handleSort(sortBy.view)}
            className={classNames('h-8 px-4 capitalize text-center', {
              'bg-orange-600 text-white hover:bg-orange-600/80': isActiveSortByButton(sortBy.view),
              'bg-white text-black hover:bg-gray-200': !isActiveSortByButton(sortBy.view)
            })}
          >
            Phổ biến
          </button>
          <button
            onClick={() => handleSort(sortBy.createdAt)}
            className={classNames('h-8 px-4 capitalize text-center', {
              'bg-orange-600 text-white hover:bg-orange-600/80': isActiveSortByButton(sortBy.createdAt),
              'bg-white text-black hover:bg-gray-200': !isActiveSortByButton(sortBy.createdAt)
            })}
          >
            Mới nhất
          </button>
          <button
            onClick={() => handleSort(sortBy.sold)}
            className={classNames('h-8 px-4 capitalize text-center', {
              'bg-orange-600 text-white hover:bg-orange-600/80': isActiveSortByButton(sortBy.sold),
              'bg-white text-black hover:bg-gray-200': !isActiveSortByButton(sortBy.sold)
            })}
          >
            Bán chạy
          </button>
          <select
            onChange={(e) => handlePriceOrder(e.target.value as FilterPriceType)}
            className={classNames('h-8 px-2 capitalize text-left outline-none', {
              'bg-orange-600 text-white': isActiveSortByButton(sortBy.price),
              'bg-white text-black text-sm hover:bg-slate-200': !isActiveSortByButton(sortBy.price)
            })}
          >
            <option className='bg-white text-black' value='' disabled>
              Giá
            </option>
            <option className='bg-white text-black' value={orderConstant.acs}>
              Thấp đến cao
            </option>
            <option className='bg-white text-black' value={orderConstant.desc}>Cao đến thấp</option>
          </select>
        </div>
        <div className='flex items-center'>
          <div>
            <span className='text-orange-600 mr-1'>1</span>
            <span>2</span>
          </div>
          <div className='ml-2'>
            <button className='px-3 h-8 rounded-tl-sm rouded-bl-sm bg-white/60 hover:bg-slate-100 cursor-not-allowed shadow-sm'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-3 h-3'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5 8.25 12l7.5-7.5' />
              </svg>
            </button>
            <button className='px-3 h-8 rounded-tl-sm rouded-bl-sm bg-white/60 hover:bg-slate-100 cursor-not-allowed shadow-sm'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='h-3 w-3'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SortProductList
