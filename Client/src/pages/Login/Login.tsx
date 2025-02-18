import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { omit } from 'lodash'
import { loginAccount } from '../../apis/auth.apis'
import { FormData } from '../Register/Register'
import Input from '../../components/Input'
import { getRules } from '../../utils/rules'
import { isAxiosUnprocessableEntityError } from '../../utils/uitls'
import { ErrorResponse } from '../../types/util.type'
import { useContext } from 'react'
import { AppContext } from '../../contexts/app.context'
import Button from '../../components/Button'

const Login = () => {
  const { setIsAuthenticated } = useContext(AppContext)
  const navigate = useNavigate()
  const {
    register,
    getValues,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>()

  // rules with react hook form
  const rules = getRules(getValues)

  // create mutaion with React query
  const loginMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => loginAccount(body)
  })

  const onSubmit = handleSubmit((data: Omit<FormData, 'confirm_password'>) => {
    const body = omit(data, 'confirm_password')
    loginMutation.mutate(body, {
      onSuccess: (data) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse<Omit<FormData, 'confirm_password'>>>(data)) {
          const formError = data.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof Omit<FormData, 'confirm_password'>, {
                message: formError[key as keyof Omit<FormData, 'confirm_password'>],
                type: 'Server'
              })
            })
          }
        } else {
          setIsAuthenticated(true)
          navigate('/')
        }
      }
    })
  })
  return (
    <div className='bg-orange-600'>
      <div className='container-custom'>
        <div className='grid grid-cols-1 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form onSubmit={onSubmit} className='p-10 rounded bg-white shadow-sm my-10'>
              <p className='text-2xl'>Đăng nhập</p>
              {/* <div className='mt-5'>
                <input
                  type='email'
                  name='email'
                  placeholder='Enter your email'
                  className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                />
                <p className='mt-1 text-red-600 min-h-[1rem] text-sm'>Emal not valid</p>
              </div> */}
              <Input
                name='email'
                type='email'
                placeholder='Enter your email'
                errorMessage={errors.email?.message}
                register={register}
                className='mt-5'
                rules={rules.email}
              ></Input>
              <Input
                name='password'
                type='password'
                register={register}
                errorMessage={errors.password?.message}
                placeholder='Enter your password'
                className='mt-5'
                autoComplete='on'
                rules={rules.password}
              ></Input>
              <div className='mt-5'>
                <Button
                  type='submit'
                  className='flex items-center justify-center w-full py-4 px-2 bg-orange-600 text-white text-center' 
                  isLoading={loginMutation.isPending}
                  disabled={loginMutation.isPending}
                >
                  Đăng nhập
                </Button>
                {/* <button type='submit' className='w-full bg-orange-600 text-white text-center py-4'>
                  Đăng nhập
                </button> */}
              </div>
              <div className='mt-8 text-center'>
                <div className='flex items-center justify-center gap-3'>
                  <span className='text-gray-400'>Bạn chưa có tài khoản?</span>
                  <Link to='/register' className='text-orange-600'>
                    Đăng kí
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
export default Login
