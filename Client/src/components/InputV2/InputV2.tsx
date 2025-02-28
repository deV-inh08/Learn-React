import React, { useState } from 'react'
import { InputHTMLAttributes } from 'react'
import { FieldPath, FieldValues, useController, UseControllerProps } from 'react-hook-form'

export interface InputNumberProps extends InputHTMLAttributes<HTMLInputElement> {
  classNameInput?: string
  classNameError?: string
}

function InputV2<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: UseControllerProps<TFieldValues, TName> & InputNumberProps) {
  const { type, onChange, className, classNameError, classNameInput, value = '', ...rest } = props
  const { field, fieldState } = useController(props)
  const [localValue, setLocalValue] = useState<string>(field.value)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const valueFromInput = event.target.value
    const numberCondition = type === 'number' && (/^\d+$/.test(valueFromInput) || valueFromInput == '')
    if (numberCondition || type !== 'number') {
      setLocalValue(valueFromInput)
      field.onChange(event)
      if (onChange) {
        onChange(event)
      }
    }
  }
  return (
    <div className={className}>
      <input
        className={classNameInput}
        {...rest}
        {...field}
        onChange={(e) => handleChange(e)}
        value={value || localValue}
      />
      <div className={classNameError}>{fieldState.error?.message}</div>
    </div>
  )
}

export default InputV2
