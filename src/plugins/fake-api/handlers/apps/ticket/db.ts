import type { Ticket } from './types'

const now = new Date()
const date = now.toLocaleDateString('es-CL')
export const database: Ticket[] = [
  {
    id: 'TI-1',
    departureDay: String(date),
    departureTime: '17:30',
    arrivalTime: '7:30',
    busType: 'Giường',
    emptySeat: '13 chỗ trống',
    price: '300000',
    expanded: '',
    departure: 'Hồ Chí Minh',
    destination: 'Đà Lạt',
    downFloorSeat: [
      {
        location: 'A01',
        isAvailable: true,
      },
      {
        location: 'A02',
        isAvailable: true,
      },
      {
        location: 'A03',
        isAvailable: false,
      },
      {
        location: 'A04',
        isAvailable: false,
      },
      {
        location: 'A05',
        isAvailable: true,
      },
      {
        location: 'A06',
        isAvailable: false,
      },
      {
        location: 'A07',
        isAvailable: true,
      },
      {
        location: 'A08',
        isAvailable: false,
      },
      {
        location: 'A09',
        isAvailable: true,
      },
      {
        location: 'A10',
        isAvailable: true,
      },
      {
        location: 'A11',
        isAvailable: false,
      },
      {
        location: 'A12',
        isAvailable: true,
      },
      {
        location: 'A13',
        isAvailable: true,
      },
      {
        location: 'A14',
        isAvailable: true,
      },
      {
        location: 'A15',
        isAvailable: false,
      },
      {
        location: 'A16',
        isAvailable: false,
      },
      {
        location: 'A17',
        isAvailable: false,
      },
      {
        location: 'A18',
        isAvailable: false,
      },
    ],
    upFloorSeat: [
      {
        location: 'B01',
        isAvailable: true,
      },
      {
        location: 'B02',
        isAvailable: false,
      },
      {
        location: 'B03',
        isAvailable: true,
      },
      {
        location: 'B04',
        isAvailable: false,
      },
      {
        location: 'B05',
        isAvailable: true,
      },
      {
        location: 'B06',
        isAvailable: true,
      },
      {
        location: 'B07',
        isAvailable: false,
      },
      {
        location: 'B08',
        isAvailable: true,
      },
      {
        location: 'B09',
        isAvailable: true,
      },
      {
        location: 'B10',
        isAvailable: true,
      },
      {
        location: 'B11',
        isAvailable: true,
      },
      {
        location: 'B12',
        isAvailable: false,
      },
      {
        location: 'B13',
        isAvailable: true,
      },
      {
        location: 'B14',
        isAvailable: false,
      },
      {
        location: 'B15',
        isAvailable: true,
      },
      {
        location: 'B16',
        isAvailable: true,
      },
      {
        location: 'B17',
        isAvailable: false,
      },
      {
        location: 'B18',
        isAvailable: false,
      },
    ],
  },
  {
    id: 'TI-2',
    departureDay: String(date),
    departureTime: '17:30',
    arrivalTime: '7:30',
    busType: 'Giường',
    emptySeat: '20 chỗ trống',
    price: '100000',
    expanded: '',
    departure: 'Hồ Chí Minh',
    destination: 'Vũng Tàu',
    downFloorSeat: [
      {
        location: 'A01',
        isAvailable: true,
      },
      {
        location: 'A02',
        isAvailable: true,
      },
      {
        location: 'A03',
        isAvailable: false,
      },
      {
        location: 'A04',
        isAvailable: false,
      },
      {
        location: 'A05',
        isAvailable: true,
      },
      {
        location: 'A06',
        isAvailable: false,
      },
      {
        location: 'A07',
        isAvailable: true,
      },
      {
        location: 'A08',
        isAvailable: false,
      },
      {
        location: 'A09',
        isAvailable: true,
      },
      {
        location: 'A10',
        isAvailable: true,
      },
      {
        location: 'A11',
        isAvailable: false,
      },
      {
        location: 'A12',
        isAvailable: true,
      },
      {
        location: 'A13',
        isAvailable: true,
      },
      {
        location: 'A14',
        isAvailable: true,
      },
      {
        location: 'A15',
        isAvailable: false,
      },
      {
        location: 'A16',
        isAvailable: false,
      },
      {
        location: 'A17',
        isAvailable: false,
      },
      {
        location: 'A18',
        isAvailable: false,
      },
    ],
    upFloorSeat: [
      {
        location: 'B01',
        isAvailable: true,
      },
      {
        location: 'B02',
        isAvailable: false,
      },
      {
        location: 'B03',
        isAvailable: true,
      },
      {
        location: 'B04',
        isAvailable: false,
      },
      {
        location: 'B05',
        isAvailable: true,
      },
      {
        location: 'B06',
        isAvailable: true,
      },
      {
        location: 'B07',
        isAvailable: false,
      },
      {
        location: 'B08',
        isAvailable: true,
      },
      {
        location: 'B09',
        isAvailable: true,
      },
      {
        location: 'B10',
        isAvailable: true,
      },
      {
        location: 'B11',
        isAvailable: true,
      },
      {
        location: 'B12',
        isAvailable: false,
      },
      {
        location: 'B13',
        isAvailable: true,
      },
      {
        location: 'B14',
        isAvailable: false,
      },
      {
        location: 'B15',
        isAvailable: true,
      },
      {
        location: 'B16',
        isAvailable: true,
      },
      {
        location: 'B17',
        isAvailable: false,
      },
      {
        location: 'B18',
        isAvailable: false,
      },
    ],
  },
  {
    id: 'TI-3',
    departureDay: String(date),
    departureTime: '17:30',
    arrivalTime: '7:30',
    busType: 'Giường',
    emptySeat: '20 chỗ trống',
    price: '100000',
    expanded: '',
    departure: 'Hồ Chí Minh',
    destination: 'Vũng Tàu',
    downFloorSeat: [
      {
        location: 'A01',
        isAvailable: true,
      },
      {
        location: 'A02',
        isAvailable: true,
      },
      {
        location: 'A03',
        isAvailable: false,
      },
      {
        location: 'A04',
        isAvailable: false,
      },
      {
        location: 'A05',
        isAvailable: true,
      },
      {
        location: 'A06',
        isAvailable: false,
      },
      {
        location: 'A07',
        isAvailable: true,
      },
      {
        location: 'A08',
        isAvailable: false,
      },
      {
        location: 'A09',
        isAvailable: true,
      },
      {
        location: 'A10',
        isAvailable: true,
      },
      {
        location: 'A11',
        isAvailable: false,
      },
      {
        location: 'A12',
        isAvailable: true,
      },
      {
        location: 'A13',
        isAvailable: true,
      },
      {
        location: 'A14',
        isAvailable: true,
      },
      {
        location: 'A15',
        isAvailable: false,
      },
      {
        location: 'A16',
        isAvailable: false,
      },
      {
        location: 'A17',
        isAvailable: false,
      },
      {
        location: 'A18',
        isAvailable: false,
      },
    ],
    upFloorSeat: [
      {
        location: 'B01',
        isAvailable: true,
      },
      {
        location: 'B02',
        isAvailable: false,
      },
      {
        location: 'B03',
        isAvailable: true,
      },
      {
        location: 'B04',
        isAvailable: false,
      },
      {
        location: 'B05',
        isAvailable: true,
      },
      {
        location: 'B06',
        isAvailable: true,
      },
      {
        location: 'B07',
        isAvailable: false,
      },
      {
        location: 'B08',
        isAvailable: true,
      },
      {
        location: 'B09',
        isAvailable: true,
      },
      {
        location: 'B10',
        isAvailable: true,
      },
      {
        location: 'B11',
        isAvailable: true,
      },
      {
        location: 'B12',
        isAvailable: false,
      },
      {
        location: 'B13',
        isAvailable: true,
      },
      {
        location: 'B14',
        isAvailable: false,
      },
      {
        location: 'B15',
        isAvailable: true,
      },
      {
        location: 'B16',
        isAvailable: true,
      },
      {
        location: 'B17',
        isAvailable: false,
      },
      {
        location: 'B18',
        isAvailable: false,
      },
    ],
  },
]
