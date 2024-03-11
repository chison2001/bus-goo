import type { Promotion } from './types'

const now = new Date()
const date = now.toLocaleDateString('en-CA')
export const db: Promotion[] = [
  {
    id: 1,
    code: 'SUMMER2024',
    description: 'test create promotion',
    startDate: String(date),
    toDate: String(date),
    status: 'Active',
    name: 'Chương trình khuyến mãi hè 2024',
    promoLines: [
      {
        id: 1,
        code: 'SUMMER2024FIRSTLINE',
        fromDate: '12-02-2024',
        toDate: '24-02-2024',
        promoName: 'Siêu ưu đãi mùa hè',
        promoType: 'price',
        promoDetails: [{
          id: 1,
          code: 'SUMMER2024FIRSTLINEDETAIL1',
          conditionApply: '300000',
          discount: '10',
          maxdiscount: '100000',
        },
        {
          id: 2,
          code: 'SUMMER2024FIRSTLINEDETAIL2',
          conditionApply: '300000',
          discount: '10',
          maxdiscount: '100000',
        }],
      },
      {
        id: 2,
        code: 'SUMMER2024SECONDLINE',
        fromDate: '12-02-2024',
        toDate: '24-02-2024',
        promoName: 'Siêu ưu đãi mùa hè',
        promoType: 'price',
        promoDetails: [{
          id: 3,
          code: 'SUMMER2024SECONDLINEDETAIL1',
          conditionApply: '300000',
          discount: '5',
          maxdiscount: '50000',
        },
        {
          id: 4,
          code: 'SUMMER2024SECONDLINEDETAIL2',
          conditionApply: '300000',
          discount: '10',
          maxdiscount: '100000',
        }],
      },
    ],
  },
]
