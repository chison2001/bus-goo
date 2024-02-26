import type { UserProperties } from '../users/types'

// 👉 Invoice
export interface Invoice {
  id: string
  orderDate: string
  busNumber: string
  client: UserProperties
  startDate: string
  total: number
  paymentStatus: string
  status: string
}

// Payment details
export interface PaymentDetails {
  totalDue: string
  bankName: string
  country: string
  iban: string
  swiftCode: string
}
