import Popover from '../Popover'
import { Link } from 'react-router-dom'
import { AppContext } from '../../contexts/app.context'
import { path } from '../../constants/path'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import authApi from '../../apis/auth.apis'
import { PurchasesStatus } from '../../constants/purchase'
import { useContext } from 'react'

const NavHeader = () => {
  const { isAuthenticated, profile, setIsAuthenticated, setProfile } = useContext(AppContext)
  const queryClient = useQueryClient()
  const logoutMutation = useMutation({
    mutationFn: authApi.logoutAccount,
    onSuccess: () => {
      // set isAuthenticated = false && setProfile = null
      setIsAuthenticated(false)
      setProfile(null)
      queryClient.removeQueries({ queryKey: ['purchases', { status: PurchasesStatus.inCart }] })
    }
  })

  const handleLogout = () => {
    logoutMutation.mutate()
  }

  return (
    <div className='flex justify-end text-white'>
      <Popover
        className='flex items-center py-1 hover:text-gray-300 cursor-pointer relative'
        children={
          <>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-5 h-5'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418'
              />
            </svg>
            <span className='mx-1'>Tiếng Việt</span>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='size-6'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='m19.5 8.25-7.5 7.5-7.5-7.5' />
            </svg>
          </>
        }
        renderPopover={
          <div className='flex flex-col pr-25 pl-3'>
            <p className='py-2 px-3 hover:text-orange-500'>Tiếng Việt</p>
            <p className='py-2 px-3 hover:text-orange-500'>English</p>
          </div>
        }
      ></Popover>
      <div className='flex items-center py-1 cursor-pointer ml-6'>
        {isAuthenticated && (
          <Popover
            className='flex items-center py-1 hover:text-gray-300 cursor-pointer ml-6'
            renderPopover={
              <div>
                <Link to={path.profile} className='block py-2 px-3 hover:bg-slate-100 bg-white hover:text-cyan-500'>
                  Tài khoản của tôi
                </Link>
                <Link to='/' className='block py-2 px-3 hover:bg-slate-100 bg-white hover:text-cyan-500'>
                  Đơn mua
                </Link>
                <button
                  onClick={handleLogout}
                  className='block py-2 px-3 hover:bg-slate-100 bg-white hover:text-cyan-500'
                >
                  Đăng xuất
                </button>
              </div>
            }
            children={
              <>
                {isAuthenticated && (
                  <>
                    <div className='w-5 h-5 mr-2 shrink-0'>
                      <img
                        src={
                          profile?.avatar ||
                          'data:image/png;base64,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'
                        }
                        alt='avartar_user'
                        className='w-full h-full object-cover rounded-full'
                      />
                    </div>
                    <p>{profile?.email.split('@')[0]}</p>
                  </>
                )}
              </>
            }
          ></Popover>
        )}
        {!isAuthenticated && (
          <div className='flex gap-x-3 items-center'>
            <Link className='hover:text-gray-300' to={path.register}>
              Đăng kí
            </Link>
            <span className='w-[1px] h-4 bg-gray-300'></span>
            <Link className='hover:text-gray-300' to={path.login}>
              Đăng nhập
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default NavHeader
