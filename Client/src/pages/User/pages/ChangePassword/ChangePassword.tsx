import Button from '../../../../components/Button'
import Input from '../../../../components/Input'
import { useForm } from 'react-hook-form'
import { userSchema, UserSchema } from '../../../../utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import userApi from '../../../../apis/user.api'
import omit from 'lodash/omit'
import { isAxiosUnprocessableEntityError } from '../../../../utils/uitls'
import { ErrorResponse } from '../../../../types/util.type'
import { toast } from 'react-toastify'

type FormData = Pick<UserSchema, 'password' | 'new_password' | 'confirm_password'>
const changePasswordSchema = userSchema.pick(['password', 'confirm_password', 'new_password'])

const ChangePassword = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    reset
  } = useForm<FormData>({
    defaultValues: {
      password: '',
      confirm_password: '',
      new_password: ''
    },
    resolver: yupResolver(changePasswordSchema)
  })

  const updatePasswordMutation = useMutation({
    mutationFn: userApi.updateProfile
  })

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await updatePasswordMutation.mutateAsync(omit(data, ['confirm_password']))
      toast.success(res.data.message, {
        autoClose: 1000
      })
      reset()
    } catch (error) {
      if (isAxiosUnprocessableEntityError<ErrorResponse<FormData>>(error)) {
        const formError = error.response?.data.data
        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof FormData, {
              message: formError[key as keyof FormData] as string,
              type: 'Server'
            })
          })
        }
      }
    }
  })
  return (
    <div className='rounded-sm bg-white px-2 pb-10 shadow md:px-7 md:pb-20'>
      <div className='border-b border-b-gray-200 py-6'>
        <h1 className='text-lg font-medium capitalize text-gray-900'>Đổi mật khẩu</h1>
        <div className='mt-1 text-sm text-gray-700'>Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
      </div>
      <form className='mt-8 mr-auto max-w-2xl' onSubmit={onSubmit}>
        <div className='mt-6 flex-grow md:mt-0 md:pr-12'>
          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Mật khẩu cũ</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <Input
                classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                register={register}
                name='password'
                type='password'
                className='relative'
                classNameEye='absolute top-3 right-2 size-5 cursor-pointer'
                placeholder='Mật khẩu cũ'
                errorMessage={errors.password?.message}
              />
            </div>
          </div>
          <div className='mt-6 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Mật khẩu mới</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <Input
                classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                register={register}
                className='relative'
                name='new_password'
                type='password'
                classNameEye='absolute top-3 right-2 size-5 cursor-pointer'
                placeholder='Mật khẩu mới'
                errorMessage={errors.new_password?.message}
              />
            </div>
          </div>
          <div className='mt-6 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Nhập lại mật khẩu</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <Input
                classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                register={register}
                name='confirm_password'
                type='password'
                className='relaive'
                classNameEye='absolute top-3 right-2 size-5 cursor-pointer'
                placeholder='Nhập lại mật khẩu'
                errorMessage={errors.confirm_password?.message}
              />
            </div>
          </div>
          <div className='flex flex-wrap mt-6'>
            <p className='w-[20%] truncate pt-3 text-right capitalize'></p>
            <Button className='flex items-center h-9 bg-orange-600 px-5 text-center text-white hover:bg-orange-600/80'>
              Lưu
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ChangePassword
