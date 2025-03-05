import { useMutation, useQuery } from '@tanstack/react-query'
import { FormProvider } from 'react-hook-form'
import Button from '../../../../components/Button'
import userApi from '../../../../apis/user.api'
import { userSchema, UserSchema } from '../../../../utils/rules'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useContext, useEffect, useMemo, useState } from 'react'
import DateSelect from '../../components/DateSelect'
import { toast } from 'react-toastify'
import { AppContext } from '../../../../contexts/app.context'
import { setProfileToLS } from '../../../../utils/authLS'
import { getAvatarName, isAxiosUnprocessableEntityError } from '../../../../utils/uitls'
import { ErrorResponse } from '../../../../types/util.type'
import InputFile from '../../../../components/InputFile'
import InputInfor from '../../../../components/InputInfor'

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

  const methods = useForm<FormData>({
    defaultValues: {
      name: '',
      address: '',
      avatar: '',
      date_of_birth: new Date(1990, 0, 1),
      phone: ''
    },
    resolver: yupResolver(profileSchema)
  })

  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
    setError
  } = methods

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

  // change file 'image' avatar
  const handleChangeFile = (file?: File) => {
    setFile(file)
  }

  return (
    <div className='rounded-sm bg-white px-2 pb-10 md:pb-20 md:px-7 shadow'>
      <div className='border-b border-b-gray-200 py-6'>
        <h1 className='text-lg font-medium capitalize text-gray-70'>Hồ sơ cuả tôi</h1>
        <p className='mt-1 text-sm text-gray-700'>Quản lý thông tin hồ sơ của tôi</p>
      </div>
      <div className='mt-8 flex flex-col-reverse md:flex-row md:items-start'>
        <FormProvider {...methods}>
          <form action='' className='mt-6 flex-grow pr-12 md:mt-0' onSubmit={handleUpdatedProfile}>
            <div className='flex flex-wrap'>
              <p className='w-[20%] truncate pt-3 text-right capitalize'>Email</p>
              <div className='w-[80%] pl-4'>
                <p className='pt-3 text-gray-700'>{profile?.email}</p>
              </div>
            </div>
            <InputInfor />
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
        </FormProvider>

        <div className='flex justify-center md:w-72 md:border-l-gray-200'>
          <div className='flex flex-col items-center'>
            <div className='my-5 h-24 w-24'>
              <img
                src={previewImage || getAvatarName(avatar)}
                alt='avatar'
                className='h-full w-full object-cover rounded-full'
              />
            </div>
            <InputFile onChange={handleChangeFile} />
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
