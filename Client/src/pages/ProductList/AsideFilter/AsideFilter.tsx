import React from 'react'
import { Link } from 'react-router-dom'
import { path } from '../../../constants/path'
import Input from '../../../components/Input'
import Button from '../../../components/Button'

const AsideFilter = () => {
  return (
    <div className='py-4'>
      <Link to={path.home} className='flex items-center font-bold'>
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
        <li className='py-2 pl-2'>
          <Link to={path.home} className='relative px-2 text-orange-500 font-semibold'>
            <svg viewBox='0 0 4 7' className='w-3 h-3 fill-bg-logo absolute top-1 left-[-10px]'>
              <polygon points='4 3.5 0 0 0 7'></polygon>
            </svg>
            Thời trang nam
          </Link>
        </li>
        <li className='py-2 pl-2'>
          <Link to={path.home} className='relative px-2'>
            Điện thoại
          </Link>
        </li>
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
        <form action='' className='mt-2'>
          <div className='flex items-start'>
            <Input
              type='text'
              className='grow h-[2rem]'
              name='from'
              placeholder='đ Từ'
              classNameInput='p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
            />
            <div className='mx-2 mt-2 shrink-0'>-</div>
            <Input
              type='text'
              className='grow'
              name='to'
              placeholder='đ Đến'
              classNameInput='p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
            />
          </div>
          <Button className='w-full p-2 uppercase bg-orange-500 text-white text-sm hover:bg-orange-500/70 flex justify-center items-center'>
            Áp dụng
          </Button>
        </form>
      </div>
      <div className='bg-gray-500 h-[1px] my-4'></div>
      <p className='text-sm'>Đánh giá</p>
      <ul className='my-3'>
        <li className='py-1 pl-2 flex items-center'>
          <Link to={path.home} className='flex items-center text-sm'>
            {Array(5)
              .fill(0)
              .map((_, index) => {
                return (
                  //   <svg viewBox='0 0 30 30' className='mr-1 h-4 w-4' key={index}>
                  //   <defs>
                  //     <linearGradient id='star__hollow' x1='50%' x2='50%' y1='0%' y2='99.0177926%'>
                  //       <stop offset='0%' stopColor='#FFD211' />
                  //       <stop offset='100%' stopColor='#FFAD27' />
                  //     </linearGradient>
                  //   </defs>
                  //   <path
                  //     fill='none'
                  //     fillRule='evenodd'
                  //     stroke='url(#star__hollow)'
                  //     strokeWidth={2}
                  //     d='M23.226809 28.390899l-1.543364-9.5505903 6.600997-6.8291523-9.116272-1.4059447-4.01304-8.63019038-4.013041 8.63019038-9.116271 1.4059447 6.600997 6.8291523-1.543364 9.5505903 8.071679-4.5038874 8.071679 4.5038874z'
                  //   />
                  // </svg>
                  <svg viewBox='0 0 9.5 8' className='mr-1 h-4 w-4' key={index}>
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
                )
              })}
          </Link>
          <span className='text-sm text-gray-600 ml-3'>Trở lên</span>
        </li>
        <li className='py-1 pl-2 flex items-center'>
          <Link to={path.home} className='flex items-center text-sm'>
            {Array(5)
              .fill(0)
              .map((_, index) => {
                return (
                  //   <svg viewBox='0 0 30 30' className='mr-1 h-4 w-4' key={index}>
                  //   <defs>
                  //     <linearGradient id='star__hollow' x1='50%' x2='50%' y1='0%' y2='99.0177926%'>
                  //       <stop offset='0%' stopColor='#FFD211' />
                  //       <stop offset='100%' stopColor='#FFAD27' />
                  //     </linearGradient>
                  //   </defs>
                  //   <path
                  //     fill='none'
                  //     fillRule='evenodd'
                  //     stroke='url(#star__hollow)'
                  //     strokeWidth={2}
                  //     d='M23.226809 28.390899l-1.543364-9.5505903 6.600997-6.8291523-9.116272-1.4059447-4.01304-8.63019038-4.013041 8.63019038-9.116271 1.4059447 6.600997 6.8291523-1.543364 9.5505903 8.071679-4.5038874 8.071679 4.5038874z'
                  //   />
                  // </svg>
                  <svg viewBox='0 0 9.5 8' className='mr-1 h-4 w-4' key={index}>
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
                )
              })}
          </Link>
          <span className='text-sm text-gray-600 ml-3'>Trở lên</span>
        </li>
      </ul>
      <div className='bg-gray-500 h-[1px] my-4'></div>
      <Button className='w-full py-2 px-2 uppercase bg-orange-600 text-white text-sm '>Xóa tất cả</Button>
    </div>
  )
}

export default AsideFilter
