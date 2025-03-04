import { useMutation, useQuery } from '@tanstack/react-query'
import Button from '../../../../components/Button'
import Input from '../../../../components/Input'
import userApi from '../../../../apis/user.api'
import { userSchema, UserSchema } from '../../../../utils/rules'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import InputNumber from '../../../../components/InputNumber'
import { useContext, useEffect, useMemo, useRef, useState } from 'react'
import DateSelect from '../../components/DateSelect'
import { toast } from 'react-toastify'
import { AppContext } from '../../../../contexts/app.context'
import { setProfileToLS } from '../../../../utils/authLS'
import { getAvatarName, isAxiosUnprocessableEntityError } from '../../../../utils/uitls'
import { ErrorResponse } from '../../../../types/util.type'

type FormData = Pick<UserSchema, 'name' | 'address' | 'phone' | 'date_of_birth' | 'avatar'>
type FormDataError = Omit<FormData, 'date_of_birth'> & {
  date_of_birth?: string
}

const profileSchema = userSchema.pick(['name', 'address', 'phone', 'date_of_birth', 'avatar'])
const Profile = () => {
  const { setProfile } = useContext(AppContext)
  const [file, setFile] = useState<File>()
  const previewImage = useMemo(() => {
    return file ? URL.createObjectURL(file) : ''
  }, [file])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { data: profileData, refetch } = useQuery({
    queryKey: ['profile'],
    queryFn: () => userApi.getProfile()
  })
  const profile = profileData?.data.data
  const updatedProfileMutation = useMutation({
    mutationFn: userApi.updateProfile
  })

  const uploadAvatarMutation = useMutation({
    mutationFn: userApi.uploadAvatar
  })

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
    setError
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      address: '',
      avatar: '',
      date_of_birth: new Date(1990, 0, 1),
      phone: ''
    },
    resolver: yupResolver(profileSchema)
  })

  const avatar = watch('avatar')

  useEffect(() => {
    if (profile) {
      setValue('name', profile.name)
      setValue('address', profile.address)
      setValue('avatar', profile.avatar)
      setValue('date_of_birth', profile.date_of_birth ? new Date(profile.date_of_birth) : new Date(1990, 0, 1))
    }
  }, [profile, setValue])

  const handleUpdatedProfile = handleSubmit(async (data) => {
    try {
      let avatarName = avatar
      if (file) {
        const form = new FormData()
        form.append('image', file)
        const uploadResponse = await uploadAvatarMutation.mutateAsync(form)
        avatarName = uploadResponse.data.data
        setValue('avatar', avatarName)
      }
      const res = await updatedProfileMutation.mutateAsync({
        ...data,
        date_of_birth: data.date_of_birth?.toISOString(),
        avatar: avatarName
      })
      setProfile(res.data.data)
      setProfileToLS(res.data.data)
      refetch()
      toast.success(res.data.message, { autoClose: 1000 })
    } catch (error) {
      if (isAxiosUnprocessableEntityError<ErrorResponse<FormDataError>>(error)) {
        const formError = error.response?.data.data
        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof FormDataError, {
              message: formError[key as keyof FormDataError],
              type: 'Server'
            })
          })
        }
      }
    }
  })

  const handleUpload = () => {
    fileInputRef.current?.click()
  }

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileFromLocal = e.target.files?.[0]
    setFile(fileFromLocal)
  }

  return (
    <div className='rounded-sm bg-white px-2 pb-10 md:pb-20 md:px-7 shadow'>
      <div className='border-b border-b-gray-200 py-6'>
        <h1 className='text-lg font-medium capitalize text-gray-70'>Hồ sơ cuả tôi</h1>
        <p className='mt-1 text-sm text-gray-700'>Quản lý thông tin hồ sơ của tôi</p>
      </div>
      <div className='mt-8 flex flex-col-reverse md:flex-row md:items-start'>
        <form action='' className='mt-6 flex-grow pr-12 md:mt-0' onSubmit={handleUpdatedProfile}>
          <div className='flex flex-wrap'>
            <p className='w-[20%] truncate pt-3 text-right capitalize'>Email</p>
            <div className='w-[80%] pl-4'>
              <p className='pt-3 text-gray-700'>{profile?.email}</p>
            </div>
          </div>
          <div className='flex flex-wrap mt-6'>
            <p className='w-[20%] truncate pt-3 text-right capitalize'>Tên</p>
            <div className='w-[80%] pl-4'>
              <Input
                register={register}
                name='name'
                placeholder='Tên'
                errorMessage={errors.name?.message}
                classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
              ></Input>
            </div>
          </div>
          <div className='flex flex-wrap mt-6'>
            <p className='w-[20%] truncate pt-3 text-right capitalize'>Số điện thoại</p>
            <div className='w-[80%] pl-4'>
              <Controller
                control={control}
                name='phone'
                render={({ field }) => (
                  <InputNumber
                    classNameInput='w-full rounded-sm border border-gray-700 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                    placeholder='Số điện thoại'
                    errorMessage={errors.phone?.message}
                    {...field}
                    onChange={field.onChange}
                  ></InputNumber>
                )}
              ></Controller>
            </div>
          </div>
          <div className='flex flex-wrap mt-6'>
            <p className='w-[20%] truncate pt-3 text-right capitalize'>Địa chỉ</p>
            <div className='w-[80%] pl-4'>
              <Input
                register={register}
                name='address'
                placeholder='Địa chỉ'
                errorMessage={errors.address?.message}
                classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
              ></Input>
            </div>
          </div>
          <Controller
            control={control}
            name='date_of_birth'
            render={({ field }) => {
              return (
                <DateSelect
                  errorMessage={errors.date_of_birth?.message}
                  value={field.value}
                  onChange={field.onChange}
                ></DateSelect>
              )
            }}
          ></Controller>
          <div className='flex flex-wrap mt-6'>
            <p className='w-[20%] truncate pt-3 text-right capitalize'></p>
            <Button className='flex items-center h-9 bg-orange-600 px-5 text-center text-white hover:bg-orange-600/80'>
              Lưu
            </Button>
          </div>
        </form>
        <div className='flex justify-center md:w-72 md:border-l-gray-200'>
          <div className='flex flex-col items-center'>
            <div className='my-5 h-24 w-24'>
              <img
                src={previewImage || getAvatarName(avatar)} 
                alt='avatar' 
                className='h-full w-full object-cover rounded-full'
              />
            </div>
            <input className='hidden' type='file' accept='.jpg,.jpeg,.png' ref={fileInputRef} onChange={onFileChange} />
            <button
              type='button'
              className='flex h-10 items-center justify-end rounded-sm border bg-white px-6 text-sm text-gray-600 shadow-sm'
              onClick={handleUpload}
            >
              Chọn ảnh
            </button>
            <div className='mt-3 text-gray-400'>
              <p>Dung lượng tối đa 1 MB</p>
              <p>Định dạng .JPEG, .PNG </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
