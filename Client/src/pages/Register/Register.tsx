import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { rules } from '../../utils/rules'

export interface FormData {
  email: string
  password: string
  confirm_password: string
}

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>()

  const onSubmit = handleSubmit((data) => {
    console.log(data)
  })

  return (
    <div className='bg-orange-600'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='grid grid-cols-1 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form action='' className='p-10 rounded bg-white shadow-sm my-10' onSubmit={onSubmit}>
              <p className='text-2xl'>Đăng kí</p>
              <div className='my-3 h-[4rem]'>
                <input
                  type='email'
                  // name='email' => overWrite
                  placeholder='Enter your email'
                  className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                  {...register('email', rules.email)}
                />
                <p className='mt-1 text-red-600 max-h-[15px] text-sm'>{errors.email?.message}</p>
              </div>
              <div className='my-3 h-[4rem]'>
                <input
                  type='password'
                  // name='password' => overwrite with react-hook-form when 'register' return
                  placeholder='Enter your password'
                  className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                  {...register('password', rules.password)}
                />
                <p className='mt-1 text-red-600 max-h-[15px] text-sm'>{errors.password?.message}</p>
              </div>
              <div className='my-3 h-[4rem]'>
                <input
                  type='password'
                  // name='password' => overwrite with react-hook-form when 'register' return
                  placeholder='Confirm your password'
                  className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                  {...register('confirm_password')}
                />
                <p className='mt-1 text-red-600 max-h-[15px] text-sm'>{errors.confirm_password?.message}</p>
              </div>

              <div className='mt-5'>
                <button type='submit' className='w-full bg-orange-600 text-white text-xl py-3 text-center'>
                  Đăng kí
                </button>
              </div>
              <div className='mt-8 text-center'>
                <div className='flex items-center justify-center gap-3'>
                  <span className='text-gray-400'>Bạn đã có tài khoản?</span>
                  <Link to='/login' className='text-orange-600'>Đăng nhập</Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
