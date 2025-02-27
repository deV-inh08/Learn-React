import { PurchaseListStatus, PurchaseType } from '../types/purchase.type'
import { SuccessResponse } from '../types/util.type'
import http from '../utils/http'

const URL = 'purchases'

const purchaseApi = {
  addToCart(body: { product_id: string; buy_count: number }) {
    return http.post<SuccessResponse<PurchaseType>>(`${URL}/add-to-cart`, body)
  },

  getPurchases(params: { status: PurchaseListStatus }) {
    return http.get<SuccessResponse<PurchaseType[]>>(`${URL}`, {
      params
    })
  }
}

export default purchaseApi
