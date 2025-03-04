import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { path } from '../../../../constants/path'
import { AppContext } from '../../../../contexts/app.context'
const UserSideNav = () => {
  const { profile } = useContext(AppContext)
  return (
    <div>
      <div className='flex items-center border-b border-gray-200 py-4'>
        <Link to={path.profile} className='h-12 w-12 shrink-0 overflow-hidden rounded-full border border-black/10'>
          <img
            src={
              profile?.avatar ||
              'data:image/png;base64,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'
            }
            alt=''
            className='h-full w-full object-cover'
          />
        </Link>
        <div className='flex-grow pl-4'>
          <div className='mb-1 truncate font-semibold text-gray-600'>{profile?.name}</div>
          <Link to={path.profile} className='flex items-center capitalize text-gray-500'>
            <svg width='12' height='12' viewBox='0 0 12 12' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M8.54 0L6.987 1.56l3.46 3.48L12 3.48M0 8.52l.073 3.428L3.46 12l6.21-6.18-3.46-3.48'
                fill='#9B9B9B'
                fill-rule='evenodd'
              ></path>
            </svg>
            <p className='ml-1'>Sửa hồ sơ</p>
          </Link>
        </div>
      </div>
      <div className='mt-7'>
        <Link to={path.profile} className='flex items-center capitalize text-orange-600 transition-colors'>
          <div className='mr-3 h-[22px] w-[22px]'>
            <img alt='icon' src='https://down-vn.img.susercontent.com/file/ba61750a46794d8847c3f463c5e71cc4' />
          </div>
          <p className='text-gray-600'>Tài khoản của tôi</p>
        </Link>
        <Link to={path.profile} className='flex items-center mt-6 capitalize text-orange-600 transition-colors'>
          <div className='mr-3 h-[22px] w-[22px]'>
            <img alt='icon' src='https://down-vn.img.susercontent.com/file/ba61750a46794d8847c3f463c5e71cc4' />
          </div>
          <p className='text-gray-600'>Đổi mật khẩu</p>
        </Link>
        <Link to={path.histotyPurchase} className='flex items-center mt-6 capitalize text-orange-600 transition-colors'>
          <div className='mr-3 h-[22px] w-[22px]'>
            <img src='https://down-vn.img.susercontent.com/file/f0049e9df4e536bc3e7f140d071e9078' />
          </div>
          <p className='text-gray-600'>Đơn mua</p>
        </Link>
      </div>
    </div>
  )
}

export default UserSideNav
