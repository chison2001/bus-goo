import type { Price } from './types'

const now = new Date()
const date = now.toLocaleDateString('en-CA')
export const db: Price[] = [
  {
    id: 1,
    priceCode: 'PRICE001',
    fromDate: String(date),
    toDate: String(date),
    description: '',
    status: 'Active',
    priceDetails: [
      {
        id: 1,
        priceDetailCode: 'PRICE0001DETAIL1',
        priceValue: '100000',
        route: 'ROUTE0001',
        typeBus: 'TYPE001',
        status: 'Active',
      },
      {
        id: 2,
        priceDetailCode: 'PRICE0001DETAIL2',
        priceValue: '100000',
        route: 'ROUTE0001',
        typeBus: 'TYPE001',
        status: 'Active',
      },
    ],
  },
  {
    id: 2,
    priceCode: 'PRICE002',
    fromDate: String(date),
    toDate: String(date),
    description: '',
    status: 'Active',
    priceDetails: [
      {
        id: 3,
        priceDetailCode: 'PRICE0002DETAIL1',
        priceValue: '100000',
        route: 'ROUTE0002',
        typeBus: 'TYPE002',
        status: 'Active',
      },
      {
        id: 4,
        priceDetailCode: 'PRICE0002DETAIL2',
        priceValue: '100000',
        route: 'ROUTE0002',
        typeBus: 'TYPE002',
        status: 'Active',
      },
    ],
  },
  {
    id: 3,
    priceCode: 'PRICE003',
    fromDate: String(date),
    toDate: String(date),
    description: '',
    status: 'Active',
    priceDetails: [
      {
        id: 5,
        priceDetailCode: 'PRICE0003DETAIL1',
        priceValue: '3300000',
        route: 'ROUTE0003',
        typeBus: 'TYPE003',
        status: 'Active',
      },
      {
        id: 6,
        priceDetailCode: 'PRICE0003DETAIL2',
        priceValue: '300000',
        route: 'ROUTE0003',
        typeBus: 'TYPE003',
        status: 'Active',
      },
    ],
  },
]
