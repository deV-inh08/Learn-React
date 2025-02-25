import { createSearchParams, Link, useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import classNames from 'classnames'
import { priceSchema, Schema } from '../../../../utils/rules'
import { path } from '../../../../constants/path'
import Button from '../../../../components/Button'
import { QueryConfig } from '../../ProductList'
import { Category } from '../../../../types/category.type'
import InputNumber from '../../../../components/InputNumber'
import { yupResolver } from '@hookform/resolvers/yup'
import { NoUndefinedField } from '../../../../types/util.type'
import RatingStart from '../RatingStar'
import { omit } from 'lodash'

interface Props {
  queryConfig: QueryConfig
  categories: Category[]
}

// type FormDataPrice = Omit<yup.InferType<typeof schema>, 'email' | 'password' | 'confirm_password'>
// or, you can use Pick
type FormDataPrice = NoUndefinedField<Pick<Schema, 'price_min' | 'price_max'>>

const AsideFilter = ({ categories, queryConfig }: Props) => {
  const { category } = queryConfig
  const {
    control,
    handleSubmit,
    watch,
    trigger,
    formState: { errors }
  } = useForm<FormDataPrice>({
    defaultValues: {
      price_min: '',
      price_max: ''
    },
    resolver: yupResolver(priceSchema),
    shouldFocusError: false
  })
  const navigate = useNavigate()
  const valueForm = watch()
  console.log(valueForm)
  const handleSubmitPrice = handleSubmit((data) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        price_max: data.price_max,
        price_min: data.price_min
      }).toString()
    })
  })

  const handleRemoveAll = () => {
    navigate({
      pathname: path.home,
      search: createSearchParams(omit(queryConfig, ['price_min', 'price_max', 'rating_filter', 'category'])).toString()
    })
  }
  return (
    <div className='py-4'>
      <Link
        to={path.home}
        className={classNames('flex items-center font-bold', {
          'text-orange-600': !category
        })}
      >
        <svg viewBox='0 0 12 10' className='w-3 h-4 mr-3 fill-current'>
          <g fill-rule='evenodd' stroke='none' stroke-width='1'>
            <g transform='translate(-373 -208)'>
              <g transform='translate(155 191)'>
                <g transform='translate(218 17)'>
                  <path d='m0 2h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z'></path>
                  <path d='m0 6h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z'></path>
                  <path d='m0 10h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z'></path>
                </g>
              </g>
            </g>
          </g>
        </svg>
        Tất cả sản phẩm
      </Link>
      <div className='bg-gray-300 h-[1px] my-4'></div>
      <ul>
        {categories.map((categoryItem) => {
          const isActive = category === categoryItem._id
          return (
            <li className='py-2 pl-2'>
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({
                    ...queryConfig,
                    category: categoryItem._id
                  }).toString()
                }}
                className={classNames('relative px-2', {
                  'text-orange-500 font-semibold': isActive
                })}
              >
                {isActive && (
                  <svg viewBox='0 0 4 7' className='w-3 h-3 fill-bg-logo absolute top-1 left-[-10px]'>
                    <polygon points='4 3.5 0 0 0 7'></polygon>
                  </svg>
                )}
                {categoryItem.name}
              </Link>
            </li>
          )
        })}
      </ul>
      <Link to={path.home} className='flex items-center font-bold mt-4 uppercase'>
        <svg enable-background='new 0 0 15 15' viewBox='0 0 15 15' x='0' y='0' className='w-3 h-4 stroke-current'>
          <g>
            <polyline
              fill='none'
              points='5.5 13.2 5.5 5.8 1.5 1.2 13.5 1.2 9.5 5.8 9.5 10.2'
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-miterlimit='10'
            ></polyline>
          </g>
        </svg>
        <span className='ml-2'>Bộ lọc tìm kiếm</span>
      </Link>
      <div className='bg-gray-500 h-[1px] my-4'></div>
      <div className='mt-2'>
        <p>Khoản giá</p>
        <form action='' className='mt-2' onSubmit={handleSubmitPrice}>
          <div className='flex items-start'>
            <Controller
              control={control}
              name='price_min'
              render={({ field }) => {
                return (
                  <InputNumber
                    classNameInput='p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                    type='text'
                    className='grow h-[2rem]'
                    name='from'
                    classNameError='hidden'
                    placeholder='đ Từ'
                    onChange={(event) => {
                      field.onChange(event)
                      trigger('price_max')
                    }}
                    value={field.value}
                    ref={field.ref}
                  ></InputNumber>
                )
              }}
            ></Controller>
            <div className='mx-2 mt-2 shrink-0'>-</div>
            <Controller
              control={control}
              name='price_max'
              render={({ field }) => {
                return (
                  <InputNumber
                    classNameInput='p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                    type='text'
                    className='grow h-[2rem]'
                    name='to'
                    classNameError='hidden'
                    placeholder='đ Đến'
                    onChange={(event) => {
                      field.onChange(event)
                      trigger('price_min')
                    }}
                    value={field.value}
                    ref={field.ref}
                  ></InputNumber>
                )
              }}
            ></Controller>
          </div>
          <p className='mt-1 text-red-600 max-h-[15px] text-sm text-center'>{errors.price_min?.message}</p>
          <Button className='w-full p-2 uppercase bg-orange-500 text-white text-sm hover:bg-orange-500/70 flex justify-center items-center mt-3 cursor-pointer'>
            Áp dụng
          </Button>
        </form>
      </div>
      <div className='bg-gray-500 h-[1px] my-4'></div>
      <p className='text-sm'>Đánh giá</p>
      <RatingStart queryConfig={queryConfig}></RatingStart>
      <div className='bg-gray-500 h-[1px] my-4'></div>
      <Button
        onClick={handleRemoveAll}
        className='w-full p-2 uppercase bg-orange-500 text-white text-sm hover:bg-orange-500/70 flex justify-center items-center mt-3 cursor-pointer'>
        Xóa tất cả
      </Button>
    </div>
  )
}

export default AsideFilter
