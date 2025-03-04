import React from 'react'
import Input from '../../../../components/Input'

const Profile = () => {
  return (

 <div className='rounded-sm bg-white px-2 pb-10 md:pb-20 md:px-7 shadow'>
      <div className='border-b border-b-gray-200 py-6'>
        <h1 className='text-lg font-medium capitalize text-gray-70'>Hồ sơ cuả tôi</h1>
        <p className='mt-1 text-sm text-gray-700'>Quản lý thông tin hồ sơ của tôi</p>
      </div>
      <div className='mt-8 flex flex-col-reverse md:flex-row md:items-start'>
        <form action='' className='mt-6 flex-grow pr-12 md:mt-0'>
          <div className='flex flex-wrap'>
            <p className='w-[20%] truncate pt-3 text-right capitalize'>Email</p>
            <div className='w-[80%] pl-4'>
              <p className='pt-3 text-gray-700'>vi*******@gmail.com</p>
            </div>
          </div>
          <div className='flex flex-wrap mt-6'>
            <p className='w-[20%] truncate pt-3 text-right capitalize'>Tên</p>
            <div className='w-[80%] pl-4'>
              <Input classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'></Input>
            </div>
          </div>
          <div className='flex flex-wrap mt-6'>
            <p className='w-[20%] truncate pt-3 text-right capitalize'>Số điện thoại</p>
            <div className='w-[80%] pl-4'>
              <Input classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'></Input>
            </div>
          </div>
          <div className='flex flex-wrap mt-6'>
            <p className='w-[20%] truncate pt-3 text-right capitalize'>Địa chỉ</p>
            <div className='w-[80%] pl-4'>
              <Input classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'></Input>
            </div>
          </div>
          <div className='mt-6 flex flex-wrap'>
            <p className='w-[20%] truncate pt-3 text-right capitalize'>Ngày sinh</p>
            <div className='w-[80%] pl-4'>
              <div className='flex justify-between'>
                <select className='h-10 w-[32%] rounded-sm border border-black/10 px-3 '>
                  <option disabled>Ngày</option>
                </select>
                <select className='h-10 w-[32%] rounded-sm border border-black/10 px-3 '>
                  <option disabled>Tháng</option>
                </select>
                <select className='h-10 w-[32%] rounded-sm border border-black/10 px-3 '>
                  <option disabled>Năm</option>
                </select>
              </div>
            </div>
          </div>
        </form>
        <div className='flex justify-center md:w-72 md:border-l-gray-200'>
          <div className='flex flex-col items-center'>
            <div className='my-5 h-24 w-24'>
              <img
                src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMwAAADACAMAAAB/Pny7AAAAY1BMVEX///9UWV1PVFna29xkaGynqapCSU1RVlpMUVZITlJARkv8/PxtcXRFS0/5+fnq6uvQ0dJfY2evsbLw8fG4ubueoKKChYfj5OTExcZ8gII5QEV3e34yOT+LjpCVl5kmLzYdJy6QfrB4AAAGGElEQVR4nO2d13LkKhBADQqAMhIKMwq7//+VFzzessdpFBrR9uW8+GFrq3SK1ITueXryeH48RVP2faDp+7IpXH/NAcpgUNHSjVmoycZuidQQlK6/agdpoNo5o0ksBKfPcCHihGZzq4LU9ddtoq/njOSCkg9QEbNsrnvXX7iaYMnIZyKvQiRbKtdfuYrqIuk3Ji8+lFzw6zSXnLJHKgZG80vj+mu/Z/nD15jc4H8W19/7NWkVx+tVDHFcIZ3Zmva6qoO9hV1bjH0tDcZ8q4ohH/EtO8UQij0uhIhwQBbmFLXcMPLf2cgalU0akd0uetEhEaae1j5eJr+1oa1rg1dasXkau4cJNDbqekzFcFWuLW5UAC7aBkWoVpKDfewGIwi2bcV4YB57Cx+dT9Bpe2geewttXU/QlYSTkY6HTdntDGI+Q3ROh01aAw2YG7x22dH6EFYmdHjQUdQbN2OPiB2GnOW67f56GHU2atIogXUhJHEWPzccuGF003BXu+gBJCi75zo4kgnB1stXaOjGpZzgXQiZ3EwB7a7TmEfkbrZpDHz4Gxhz4VJaGP6Gq4t+pqz0Mt3PXGygO9Cw7BXeOZCB2S1/hJHzXUpLLtrm/EFT2ZM5f8NZ25OpT5dp7cmcv2x2FgKzG/T86Wy0JzOeLpPZk8m8jJfxMl7mPH7V1Dzbk5lPl4G7l/kgc344o+zFZudvNX/VFuBXbc4snTQ5OmuydqBx/mT29DQAXzT9I3ZxdN5YOWom5OrkUsPOWZOLkyZNDX5vZkjOP84w/KorjafMwnzGzw+ZbwwWmmZydQ3YSPgLWunqgjaFeAJ4z1U5e3DSQzcNk+7em6QKeHZO3DWMbhqoZ4A3+Og042mAfKTBuKup7EYzQz6emx1nbARwL854GLh1MZdOQB2NObhkek8BdeZEZ+dPgU0cAGJDna39d/Qwz+eR5KFWf4+7/EWRCmAYtmfO3cOcvZn7BPVd9u9jqECScHJDHUnT4gSVi+5p+xdPHiLqYzeqcW9q44hm7L/Sz3syz5iYkczJ9zSKb24cwRWKtfIjaT9OmxqHTWPvOgHoawqVbDiBjhOFIBz7hmaZ8nXFDfJpQdrD3tAsnD/K3mCM8x+gYijbkHzjwygnYYsgkXEt1ZxJJvj7jZtuEcFlNle4x8oHmiGax5DkuRCCa/SfPCfhOLfDz+hf70j7SkXtMnfd5XLp5qWNVIV4Kl5DY0pPmbJTP7JBPB6Px+M5jzQtXkh/5uJfNH1QDUrVdRS1mkVj/kZRXSs1VEFf/oRIswyG2kRjYxZKQkUe58+YINMQm6KH0pSh1JFajbgOZV9F8yXLJOHP1SbZV/c2+h8oNVE0kVl2maMK2+lMr7pQ6qbQW7INJxraiuuGkmGnsAg1QyeMxN4bNPM/KRed+21OGckpAbnV5MkkI3djqCjrcEogr86TKaxdzHNFOYxTAv7qnCbTOJzs0wS1vNp6PXuVUXDe+GmGhcXW3mjr7haz5aTpoFEzW3doeUAnZ/MZJ+qqI7ZVbjqks32fVnXkaP2/1QjS2byGahYCX2rmaxiX9g6kB3mmyouOnfvOpjt6279L59rBN04aMEuJDI+IGXSl3aLedsEHCZtgC4WVi6WUjHVMC2AEGoyOutg/4hHskWBl49H/NkQGtORUsIX/9sFDEJtqf1lpSDhElc2AWEuV3QYlh8dNz5C4aBt28NijweNibA4FA4UEfFB+HCGPrJ6zlRy5/SQHElJt5GEdY38WVw9dwPQ4jO6cBMBqZEOyt962vTpZR9iX/tDbq19yBJrt6Wgtwk5m4DtKbFQ2irFCQHeEnK3jLczXxJubBm3D7Gia1E5+PAzJxrruwAmYsGxN5xwQN4xumk1BTWGnfDEUebslDCjhflTCBlRuOXqC+UkZe2z5sZoU+scLoIk3zGeFrWo/UIhu/aBp8G1k7mF0/WmArWI/cEzrZbCP/00zgI2fYoBlQ5Iq5sDsxoYiSBHymVnPzZGXwYmXwYqXwYqXwYqXwYqXwYqXwYqXwYqXwYqXwYqXwYqXwYqXwYqXwcr/ViahyEnWy9QkRA5Zfz9TBuhBWxbB8+v5DwpMiBkd1AQsAAAAAElFTkSuQmCC'
                alt=''
                className='h-full w-full object-cover rounded-full'
              />
            </div>
            <input className='hidden' type='file' accept='.jpg,.jpeg,.png' />
            <button className='flex h-10 items-center justify-end rounded-sm border bg-white px-6 text-sm text-gray-600 shadow-sm'>
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
