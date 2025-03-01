import { useQuery } from '@tanstack/react-query'
import { PurchasesStatus } from '../../constants/purchase'
import purchaseApi from '../../apis/purchase.api'
import { Link } from 'react-router-dom'
import { path } from '../../constants/path'
import { formatCurrency, generateNameId } from '../../utils/uitls'
import QuantityController from '../../components/QuantityController'
import Button from '../../components/Button'

const Cart = () => {
  const { data: purchasesInCartData } = useQuery({
    queryKey: ['purchases', { status: PurchasesStatus.inCart }],
    queryFn: () => purchaseApi.getPurchases({ status: PurchasesStatus.inCart })
  })
  const purchaseInCart = purchasesInCartData?.data.data
  return (
    <div className='bg-neutral-100 py-16'>
      <div className='container-custom'>
        <div className='overflow-auto'>
          <div className='min-w-[1000px]'>
            <div className='grid grid-cols-12 rounded-sm bg-white py-5 px-9 text-sm capitalize text-gray-500 shadow'>
              <div className='col-span-6 bg-white'>
                <div className='flex items-center gap-2'>
                  <div className='flex shrink-0 items-center justify-center'>
                    <input type='checkbox' className='h-5 w-5 accent-orange-600' />
                  </div>
                  <p className='flex-grow text-black'>Sản phẩm</p>
                </div>
              </div>
              <div className='col-span-6'>
                <div className='grid grid-cols-5 items-center'>
                  <p className='col-span-2'>Đơn giá</p>
                  <p className='col-span-1'>Số lượng</p>
                  <p className='col-span-1'>Số tiền</p>
                  <p className='col-span-1'>Thao tác</p>
                </div>
              </div>
            </div>
            <div className='my-3 rounded-sm p-5 shadow'>
              {purchaseInCart?.map((purchase) => {
                return (
                  <div
                    key={purchase._id}
                    className='first:mt-5 grid grid-cols-12 rounded-sm border border-gray-200 bg-white py-5 px-4 text-center text-sm text-gray-500 mt-4'
                  >
                    <div className='col-span-6'>
                      <div className='flex'>
                        <div className='flex shrink-0 items-center justify-center'>
                          <input type='checkbox' className='h-5 w-5 accent-orange-600' />
                        </div>
                        <div className='flex-grow'>
                          <div className='flex items-center'>
                            <Link
                              to={`${path.home}${generateNameId({ name: purchase.product.name, id: purchase.product._id })}`}
                              className='h-20 w-20 shrink-0'
                            >
                              <img src={purchase.product.image} alt={purchase.product.name} />
                            </Link>
                            <div className='flex-grow px-2 pt-1 pb-2'>
                              <Link
                                to={`${path.home}${generateNameId({ name: purchase.product.name, id: purchase.product._id })}`}
                                className='line-clamp-2'
                              >
                                {purchase.product.name}
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='col-span-6'>
                      <div className='grid grid-cols-5 items-center'>
                        <div className='col-span-2'>
                          <div className='flex items-center justify-center'>
                            <span className='text-gray-300 line-through'>
                              {formatCurrency(purchase.product.price_before_discount)}
                            </span>
                            <span className='ml-3'>{formatCurrency(purchase.product.price)}</span>
                          </div>
                        </div>
                        <div className='col-span-1'>
                          <QuantityController
                            max={purchase.product.quantity}
                            value={purchase.buy_count}
                            classNameWrapper='flex items-center'
                          />
                        </div>
                        <div className='col-span-1'>
                          <span className='text-orange-500'>
                            {formatCurrency(purchase.product.price * purchase.buy_count)}
                          </span>
                        </div>
                        <div className='col-span-1'>
                          <button className='bg-none text-black transition-colors hover:text-orange-500'>Xóa</button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <div className='sticky bottom-0 z-10 flex items-center rounded-sm bg-white p-5'>
          <div className='flex shrink-0 items-center justify-center pr-3'>
            <input type='checkbox' className='h-5 w-5 accent-orange-600' />
          </div>
          <button className='mx-3 border-none bg-none'>Chọn tất cả</button>
          <button className='mx-3 border-none bg-none'>Xóa</button>
          <div className='ml-auto flex items-center'>
            <div>
              <div className='flex items-center justify-end'>
                <p>Tổng thanh toán</p>
                <p className='ml-2 text-2xl text-orange-500'>138000</p>
              </div>
              <div className='flex items-center justify-end text-sm'>
                <div className='text-gray-500'>Tiết kiệm</div>
                <p className='ml-6 text-orange-500'>138000</p>
              </div>
            </div>
            <Button className='flex ml-4 h-10 w-52 items-center justify-center bg-red-500 text-sm uppercase text-white hover:bg-red-600'>
              Mua hàng
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
