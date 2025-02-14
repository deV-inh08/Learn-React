import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { getRules } from '../../utils/rules'
import Input from '../../components/Input'

export interface FormData {
  email: string
  password: string
  confirm_password: string
}

const Register = () => {
  const {
    register,
    watch,
    getValues,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>()

  const rules = getRules(getValues)

  const onSubmit = handleSubmit((data) => {
    console.log(data)
  })

  const formValues = watch()
  console.log(formValues)

  return (
    <div className='bg-orange-600'>
      <div className='container-custom'>
        <div className='grid grid-cols-1 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form action='' className='p-10 rounded bg-white shadow-sm my-10' onSubmit={onSubmit} noValidate>
              <p className='text-2xl'>Đăng kí</p>
              {/* <div className='my-3 h-[4rem]'>
                <input
                  type='email'
                  // name='email' => overWrite
                  placeholder='Enter your email'
                  className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                  {...register('email', rules.email)}
                />
                <p className='mt-1 text-red-600 max-h-[15px] text-sm'>{errors.email?.message}</p>
              </div> */}
              <Input
                name='email'
                type='email'
                errorMessage={errors.email?.message}
                placeholder='Enter your email'
                rules={rules.email}
                register={register}
              ></Input>
             <Input
                name='password'
                type='password'
                errorMessage={errors.password?.message}
                placeholder='Enter your passsword'
                rules={rules.password}
                register={register}
              ></Input>
              {/* <div className='my-3 h-[4rem]'>
                <input
                  type='password'
                  // name='password' => overwrite with react-hook-form when 'register' return
                  placeholder='Confirm your password'
                  className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                  {...register('confirm_password', {
                    ...rules.confirm_password
                    // validate confirm password
                    // validate: (value) => value === getValues('password') || 'Confirm password không khớp'
                  })}
                />
                <p className='mt-1 text-red-600 max-h-[15px] text-sm'>{errors.confirm_password?.message}</p>
              </div> */}

              <Input
                name='confirm_password'
                type='password'
                errorMessage={errors.confirm_password?.message}
                placeholder='Enter your confirm passsword'
                rules={rules.confirm_password}
                register={register}
              ></Input>

              <div className='mt-5'>
                <button type='submit' className='w-full bg-orange-600 text-white text-xl py-3 text-center'>
                  Đăng kí
                </button>
              </div>
              <div className='mt-8 text-center'>
                <div className='flex items-center justify-center gap-3'>
                  <span className='text-gray-400'>Bạn đã có tài khoản?</span>
                  <Link to='/login' className='text-orange-600'>
                    Đăng nhập
                  </Link>
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
