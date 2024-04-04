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

const getColor = (disabled: any, seatName: any) => {
  if (seatStore.selectedSeats.includes(seatName))
    return '#FB8C00'
  else if (disabled)
    return '#78909C'
  else
    return '#039BE5'
}

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
function handleOnClickSeat(chair: any) {
  seatStore.toggleSeat(chair)
}

async function getStationFrom() {
  const res = await $api('/api/station/get', {
    method: 'GET',
    params: {
      regionDetailId: route.query.fromId,
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
      regionDetailId: route.query.toId,
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

  router.push('/reservation/list')
}
</script>

<template>
  <VRow v-if="ticket">
    <VCol
      cols="12"
      md="9"
    >
      <VCard>
        <VCardText class="text-h3 font-weight-bold">
          Chọn ghế
        </VCardText>
        <VCardText>
          <VRow>
            <VCol
              cols="12"
              md="12"
              class="justify-center d-flex flex-row"
            >
              <div class="d-flex flex-row mx-5">
                <VIcon
                  icon="tabler-rectangle-filled"
                  color="#78909C"
                  class="me-3"
                />
                <VSheet>
                  đã đặt
                </VSheet>
              </div>
              <div class="d-flex flex-row mx-5">
                <VIcon
                  icon="tabler-rectangle-filled"
                  color="#FB8C00"
                  class="me-3"
                />
                <VSheet>
                  đang chọn
                </VSheet>
              </div>
              <div class="d-flex flex-row mx-5">
                <VIcon
                  icon="tabler-rectangle-filled"
                  color="#039BE5"
                  class="me-3"
                />
                <VSheet>
                  còn trống
                </VSheet>
              </div>
            </VCol>
          </VRow>
          <VRow class="justify-center">
            <VCol
              md="4"
              mb="12"
              class="text-center"
            >
              <VItemGroup multiple>
                <VContainer>
                  <VRow>
                    <VCol
                      cols="12"
                      mb="12"
                    >
                      <VSheet class="text-h3 flex-grow-1 text-center">
                        Tầng dưới
                      </VSheet>
                    </VCol>
                    <VCol
                      v-for="(chair, i) in ticket.seatOrder.filter((seat: SeatOrder) => seat.seatType === 'D')"
                      :key="i"
                      cols="12"
                      md="4"
                      mb="12"
                    >
                      <VItem
                        v-slot="{
                          toggle = () => {},
                        }"
                      >
                        <VCard
                          :color="getColor(!chair.isAvailable, chair.seatName)"
                          class="d-flex align-center"
                          height="50"
                          width="50"
                          :disabled="!chair.isAvailable"
                          @click="toggle(), handleOnClickSeat(chair)"
                        >
                          <VScrollYTransition>
                            <div class="text-h5 flex-grow-1 text-center">
                              {{ chair.seatName }}
                            </div>
                          </VScrollYTransition>
                        </VCard>
                        <VSpacer />
                      </VItem>
                    </VCol>
                  </VRow>
                </VContainer>
              </VItemGroup>
            </VCol>
            <VCol
              md="4"
              mb="12"
              class="text-center"
            >
              <VItemGroup multiple>
                <VContainer>
                  <VRow>
                    <VCol
                      cols="12"
                      mb="12"
                    >
                      <VSheet class="text-h3 flex-grow-1 text-center">
                        Tầng trên
                      </VSheet>
                    </VCol>
                    <VCol
                      v-for="(chair, i) in ticket.seatOrder.filter((seat: SeatOrder) => seat.seatType === 'T')"
                      :key="i"
                      cols="12"
                      md="4"
                      mb="12"
                    >
                      <VItem
                        v-slot="{
                          toggle = () => {},
                        }"
                      >
                        <VCard
                          :color="getColor(!chair.isAvailable, chair.seatName)"
                          class="d-flex align-center"
                          height="50"
                          width="50"
                          :disabled="!chair.isAvailable"
                          @click="toggle(), handleOnClickSeat(chair)"
                        >
                          <VScrollYTransition>
                            <div class="text-h5 flex-grow-1 text-center">
                              {{ chair.seatName }}
                            </div>
                          </VScrollYTransition>
                        </VCard>
                        <VSpacer />
                      </VItem>
                    </VCol>
                  </VRow>
                </VContainer>
              </VItemGroup>
            </VCol>
          </VRow>
        </VCardText>
      </VCard>
    </VCol>
    <VCol
      cols="12"
      md="3"
    >
      <VCard class="sticky-top">
        <VCardTitle class="text-h5 font-weight-bold">
          Thông tin lượt đi
        </VCardTitle>
        <VRow class="px-2">
          <VCol
            cols="12"
            md="5"
          >
            Tuyến xe
          </VCol>
          <VCol
            cols="12"
            md="7"
            class="text-end"
          >
            {{ `${ticket.fromName} - ${ticket.toName}` }}
          </VCol>
        </VRow>
        <VRow class="px-2">
          <VCol
            cols="12"
            md="5"
          >
            Thời gian
          </VCol>
          <VCol
            cols="12"
            md="7"
            class="text-end"
          >
            {{ ticket.timeStated }}
          </VCol>
        </VRow>
        <VRow class="px-2">
          <VCol
            cols="12"
            md="5"
          >
            Số lượng ghế
          </VCol>
          <VCol
            cols="12"
            md="7"
            class="text-end"
          >
            {{ seatStore.selectedSeats.length }}
          </VCol>
        </VRow>
        <VRow class="px-2">
          <VCol
            cols="12"
            md="5"
          >
            Số ghế
          </VCol>
          <VCol
            cols="12"
            md="7"
            class="text-end"
          >
            {{ seatStore.selectedSeats.join(', ') }}
          </VCol>
        </VRow>
        <VRow class="px-2">
          <VCol
            cols="12"
            md="5"
          >
            Tổng tiền
          </VCol>
          <VCol
            cols="12"
            md="7"
            class="text-end"
          >
            {{ seatStore.selectedSeats.length * ticket.priceValue }}
          </VCol>
        </VRow>
      </VCard>
    </VCol>
  </VRow>
  <VRow>
    <VCol
      cols="12"
      md="9"
    >
      <VCard>
        <VCardText class="text-h3 font-weight-bold">
          Thông tin khách hàng
        </VCardText>
        <VRow>
          <VCol
            cols="12"
            md="6"
            mb="9"
          >
            <VCardItem>
              <VRow class="justify-center">
                <VCol
                  cols="12"
                  md="10"
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
              <VRow class="justify-center py-2">
                <div
                  v-if="user"
                  class="text-base"
                >
                  <h6 class="text-base font-weight-medium mb-2">
                    Họ và tên
                  </h6>

                  <p class="mb-1">
                    {{ user.fullName }}
                  </p>

                  <VDivider class="my-4" />

                  <h6 class="text-base font-weight-medium mb-2">
                    Số điện thoại
                  </h6>

                  <p class="mb-1">
                    {{ user.phone }}
                  </p>

                  <VDivider class="my-4" />

                  <h6 class="text-base font-weight-medium mb-2">
                    Địa chỉ
                  </h6>

                  <p class="mb-1">
                    {{ user.address }}
                  </p>
                </div>
                <div
                  v-else
                  class="py-2"
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
          </VCol>
          <VDivider
            vertical
            :thickness="2"
          />
          <VCol
            cols="12"
            md="5"
            mb="12"
          >
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
            <h3 class="text-base font-weight-medium mb-2 pt-15">
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
          </VCol>
        </VRow>
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
              size="large"
              @click="router.go(-1); seatStore.clearSeats()"
            >
              Huỷ
            </VBtn>
          </VCol>
          <VCol
            cols="12"
            md="2"
          >
            <VBtn
              type="submit"
              size="large"
              block
              @click="submit"
            >
              Đặt
            </VBtn>
          </VCol>
        </VRow>
      </VCard>
    </VCol>
  </VRow>
</template>
