import Popover from '../Popover'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { AppContext } from '../../contexts/app.context'
import { path } from '../../constants/path'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import authApi from '../../apis/auth.apis'
import { PurchasesStatus } from '../../constants/purchase'
import { useContext } from 'react'
import { getAvatarName } from '../../utils/uitls'
import { localeLngs } from '../../i18n/i18n'

const NavHeader = () => {
  const { i18n } = useTranslation()
  const currentLng = localeLngs[i18n.language as keyof typeof localeLngs]
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

  const changeLanguages = (languages: 'en' | 'vi') => {
    i18n.changeLanguage(languages)
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
            <span className='mx-1'>{currentLng}</span>
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
            <p className='py-2 px-3 hover:text-orange-500' onClick={() => changeLanguages('vi')}>Tiếng Việt</p>
            <p className='py-2 px-3 hover:text-orange-500' onClick={() => changeLanguages('en')}>English</p>
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
                        src={getAvatarName(profile?.avatar)}
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
