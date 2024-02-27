export interface PromoDetail {
  id: number
  code: string
  discount: number
  maxdiscount: number
  conditionApply: number
}

export interface PromoLine {
  id: number
  code: string
  promoName: string
  productReward: string
  promoType: string
  maxdiscount: number
  promoDetails: PromoDetail[]
}

export interface Promotion {
  id: number
  code: string
  startDate: string
  toDate: string
  status: string
  description: string
  promoLines: PromoLine[]
}
