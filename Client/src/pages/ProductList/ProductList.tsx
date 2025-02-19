import React from 'react'
import AsideFilter from './AsideFilter'
import SortProductList from './SortProductList'
import Product from './Product/Product'

const ProductList = () => {
  return (
    <div className='bg-gray-200 py-6'>
      <div className='container-custom'>
        <div className='grid grid-cols-12 gap-6'>
          <div className='col-span-3'>
            <AsideFilter />
          </div>
          <div className='col-span-9'>
            <SortProductList />
            <div className='mt-6 grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3'>
              {Array(30)
                .fill(0)
                .map((_, index) => {
                  return (
                    <div key={index} className='col-span-1'>
                      <Product />
                    </div>
                  )
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductList
