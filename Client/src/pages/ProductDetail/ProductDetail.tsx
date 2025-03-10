import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import DOMPurify from 'dompurify'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { htmlToText } from 'html-to-text'
import productApi from '../../apis/product.api'
import ProductRating from '../../components/ProductRating'
import { formatCurrency, formatNumberToSocialStyle, getIdFromNameId, rateSale } from '../../utils/uitls'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Product as ProductType, ProductListConfig } from '../../types/product.type'
import Product from '../ProductList/components/Product'
import QuantityController from '../../components/QuantityController'
import purchaseApi from '../../apis/purchase.api'
import { PurchasesStatus } from '../../constants/purchase'
import { toast } from 'react-toastify'
import { path } from '../../constants/path'

const ProductDetail = () => {
  const { t } = useTranslation(['product'])
  const [buyCount, setBuyCount] = useState<number>(1)
  const [currentIndexImages, setCurrentIndexNumber] = useState([0, 5])
  const [activeImageSlider, setActiveImageSlider] = useState('')
  const imgRef = useRef<HTMLImageElement>(null)
  // get queryClient by useQueryClient
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { nameId } = useParams()
  const id = getIdFromNameId(nameId as string)

  const { data } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productApi.getProductDetail(id as string)
  })
  const product = data?.data.data

  const queryConfig: ProductListConfig = { limit: 20, page: 1, category: product?.category._id }
  const { data: productsData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getProducts(queryConfig)
    },
    enabled: Boolean(product),
    staleTime: 3 * 60 * 1000
  })

  const addToCartMutation = useMutation({
    mutationFn: (body: { product_id: string; buy_count: number }) => purchaseApi.addToCart(body)
  })

  const buyNow = async () => {
    const res = await addToCartMutation.mutateAsync(
      {
        buy_count: buyCount,
        product_id: product?._id as string
      },
      {
        onSuccess: (data) => {
          toast.success(data.data.message, { autoClose: 1000 })
          queryClient.invalidateQueries({ queryKey: ['purchases', { status: PurchasesStatus.inCart }] })
        }
      }
    )
    const purchase = res.data.data
    navigate(path.cart, {
      state: {
        purchaseId: purchase._id
      }
    })
  }

  const handleBuyCount = (value: number) => {
    setBuyCount(value)
  }

  useEffect(() => {
    if (product && product.images.length > 0) {
      setActiveImageSlider(product.images[0])
    }
  }, [product])

  const currentImages = useMemo(() => {
    return product ? product.images.slice(...currentIndexImages) : []
  }, [product, currentIndexImages])

  const chooseActiveSlider = (img: string) => {
    setActiveImageSlider(img)
  }

  const nextSlider = () => {
    if (currentIndexImages[1] < (product as ProductType).images.length) {
      setCurrentIndexNumber([currentIndexImages[0] + 1, currentIndexImages[1] + 1])
    }
  }

  const previousSlider = () => {
    if (currentIndexImages[0] > 0) {
      setCurrentIndexNumber([currentIndexImages[0] - 1, currentIndexImages[1] - 1])
    }
  }

  const handleZoom = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // get coordinates
    const rect = e.currentTarget.getBoundingClientRect()
    const image = imgRef.current as HTMLImageElement
    const { naturalWidth, naturalHeight } = image
    const { offsetX, offsetY } = e.nativeEvent
    const top = offsetY * (1 - naturalHeight / rect.height)
    const left = offsetX * (1 - naturalWidth / rect.height)
    image.style.width = naturalWidth + 'px'
    image.style.height = naturalHeight + 'px'
    image.style.maxWidth = 'unset'
    image.style.top = top + 'px'
    image.style.left = left + 'px'
  }

  const handleRemoveZoom = () => {
    imgRef.current?.removeAttribute('style')
  }

  const addToCart = () => {
    addToCartMutation.mutate(
      { buy_count: buyCount, product_id: product?._id as string },
      {
        onSuccess: (data) => {
          toast.success(data.data.message, { autoClose: 1000 })
          queryClient.invalidateQueries({ queryKey: ['purchases', { status: PurchasesStatus.inCart }] })
        }
      }
    )
  }
  return (
    <div className='bg-gray-200 py-6'>
      {product && (
        <>
          <Helmet>
            <title>{product.name} | Shopee Clone</title>
            <meta name='description' content={htmlToText(product.description)}></meta>
          </Helmet>
          <div className='bg-white p-4 shadow'>
            <div className='container-custom'>
              <div className='grid grid-cols-12 gap-9'>
                <div className='col-span-5'>
                  <div
                    className='relative w-full pt-[100%] shadow overflow-hidden'
                    onMouseMove={handleZoom}
                    onMouseLeave={handleRemoveZoom}
                  >
                    <img
                      className='absolute top-0 left-0 pointer-events-none h-full w-full bg-white object-cover'
                      src={activeImageSlider}
                      alt={product?.name}
                      ref={imgRef}
                    />
                  </div>
                  <div className='relative mt-4 grid grid-cols-5 gap-1'>
                    <button
                      className='absolute left-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'
                      onClick={previousSlider}
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke-width='1.5'
                        stroke='currentColor'
                        className='w-5 h-5'
                      >
                        <path stroke-linecap='round' stroke-linejoin='round' d='M15.75 19.5 8.25 12l7.5-7.5' />
                      </svg>
                    </button>
                    {/* slice don't count last number */}
                    {currentImages.slice(0, 5).map((product, index) => {
                      const isActive = product === activeImageSlider
                      return (
                        <div
                          className='relative w-full pt-[100%]'
                          key={index}
                          onClick={() => chooseActiveSlider(product)}
                        >
                          <img
                            src={product}
                            alt='product'
                            className='absolute top-0 left-0 h-full w-full cursor-pointer bg-white object-cover'
                          />
                          {isActive && <span className='absolute inset-0 border-2 border-orange-500'></span>}
                        </div>
                      )
                    })}
                    <button
                      className='absolute right-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'
                      onClick={nextSlider}
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke-width='1.5'
                        stroke='currentColor'
                        className='w-5 h-5'
                      >
                        <path stroke-linecap='round' stroke-linejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className='col-span-7'>
                  <h1 className='text-xl font-medium uppercase'>{product?.name}</h1>
                  <div className='mt-8 flex items-center'>
                    <div className='flex items-center'>
                      <span className='mr-1 border-b border-b-orange text-orange-500'>{product?.rating}</span>
                      <ProductRating
                        rating={product.rating}
                        activeClassName='fill-orange-600 text-orange h-4 w-4'
                        nonActiveClassName='fill-gray-300 text-gray-400 h-4 w-4'
                      ></ProductRating>
                    </div>
                    <div className='mx-4 h-4 w-[1px] bg-gray-300'></div>
                    <div className=''>
                      <span>{formatNumberToSocialStyle(product.sold)}</span>
                      <span className='ml-1 text-gray-500'>Đã bán</span>
                    </div>
                  </div>
                  <div className='mt-8 flex items-center bg-gray-50 px-4 py-4'>
                    <p className='text-gray-500 line-through'>đ{formatCurrency(product.price_before_discount)}</p>
                    <p className='ml-3 text-3xl font-medium text-orange-500'>đ{formatCurrency(product.price)}</p>
                    <div className='ml-4 rounded-sm bg-orange-500 px-1 py-[2px] text-xs font-semibold uppercase text-white'>
                      {rateSale(product.price_before_discount, product.price)} giảm
                    </div>
                  </div>
                  <div className='mt-8 flex items-center'>
                    <p className='capitalize text-gray-500'>Số lượng</p>
                    <QuantityController
                      onDecrese={handleBuyCount}
                      onIncrease={handleBuyCount}
                      onType={handleBuyCount}
                      value={buyCount}
                    ></QuantityController>
                    <p className='ml-6 text-sm text-gray-500'>
                      {product.quantity} {t('available')}
                    </p>
                  </div>
                  <div className='mt-8 flex items-center'>
                    <button
                      onClick={addToCart}
                      className='flex h-12 items-center justify-center rounded-sm border border-orange-600 px-5 capitalize text-orange-600 shadow-sm'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke-width='1.5'
                        stroke='currentColor'
                        className='w-5 h-5 mr-[10px]'
                      >
                        <path
                          stroke-linecap='round'
                          stroke-linejoin='round'
                          d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z'
                        />
                      </svg>
                      <p>Thêm vào giỏ hàng</p>
                    </button>
                    <button
                      onClick={buyNow}
                      className='ml-4 flex px-5 h-12 min-w-[5rem] items-center justify-center rounded-sm bg-orange-600 capitalize text-white shadow-sm'
                    >
                      Mua ngay
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='mt-8'>
            <div className=' bg-white p-4 shadow'>
              <div className='container-custom'>
                <div className='rounded bg-gray-50 p-4 text-lg capitalize text-slate-700'>Mô tả sản phẩm</div>
                <div className='mx-4 mt-12 mb-4 text-sm leading-loose'>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(product.description)
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='mt-8'>
            <p className='text-2xl uppercase'>Các sản phẩm liên quan</p>
            <div className='custom-container'>
              {productsData && (
                <div className='mt-6 grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-9 gap-3'>
                  {productsData.data.data.products.map((product) => {
                    return (
                      <div className='col-span-1' key={product._id}>
                        <Product product={product}></Product>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default ProductDetail
