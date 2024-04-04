import { defineStore } from 'pinia'

interface SeatOrder {
  id: number
  seatName: string
  seatType: string
  timeTableId: number
  orderDetailId: number
  isAvailable: boolean
}
interface Ticket {
  timeTableId: number
  timeStated: string
  priceDetailId: number
  priceValue: number
  countEmptySeat: number
  routeId: number
  typeBusName: string
  transferTime: string
  fromName: string
  toName: string
  expanded: boolean
  endTime: string
  seatOrder: SeatOrder[]
}
interface Region {
  value: number
  title: string
}

export const useSeatStore = defineStore('seatStore', {
  state: () => ({
    selectedSeats: [] as string[],
    tickets: [] as Ticket[],
    selectedFrom: {
      title: '',
      value: -1,
    } as Region,
    selectedTo: {
      title: '',
      value: -1,
    } as Region,
    startDateRange: '',
    selectedTicket: -1,
  }),
  actions: {
    // Hành động để thêm ghế vào danh sách đã chọn
    toggleSeat(chair: SeatOrder) {
      const index = this.selectedSeats.indexOf(chair.seatName)

      if (index === -1)
        this.selectedSeats.push(chair.seatName)

      else
        this.selectedSeats.splice(index, 1)

      this.selectedSeats.sort()
    },

    // Hành động để xoá rỗng ghế
    clearSeats() {
      this.selectedSeats = []
      this.selectedTicket = -1
    },
    clearState() {
      this.selectedSeats = []
      this.selectedTicket = -1
      this.tickets = []
      this.selectedFrom = {
        title: '',
        value: -1,
      }
      this.selectedTo = {
        title: '',
        value: -1,
      }
      this.startDateRange = ''
      this.selectedTicket = -1
    },
  },
})
