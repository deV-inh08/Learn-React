import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { path } from '../../../../constants/path'
import { AppContext } from '../../../../contexts/app.context'
import { getAvatarName } from '../../../../utils/uitls'
const UserSideNav = () => {
  const { profile } = useContext(AppContext)
  return (
    <div>
      <div className='flex items-center border-b border-gray-200 py-4'>
        <Link to={path.profile} className='h-12 w-12 shrink-0 overflow-hidden rounded-full border border-black/10'>
          <img src={getAvatarName(profile?.avatar)} alt='' className='h-full w-full object-cover' />
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
