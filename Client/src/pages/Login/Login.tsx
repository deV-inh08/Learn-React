import { Link } from 'react-router-dom'

const Login = () => {
  
  return (
    <div className='bg-orange-600'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='grid grid-cols-1 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form action='' className='p-10 rounded bg-white shadow-sm my-10'>
              <p className='text-2xl'>Đăng nhập</p>
              <div className='mt-5'>
                <input
                  type='email'
                  name='email'
                  placeholder='Enter your email'
                  className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                />
                <p className='mt-1 text-red-600 min-h-[1rem] text-sm'>Emal not valid</p>
              </div>
              <div className='mt-5'>
                <input
                  type='password'
                  name='password'
                  placeholder='Enter your password'
                  className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                />
                <p className='mt-1 text-red-600 min-h-[1rem] text-sm'>Emal not valid</p>
              </div>
              <div className='mt-5'>
                <button type='submit' className='w-full bg-orange-600 text-white text-center py-4'>Đăng nhập</button>
              </div>
              <div className='mt-8 text-center'>
                <div className='flex items-center justify-center gap-3'>
                  <span className='text-gray-400'>Bạn chưa có tài khoản?</span>
                  <Link to='/register' className='text-orange-600'>Đăng kí</Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Login
