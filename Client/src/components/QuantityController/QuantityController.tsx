import InputNumber, { InputNumberProps } from '../InputNumber'

interface Props extends InputNumberProps {
  max?: number
  onIncrease?: (value: number) => void
  onDecrese?: (value: number) => void
  onType?: (value: number) => void
  classNameWrapper?: string
}

const QuantityController = ({ max, onIncrease, onDecrese, onType, classNameWrapper = 'ml-10', value, ...rest }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let _value = Number(e.target.value)
    if (max !== undefined && _value > max) {
      _value = max
    } else if (_value < 1) {
      _value = 1
    }
    if (onType) {
      onType(_value)
    }
  }

  const inCrease = () => {
    let _value = Number(value) + 1
    if (max !== undefined && _value > max) {
      _value = max
    }
    if (onIncrease) {
      onIncrease(_value)
    }
  }

  const deCrease = () => {
    let _value = Number(value) - 1
    if (_value < 1) {
      _value = 1
    }
    if(onDecrese) {
      onDecrese(_value)
    }
  }
  return (
    <div className={'flex items-center' + classNameWrapper}>
      <button
        className='flex h-8 w-8 items-center justify-center rounded-l-sm border border-gray-300 text-gray-600'
        onClick={deCrease}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          stroke-width='1.5'
          stroke='currentColor'
          className='h-4 w-4'
        >
          <path stroke-linecap='round' stroke-linejoin='round' d='M5 12h14' />
        </svg>
      </button>
      <InputNumber
        className=''
        classNameError='hidden'
        classNameInput='h-8 w-14 border-t border-b border-gray-300 p-1 text-center outline-none'
        onChange={handleChange}
        value={value}
        {...rest}
      />
      <button
        className='flex h-8 w-8 items-center justify-center rounded-r-sm border border-gray-300 text-gray-600'
        onClick={inCrease}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          stroke-width='1.5'
          stroke='currentColor'
          className='w-4 h-4'
        >
          <path stroke-linecap='round' stroke-linejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
        </svg>
      </button>
    </div>
  )
}

export default QuantityController
