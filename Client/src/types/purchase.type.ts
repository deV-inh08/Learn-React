import { Product } from './product.type'

export type PurchasesStatus = -1 | 1 | 2 | 3 | 4 | 5
export type PurchaseListStatus = PurchasesStatus | 0

export interface PurchaseType {
  buy_count: number
  price: number
  price_before_discount: number
  status: number
  _id: string
  user: string
  product: Product
  createdAt: string
  updatedAt: string
  __v: number
}

export interface ExtendedPurchase extends PurchaseType {
  disable: boolean
  checked: boolean
}
