export interface PriceDetail {
  id: number
  priceDetailCode: string
  priceValue: string
  status: number
  typeBus: string
  route: string
}

export interface Price {
  id: number
  priceCode: string
  fromDate: string
  toDate: string
  status: string
  description: string
  priceDetails: PriceDetail[]
}
