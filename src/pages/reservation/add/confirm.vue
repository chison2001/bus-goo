<script setup lang="ts">
import $api from '@/utils/api'
import { useSeatStore } from '@core/stores/seatStore'

interface SeatOrder {
  id: number
  seatName: string
  seatType: string
  timeTableId: number
  orderDetailId: number
  isAvailable: boolean
}

interface Station {
  value: number
  title: string
  subtitle: string
}

interface User {
  userId: number
  userCode: string
  fullName: string
  phone: number
  address: string
  status: boolean
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

interface Promotion {
  promotionDetailId: number
  promotionCode: string
  promotionLineName: string
  promotionType: number
  discount: number
  conditionApply: number
  maxDiscount: number
}

const seatStore = useSeatStore()
const searchValue = ref('')
const user = ref<User>()
const stationFrom = ref([] as Station[])
const stationTo = ref([] as Station[])
const route = useRoute('reservation-add-confirm')
const ticket = ref<Ticket>()
const router = useRouter()
const pickupPoint = ref()
const dropoffPoint = ref()
const error = ref()
const promotion = ref<Promotion>()

async function getTicket() {
  const res = await $api('/api/bustrip/get-bus-trip', {
    method: 'GET',
    params: {
      timeTableId: route.query.id,
    },
  })

  const { valueReponse } = res.data

  ticket.value = valueReponse.data
}

await getTicket()

async function getPromotion() {
  const res = await $api('/api/promotion/get-by-frice', {
    method: 'GET',
    params: {
      priceValue: (ticket.value?.priceValue ?? 0) * seatStore.selectedSeats.length,
    },
  })

  const { valueReponse } = res.data

  promotion.value = valueReponse.data
}

await getPromotion()

async function getUserByPhoneNumber(phoneNum: any) {
  if (user.value)
    user.value = undefined

  const response = await $api('/api/user/get-by-phone', {
    method: 'GET',
    params: {
      phone: phoneNum,
    },
  })

  const { valueReponse, respType } = response.data

  if (respType === 200)
    user.value = valueReponse.data
}

async function getStationFrom() {
  const res = await $api('/api/station/get', {
    method: 'GET',
    params: {
      regionDetailId: seatStore.selectedFrom.value,
    },
  })

  const data = res.data.valueReponse.data

  stationFrom.value = data.map((item: {
    name: string
    addressDescription: string
    address: string
    id: number
  }) => ({
    value: item.id,
    title: item.name,
    subtitle: `${item.addressDescription}, ${item.address}`,
  }))
}

async function getStationTo() {
  const res = await $api('/api/station/get', {
    method: 'GET',
    params: {
      regionDetailId: seatStore.selectedTo.value,
    },
  })

  const data = res.data.valueReponse.data

  stationTo.value = data.map((item: {
    name: string
    addressDescription: string
    address: string
    id: number
  }) => ({
    value: item.id,
    title: item.name,
    subtitle: `${item.addressDescription}, ${item.address}`,
  }))
}

await getStationFrom()
await getStationTo()

async function submit() {
  error.value = undefined
  if (seatStore.selectedSeats.length === 0) {
    error.value = 'Vui lòng chọn ghế'

    return
  }
  console.log(user.value)
  if (user.value?.userId === undefined) {
    error.value = 'Vui lòng thêm thông tin người dùng'

    return
  }
  if (pickupPoint.value === undefined) {
    error.value = 'Vui lòng thêm bến đi'

    return
  }
  if (dropoffPoint.value === undefined) {
    error.value = 'Vui lòng thêm bến đến'

    return
  }
  error.value = undefined

  const listSeatOrder: number[] = []

  seatStore.selectedSeats.forEach(seat => {
    ticket.value?.seatOrder.forEach(seatOrder => {
      if (seat === seatOrder.seatName)
        listSeatOrder.push(seatOrder.id)
    })
  })

  const response = await $api('/api/order/create', {
    method: 'POST',
    data: {
      userId: user.value?.userId,
      lstSeatOrderId: listSeatOrder,
      pickupPointId: pickupPoint.value,
      dropoffPointId: dropoffPoint.value,
    },
  })

  const { respType } = response.data
}

function formatDateString(dateString: string) {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')

  return `${hours}:${minutes} ${day}-${month}-${year}`
}

function formatPrice(value: number) {
  return `${value.toLocaleString('vi-VN')} VNĐ`
}
</script>

<template>
  <VRow>
    <VCol
      cols="12"
      md="8"
    >
      <VCard>
        <VCardText class="text-h4 font-weight-bold">
          Thông tin lượt đi
        </VCardText>
        <VCardText>
          <VRow class="justify-center">
            <div
              v-if="ticket"
              class="text-base"
            >
              <p>
                Tuyến xe:<span class="font-weight-bold"> {{ `${ticket.fromName} - ${ticket.toName}` }}</span>
              </p>
              <p>
                Thời gian xuất bến: <span class="font-weight-bold">{{ formatDateString(ticket.timeStated) }}</span>
              </p>
              <p>
                Số lượng ghế: <span class="font-weight-bold">{{ seatStore.selectedSeats.length }} Ghế</span>
              </p>
              <p>
                Số ghế: <span class="font-weight-bold">{{ seatStore.selectedSeats.join(', ') }}</span>
              </p>
              <p>
                Tổng tiền lượt đi: <span class="font-weight-bold">{{ formatPrice(seatStore.selectedSeats.length * Number(ticket.priceValue)) }}</span>
              </p>
            </div>
          </VRow>
        </VCardText>
      </VCard>
      <VCard class="my-7">
        <VCardTitle class="text-h4 font-weight-bold mt-4">
          Thông tin khách hàng
        </VCardTitle>
        <VCardItem>
          <VRow class="justify-center">
            <VCol
              cols="12"
              md="6"
              class="d-flex flex-row"
            >
              <AppTextField
                v-model="searchValue"
                placeholder="Tìm khách hàng"
              />
              <VBtn
                class="ms-2"
                @click="getUserByPhoneNumber(searchValue)"
              >
                Tìm kiếm
              </VBtn>
            </VCol>
          </VRow>
          <VRow class="justify-center">
            <div
              v-if="user"
              class="text-base"
            >
              <p>
                Họ và tên: <span class="font-weight-bold"> {{ user.fullName }}</span>
              </p>
              <p>
                Số điện thoại: <span class="font-weight-bold"> {{ user.phone }}
                </span>
              </p>
              <p>
                Địa chỉ: <span class="font-weight-bold"> {{ user.address }}</span>
              </p>
            </div>
            <div
              v-else
              class="py-3"
            >
              <h6 class="text-base font-weight-medium mb-2">
                Không tìm thấy người dùng
              </h6>

