import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link } from 'react-router-dom'
import { omit } from 'lodash'
import { getRules, schema, Schema as SchemaType } from '../../utils/rules'
import Input from '../../components/Input'
import { registerAccount } from '../../apis/auth.apis.ts'
import { isAxiosUnprocessableEntityError } from '../../utils/uitls.ts'
import { ResponseApi } from '../../types/util.type.ts'

export type FormData = SchemaType

const Register = () => {
  const {
    register,
    getValues,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  const rules = getRules(getValues)

  const registerMutation = useMutation({
    // mutaion: Handle Call API
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => registerAccount(body)
  })

  const onSubmit = handleSubmit((data) => {
    const body = { ...omit(data, ['confirm_password']) }
    registerMutation.mutate(body, {
      // When Success and Error
      onSuccess: (data) => {
        if (isAxiosUnprocessableEntityError<ResponseApi<Omit<FormData, 'confirm_password'>>>(data)) {
          const formError = data.response?.data.data
          if (formError?.email) {
            setError('email', {
              message: formError.email,
              type: 'Server'
            })
          }
          if (formError?.password) {
            setError('password', {
              message: formError.password,
              type: 'Server'
            })
          }
        } else {
          console.log(data)
        }
      }
      // When Error
      // onError: (error) => {
      //   // Form Error is { message: string, Data: { email: string; password: string } }
      //   if (isAxiosUnprocessableEntityError<ResponseApi<Omit<FormData, 'confirm_password'>>>(error)) {
      //     const formError = error.response?.data.data
      //     if (formError?.email) {
      //       setError('email', {
      //         message: formError.email,
      //         type: 'Server'
      //       })
      //     }
      //     if (formError?.password) {
      //       setError('password', {
      //         message: formError.password,
      //         type: 'Server'
      //       })
      //     }
      //     // Method 2
      //     // if (formError) {
      //     //   Object.keys(formError).forEach((key) => {
      //     //     setError(key as keyof Omit<FormData, 'confirm_password'>, {
      //     //       message: formError[key as keyof Omit<FormData, 'confirm_password'>],
      //     //       type: 'Server'
      //     //     })
      //     //   })
      //     // }
      //   }
      // }
    })
  })
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
                rules={rules.confirm_password} // If have Schema => Don't need rules
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
