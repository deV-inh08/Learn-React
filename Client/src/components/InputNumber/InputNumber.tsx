import React, { forwardRef } from 'react'
import { InputHTMLAttributes } from 'react'
export interface InputNumberProps extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  classNameInput?: string
  classNameError?: string
}

// const InputNumber = ({
//   className,
//   errorMessage,
//   classNameInput = 'p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm',
//   classNameError = 'mt-1 text-red-600 max-h-[15px] text-sm',
//   onChange,
//   ...rest
// }: InputNumberProps) => {
//   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const { value } = event.target
//     if ((/^\d+$/.test(value) || value == '') && onChange) {
//       onChange(event)
//     }
//   }
//   return (
//     <div className={className}>
//       <input className={classNameInput} {...rest} onChange={(e) => handleChange(e)} />
//       <div className={classNameError}>{errorMessage}</div>
//     </div>
//   )
// }

const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(function InputNumberInner(
  {
    className,
    errorMessage,
    classNameInput = 'p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm',
    classNameError = 'mt-1 text-red-600 max-h-[15px] text-sm',
    onChange,
    ...rest
  },
  ref
) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    if ((/^\d+$/.test(value) || value == '') && onChange) {
      onChange(event)
    }
  }
  return (
    <div className={className}>
      <input className={classNameInput} {...rest} onChange={(e) => handleChange(e)} ref={ref} />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
})

export default InputNumber
