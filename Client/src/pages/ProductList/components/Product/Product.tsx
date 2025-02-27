import { Link } from 'react-router-dom'
import { path } from '../../../../constants/path'
import { Product as ProductType } from '../../../../types/product.type'
import { formatCurrency, formatNumberToSocialStyle, generateNameId } from '../../../../utils/uitls'
import ProductRating from '../../../../components/ProductRating'

interface Props {
  product: ProductType
}

const Product = ({ product }: Props) => {
  return (
    <Link to={`${path.home}${generateNameId({ name: product.name, id: product._id })}`}>
      <div className='bg-white shadow rounded-sm hover:translate-y-[-0.0625rem] hover:shadow-md duration-100 transition-transform'>
        <div className='w-full pt-[100%] relative'>
          <img
            src={product.image}
            alt={product.name}
            className='absolute top-0 left-0 bg-white w-full h-full object-cover'
          />
        </div>
        <div className='p-2 overflow-hidden'>
          <p className='min-h-[1.75rem] line-clamp-2 text-sm'>{product.name}</p>
          <div className='flex items-center mt-3'>
            <p className='line-through max-w-[50%] text-gray-500 truncate'>{product.price_before_discount}</p>
            <p className='text-orange-500 truncate ml-1'>
              <span className='text-xs'>₫</span>
              <span>{formatCurrency(product.price)}</span>
            </p>
          </div>
          <div className='mt-3 flex items-center justify-end'>
            <ProductRating rating={product.rating}></ProductRating>
            <div className='flex gap-x-1 text-sm'>
              <p>{formatNumberToSocialStyle(product.sold)}</p>
              <p className=''>Đã bán</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Product
