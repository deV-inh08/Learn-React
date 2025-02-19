import { Link } from 'react-router-dom'
import { path } from '../../../constants/path'

const Product = () => {
  return (
    <Link to={path.home}>
      <div className='bg-white shadow rounded-sm hover:translate-y-[-0.0625rem] hover:shadow-md duration-100 transition-transform'>
        <div className='w-full pt-[100%] relative'>
          <img
            src='https://down-vn.img.susercontent.com/file/sg-11134201-22110-haqancm9ebkvdc'
            alt='product'
            className='absolute top-0 left-0 bg-white w-full h-full object-cover'
          />
        </div>
        <div className='p-2 overflow-hidden'>
          <p className='min-h-[1.75rem] line-clamp-2 text-sm'>
            Máy tính bảng vẽ đồ họa vẽ máy tính bảng vui nhộn Xppen Deco với áp suất cấp 8192 cho trò chơi & vẽ & Osu
          </p>
          <div className='flex items-center mt-3'>
            <p className='line-through max-w-[50%] text-gray-500 truncate'>₫650.000</p>
            <p className='text-orange-500 truncate ml-1'>
              <span className='text-xs'>₫</span>
              <span>419.000</span>
            </p>
          </div>
          <div className='mt-3 flex items-center justify-end'>
            <div className='flex items-center justify-center h-5 w-5'>
              <div className='relative w-full h-full'>
                <div className='absolute top-0 left-0 h-full w-full overflow-hidden' style={{ width: '50%' }}>
                  <svg viewBox='0 0 9.5 8' className='mr-1 h-3 w-3'>
                    <defs>
                      <linearGradient id='ratingStarGradient' x1='50%' x2='50%' y1='0%' y2='100%'>
                        <stop offset={0} stopColor='#ffca11' />
                        <stop offset={1} stopColor='#ffad27' />
                      </linearGradient>
                      <polygon
                        id='ratingStar'
                        points='14.910357 6.35294118 12.4209136 7.66171903 12.896355 4.88968305 10.8823529 2.92651626 13.6656353 2.52208166 14.910357 0 16.1550787 2.52208166 18.9383611 2.92651626 16.924359 4.88968305 17.3998004 7.66171903'
                      />
                    </defs>
                    <g fill='url(#ratingStarGradient)' fillRule='evenodd' stroke='none' strokeWidth={1}>
                      <g transform='translate(-876 -1270)'>
                        <g transform='translate(155 992)'>
                          <g transform='translate(600 29)'>
                            <g transform='translate(10 239)'>
                              <g transform='translate(101 10)'>
                                <use stroke='#ffa727' strokeWidth='.5' xlinkHref='#ratingStar' />
                              </g>
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                </div>
              </div>
            </div>
            <div className='ml-2 text-sm'>
              <p>5.66k</p>
              <p className=''></p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Product
