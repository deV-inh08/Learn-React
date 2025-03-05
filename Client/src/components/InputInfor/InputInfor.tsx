import { Controller, useFormContext } from 'react-hook-form'
import { Fragment } from 'react/jsx-runtime'
import Input from '../Input/Input'
import InputNumber from '../InputNumber'
import { UserSchema } from '../../utils/rules'

type FormData = Pick<UserSchema, 'name' | 'address' | 'phone' | 'date_of_birth' | 'avatar'>

const InputInfor = () => {
  const {
    register,
    formState: { errors },
    control
  } = useFormContext<FormData>()
  return (
    <Fragment>
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
    </Fragment>
  )
}

export default InputInfor
