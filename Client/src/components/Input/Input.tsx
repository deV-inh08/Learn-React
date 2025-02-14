import { UseFormRegister, RegisterOptions } from 'react-hook-form'
import { FormData } from '../../pages/Register/Register'

type Name = keyof FormData

interface Props {
  type: React.HTMLInputTypeAttribute
  placeholder?: string
  errorMessage?: string
  className?: string
  name: Name
  autoComplete?: string
  register: UseFormRegister<FormData>
  rules?: RegisterOptions<FormData, Name>
}

const Input = ({ name, register, type, className, errorMessage, placeholder, autoComplete, rules }: Props) => {
  return (
    <div className={`${className} h-[4rem] my-6`}>
      <input
        type={type}
        // name='email' => overWrite
        placeholder={placeholder}
        className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
        autoComplete={autoComplete}
        {...register(name, rules)}
      />
      <p className='mt-1 text-red-600 max-h-[15px] text-sm'>{errorMessage}</p>
    </div>
  )
}

export default Input