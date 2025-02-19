const SortProductList = () => {
  return (
    <div className='bg-gray-300/40 py-4 px-3'>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <div className='flex items-center gap-2'>
          <p>Sắp xếp theo</p>
          <button className='h-8 px-4 capitalize bg-orange-600 text-white hover:bg-orange-600/80 text-center'>
            Phổ biến
          </button>
          <button className='h-8 px-4 capitalize bg-white text-black hover:bg-gray-200 text-center'>Mới nhất</button>
          <button className='h-8 px-4 capitalize bg-white text-black hover:bg-gray-200 text-center'>Bán chạy</button>
          <select className='h-8 px-2 capitalize bg-white text-black text-sm hover:bg-slate-200 text-left outline-none'>
            <option value='' disabled>
              Giá
            </option>
            <option value='price:asc'>Thấp đến cao</option>
            <option value='price:desc'>Cao đến thấp</option>
          </select>
        </div>
        <div className='flex items-center'>
          <div>
            <span className='text-orange-600 mr-1'>1</span>
            <span>2</span>
          </div>
          <div className='ml-2'>
            <button className='px-3 h-8 rounded-tl-sm rouded-bl-sm bg-white/60 hover:bg-slate-100 cursor-not-allowed shadow-sm'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-3 h-3'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5 8.25 12l7.5-7.5' />
              </svg>
            </button>
            <button className='px-3 h-8 rounded-tl-sm rouded-bl-sm bg-white/60 hover:bg-slate-100 cursor-not-allowed shadow-sm'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='h-3 w-3'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SortProductList
