import { UseFormRegister, RegisterOptions } from 'react-hook-form'
import { FormData } from '../../pages/Register/Register'
import { InputHTMLAttributes } from 'react'

type Name = keyof FormData

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  name?: Name | 'from' | 'to'
  classNameInput?: string
  classNameError?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: UseFormRegister<any>
  rules?: RegisterOptions<FormData, Name>
}

const Input = ({
  name,
  register,
  className,
  errorMessage,
  rules,
  classNameInput = 'p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm',
  classNameError = 'mt-1 text-red-600 max-h-[15px] text-sm',
  ...rest
}: Props) => {
  const registerResult = register && name ? register(name, rules) : null
  return (
    <div className={`${className ? className + 'h-[4rem] my-6' : ''}`}>
      <input
        // name='email' => overWrite
        className={classNameInput}
        {...registerResult}
        {...rest}
      />
      <p className={classNameError}>{errorMessage}</p>
    </div>
  )
}

export default Input
