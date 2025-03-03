import React from 'react'
import Input from '../../components/Input'

const Profile = () => {
  return (
    <div className='rounded-sm bg-white px-7 shadow'>
      <div className='border-b border-b-gray-200 py-6'>
        <h1 className='text-lg font-medium capitalize text-gray-70'>Hồ sơ cuả tôi</h1>
        <p className='mt-1 text-sm text-gray-700'>Quản lý thông tin hồ sơ của tôi</p>
      </div>
      <div className='mt-8 flex flex-col-reverse md:flex-row md:items-start'>
        <form action='' className='mt-6 flex-grow pr-12 md:mt-0'>
          <div className='flex flex-wrap'>
            <p className='w-[20%] truncate pt-3 text-right capitalize'>Email</p>
            <div className='w-[80%] pl-5'>
              <p className='pt-3 text-gray-700'>vi*******@gmail.com</p>
            </div>
          </div>
          <div className='flex flex-wrap mt-6'>
            <p className='w-[20%] truncate pt-3 text-right capitalize'>Tên</p>
            <div className='w-[80%] pl-5'>
              <Input classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'></Input>
            </div>
          </div>
          <div className='flex flex-wrap mt-6'>
            <p className='w-[20%] truncate pt-3 text-right capitalize'>Số điện thoại</p>
            <div className='w-[80%] pl-5'>
              <Input classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'></Input>
            </div>
          </div>
          <div className='flex flex-wrap mt-6'>
            <p className='w-[20%] truncate pt-3 text-right capitalize'>Địa chỉ</p>
            <div className='w-[80%] pl-5'>
              <Input classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'></Input>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Profile
