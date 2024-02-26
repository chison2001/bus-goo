// 👉 Invoice
export interface Ticket {
  id: string
  departureDay: string
  departureTime: string
  arrivalTime: string
  busType: string
  emptySeat: string
  price: string
  departure: string
  destination: string
  upFloorSeat: Seat[]
  downFloorSeat: Seat[]
  expanded: string
}

export interface Seat {
  location: string
  isAvailable: boolean
}
