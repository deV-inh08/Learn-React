import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
// import { omit } from 'lodash' //Don't feature tree-shaking => fix ()

// import trực tiếp
import omit from 'lodash/omit'
import authApi from '../../apis/auth.apis.ts'
import { getRules, emailPasswordSchema, SchemaTypeEmail as SchemaType } from '../../utils/rules'
import Input from '../../components/Input'
import { isAxiosUnprocessableEntityError } from '../../utils/uitls.ts'
import { ErrorResponse } from '../../types/util.type.ts'
import { useContext } from 'react'
import { AppContext } from '../../contexts/app.context.tsx'
import Button from '../../components/Button/Button.tsx'
import { path } from '../../constants/path.ts'

export type FormData = SchemaType

const Register = () => {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()
  const {
    register,
    getValues,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(emailPasswordSchema)
  })

  const rules = getRules(getValues)

  const registerMutation = useMutation({
    // mutaion: Handle Call API
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => authApi.registerAccount(body),
    onSuccess: (data) => {
      setIsAuthenticated(true)
      navigate('/')
      setProfile(data.data.data.user)
    }
  })

  const onSubmit = handleSubmit((data) => {
    const body = { ...omit(data, ['confirm_password']) }
    registerMutation.mutate(body, {
      // When Success and Error
      onSuccess: (data) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse<Omit<FormData, 'confirm_password'>>>(data)) {
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
      //   if (isAxiosUnprocessableEntityError<ErrorResponse<Omit<FormData, 'confirm_password'>>>(error)) {
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
      <Helmet>
        <title>Đăng kí | Shopee Clone</title>
        <meta name='description' content='Đăng kí vào dự án Shopee Clone' />
      </Helmet>
      <div className='container-custom'>
        <div className='grid grid-cols-1 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form action='' className='p-10 rounded bg-white shadow-sm my-10' onSubmit={onSubmit} noValidate>
              <p className='text-2xl'>Đăng kí</p>
              <Input
                name='email'
                type='email'
                className='mt-5'
                errorMessage={errors.email?.message}
                placeholder='Enter your email'
                rules={rules.email}
                classNameEye='hidden'
                register={register}
              ></Input>
              <Input
                name='password'
                type='password'
                className='mt-5'
                errorMessage={errors.password?.message}
                placeholder='Enter your passsword'
                rules={rules.password}
                register={register}
                classNameEye='absolute top-3 right-2 size-5 cursor-pointer'
              ></Input>
              <Input
                name='confirm_password'
                type='password'
                className='mt-5'
                classNameEye='absolute top-3 right-2 size-5 cursor-pointer'
                errorMessage={errors.confirm_password?.message}
                placeholder='Enter your confirm passsword'
                rules={rules.confirm_password} // If have Schema => Don't need rules
                register={register}
              ></Input>
              <div className='mt-5'>
                <Button
                  type='submit'
                  className='flex items-center justify-center w-full bg-orange-600 text-white text-xl py-3 text-center'
                  disabled={registerMutation.isPending}
                  isLoading={registerMutation.isPending}
                >
                  Đăng kí
                </Button>
              </div>
              <div className='mt-8 text-center'>
                <div className='flex items-center justify-center gap-3'>
                  <span className='text-gray-400'>Bạn đã có tài khoản?</span>
                  <Link to={path.login} className='text-orange-600'>
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
