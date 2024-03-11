export interface PromoDetail {
  id: number | null
  code: string
  discount: string
  maxdiscount: string
  conditionApply: string
}

export interface PromoLine {
  id: number
  code: string
  promoName: string
  promoType: string
  fromDate: string
  toDate: string
  promoDetails: PromoDetail[]
}

export interface Promotion {
  id: number
  code: string
  startDate: string
  toDate: string
  status: string
  description: string
  name: string
  promoLines: PromoLine[]
}
