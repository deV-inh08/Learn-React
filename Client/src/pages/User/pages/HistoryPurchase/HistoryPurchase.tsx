import { path } from '../../../../constants/path'
import { createSearchParams, Link } from 'react-router-dom'
import { PurchasesStatus } from '../../../../constants/purchase'
import classNames from 'classnames'
import useQueryParam from '../../../../hooks/useQueryParam'
import { useQuery } from '@tanstack/react-query'
import purchaseApi from '../../../../apis/purchase.api'
import { PurchaseListStatus } from '../../../../types/purchase.type'
import { formatCurrency, generateNameId } from '../../../../utils/uitls'

const purchaseTabs = [
  { status: PurchasesStatus.all, name: 'Tất cả' },
  { status: PurchasesStatus.waitForConfinmation, name: 'Chờ xác nhận' },
  { status: PurchasesStatus.waitForGettingProduct, name: 'Chờ lấy hàng' },
  { status: PurchasesStatus.inProgress, name: 'Đang giao' },
  { status: PurchasesStatus.delivered, name: 'Đã giao' },
  { status: PurchasesStatus.cancelled, name: 'Đã hủy' }
]

const HistoryPurchase = () => {
  const queryParams: { status?: string } = useQueryParam()
  const status: number = Number(queryParams.status || PurchasesStatus.all)
  const { data: PurchaseList } = useQuery({
    queryKey: ['purchases', { status }],
    queryFn: () => purchaseApi.getPurchases({ status: status as PurchaseListStatus })
  })

  const purchases = PurchaseList?.data.data

  return (
    <div className='overflow-x-auto '>
      <div className='min-w-[700px]'>
        <div className='sticky top-0 flex rounded-t-sm shadow-sm'>
          {purchaseTabs.map((purchase) => {
            return (
              <Link
                to={{
                  pathname: path.histotyPurchase,
                  search: createSearchParams({
                    status: String(purchase.status)
                  }).toString()
                }}
                className={classNames('flex flex-1 items-center justify-center border-b-2 bg-white py-4 text-center', {
                  'border-b-orange-600 text-orange-600': status === purchase.status,
                  'border-b-black/10 text-gray-900': status !== purchase.status
                })}
              >
                {purchase.name}
              </Link>
            )
          })}
        </div>
        <div>
          {purchases?.map((purchase) => {
            return (
              <div key={purchase._id} className='mt-4 rounded-sm border-black/10 bg-white text-gray-800 p-6 shadow-sm'>
                <Link
                  className='flex'
                  to={`${path.home}${generateNameId({
                    name: purchase.product.name,
                    id: purchase.product._id
                  })}`}
                >
                  <div className='shrink-0'>
                    <img src={purchase.product.image} alt={purchase.product.name} className='h-20 w-20 object-cover' />
                  </div>
                  <div className='ml-3 flex-grow overflow-hidden'>
                    <p className='truncate'>{purchase.product.name}</p>
                    <p className='mt-3'>x{purchase.buy_count}</p>
                  </div>
                  <div className='ml-3 flex shrink-0'>
                    <p className='truncate text-gray-500 line-through'>
                      {formatCurrency(purchase.product.price_before_discount)}
                    </p>
                    <p className='truncate ml-2 text-orange-600 line-through'>
                      {formatCurrency(purchase.product.price)}
                    </p>
                  </div>
                </Link>
                <div className='flex justify-end'>
                  <div>
                    <span>Tổng giá tiền:</span>
                    <span className='ml-4 text-xl text-orange-500'>
                      {formatCurrency(purchase.product.price * purchase.buy_count)}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default HistoryPurchase
