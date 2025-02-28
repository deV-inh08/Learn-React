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
  },

  buyProducts(body: { product_id: string; buy_count: number }[]) {
    return http.post<SuccessResponse<PurchaseType[]>>(`${URL}/buy-products`, body)
  },

  updatePurchase(body: { product_id: string; buy_count: number }) {
    return http.put<SuccessResponse<PurchaseType>>(`${URL}/update-purchase`, body)
  },

  deletePurchase(purchaseIds: string[]) {
    return http.delete<SuccessResponse<{ delete_count: number }>>(`${URL}`, {
      data: purchaseIds
    })
  }
}

export default purchaseApi
