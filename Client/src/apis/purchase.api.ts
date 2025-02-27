import { PurchaseListStatus, PurchaseTyoe } from '../types/purchase.type';
import { SuccessResponse } from '../types/util.type';
import http from '../utils/http'

const URL = 'purchases'

const purchaseApi = {
  addToCart(body: { product_id: string; buy_count: number }) {
    return http.post<SuccessResponse<PurchaseTyoe>>(`${URL}/add-to-cart`, body)
  },

  getPurchases(params: { status: PurchaseListStatus }) {
    return http.get<SuccessResponse<PurchaseTyoe[]>>(`${URL}`, {
      params
    })
  }
}

export default purchaseApi
