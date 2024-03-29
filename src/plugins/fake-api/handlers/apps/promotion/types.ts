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
  promoType: number
  fromDate: string
  toDate: string
  status: number
  promoDetails: PromoDetail[]
}

export interface Promotion {
  id: number
  code: string
  startDate: string
  toDate: string
  status: number
  description: string
  name: string
  promoLines: PromoLine[]
}
