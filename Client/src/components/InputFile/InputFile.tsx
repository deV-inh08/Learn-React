import React, { useRef } from 'react'
import { toast } from 'react-toastify'
import { config } from '../../constants/config'

interface Props {
  onChange?: (file?: File) => void
}

const InputFile = ({ onChange }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleUpload = () => {
    fileInputRef.current?.click()
  }

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileFromLocal = e.target.files?.[0]
    if (fileFromLocal && (fileFromLocal.size >= config.maxSizeUploadAvatar || !fileFromLocal.type.includes('image'))) {
      toast.error('Ảnh không đúng định dạng hoặc kích thước ảnh quá lớn', {
        autoClose: 1000,
        position: 'top-center'
      })
    } else {
      if (onChange) {
        onChange(fileFromLocal)
      }
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }
  return (
    <>
      <input className='hidden' type='file' accept='.jpg,.jpeg,.png' ref={fileInputRef} onChange={onFileChange} />
      <button
        type='button'
        className='flex h-10 items-center justify-end rounded-sm border bg-white px-6 text-sm text-gray-600 shadow-sm'
        onClick={handleUpload}
      >
        Chọn ảnh
      </button>
    </>
  )
}

export default InputFile
