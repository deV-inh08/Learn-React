interface Props {
  rating: number
}

const ProductRating = ({ rating }: Props) => {
  const handleRating = (order: number): string => {
    // order is 'start', (1, 2, 3, 4, 5). we have 5 starts
    // if rating is 3.2
    if (order <= rating) {
      return '100%' // starts 1, 2, 3 is full
    }
    // start 4 > 3.2 && 4 - 3.2 = 0.8 < 1
    if (order > rating && order - rating < 1) {
      return rating - Math.floor(rating) * 100 + '%' // 3.2 - 3 * 100 => 20%
    }
    // start 5 return 0%
    return '0%'
  }
  return (
    <div className='flex items-center'>
      {Array(5)
        .fill(0)
        .map((_, index) => {
          return (
            <div className='relative' key={index}>
              <div className='absolute top-0 left-0 h-full overflow-hidden' style={{ width: handleRating(index) }}>
                <svg
                  enableBackground='new 0 0 15 15'
                  viewBox='0 0 15 15'
                  x={0}
                  y={0}
                  className='w-3 h-3 fill-yellow-300 text-yellow-300'
                >
                  <polygon
                    points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeMiterlimit={10}
                  />
                </svg>
              </div>
              <svg enableBackground='new 0 0 15 15' viewBox='0 0 15 15' x={0} y={0} className='w-3 h-3 fill-gray-400'>
                <polygon
                  points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeMiterlimit={10}
                />
              </svg>
            </div>
          )
        })}
    </div>
  )
}

export default ProductRating
