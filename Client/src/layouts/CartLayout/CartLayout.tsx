import React from 'react'
import CartHeader from '../../components/CartHeader'
import Footer from '../../components/Footer'

interface Props {
  children?: React.ReactNode
}

const CartLayout = ({ children }: Props) => {
  return (
    <div>
      <CartHeader />
      {children}
      <Footer />
    </div>
  )
}

export default CartLayout