              <VBtn
                color="success"
                :to="{ name: 'user-add' }"
              >
                Thêm người dùng
              </VBtn>
            </div>
          </VRow>
        </VCardItem>
        <Row v-if="error">
          <VCol
            cols="12"
            md="12"
          >
            <VAlert
              color="error"
              icon="tabler-exclamation-circle"
            >
              {{ error }}
            </VAlert>
          </VCol>
        </Row>
        <VRow class="justify-center py-3">
          <VCol
            cols="12"
            md="2"
            class="text-end"
          >
            <VBtn
              block
              variant="outlined"
              color="secondary"
              rounded="lg"
              @click="router.go(-1)"
            >
              Trở lại
            </VBtn>
          </VCol>
          <VCol
            cols="12"
            md="2"
          >
            <VBtn
              type="submit"
              rounded="lg"
              block
              @click="submit"
            >
              Đặt
            </VBtn>
          </VCol>
        </VRow>
      </VCard>
    </VCol>
    <VCol
      cols="12"
      md="4"
    >
      <VCard>
        <VCardTitle class="text-h4 font-weight-bold mt-4">
          Thông tin khuyến mãi
        </VCardTitle>
        <VCardText class="text-body-1">
          <div v-if="promotion">
            <p>
              Tên chương trình: <span class="font-weight-bold">  {{ promotion?.promotionLineName }} </span>
            </p>
            <div
              v-if="promotion?.promotionType === 1"
              class="promotion-details"
            >
              <div>
                <div class="condition">
                  Giá mua tối thiểu để áp dụng <span class="font-weight-bold"> {{ formatPrice(promotion.conditionApply) }} </span>
                </div>
                <div class="discount">
                  Được giảm <span class="font-weight-bold">  {{ formatPrice(promotion.discount) }}</span>
                </div>
              </div>
            </div>

            <div
              v-if="promotion?.promotionType === 2"
              class="promotion-details"
            >
              <div>
                <div class="discount">
                  Giảm ngay<span class="font-weight-bold">  {{ promotion.discount }}</span> % khi đặt vé
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <p>Không có chương trình khuyến mãi nào đang hoạt động!</p>
          </div>
        </VCardText>
      </VCard>
      <VCard class="my-7">
        <VCardTitle class="text-h4 font-weight-bold mt-4">
          Thông tin đón trả
        </VCardTitle>
        <VCardItem>
          <h3 class="text-base font-weight-medium mb-2">
            Bến đi
          </h3>
          <AppSelect
            v-model="pickupPoint"
            :items="stationFrom"
            class="py-2"
          >
            <template #item="{ props, item }">
              <VListItem
                v-bind="props"
                :subtitle="item.raw.subtitle"
              />
            </template>
          </AppSelect>
          <h3 class="text-base font-weight-medium mb-2 pt-7">
            Bến đến
          </h3>
          <AppSelect
            v-model="dropoffPoint"
            :items="stationTo"
            class="py-2"
          >
            <template #item="{ props, item }">
              <VListItem
                v-bind="props"
                :subtitle="item.raw.subtitle"
              />
            </template>
          </AppSelect>
        </VCardItem>
      </VCard>
    </VCol>
  </VRow>
</template>
