export const PurchasesStatus = {
  inCart: -1,
  all: 0,
  waitForConfinmation: 1,
  waitForGettingProduct: 2,
  inProgress: 3,
  delivered: 4,
  cancelled: 5
} as const
