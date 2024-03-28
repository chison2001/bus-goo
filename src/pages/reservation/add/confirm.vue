<script setup lang="ts">
import { VForm } from 'vuetify/components/VForm'
import $api from '@/utils/api'

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

const selectedSeats = ref<string[]>([])
const refForm = ref<VForm>()
const fullName = ref('')
const email = ref('')
const phoneNumber = ref('')
const addreess = ref('')
const searchValue = ref('')
const route = useRoute('reservation-add-confirm')

const res = await $api('/api/bustrip/get-bus-trip', {
  method: 'GET',
  params: {
    timeTableId: route.query.id,
  },
})

const { valueReponse } = res.data
const ticket: Ticket = computed(() => valueReponse.data)

const seatOrders = route.query.seatOrders
if (seatOrders && typeof seatOrders === 'string') {
  // Phân tích chuỗi JSON và gán giá trị cho selectedSeats
  try {
    selectedSeats.value = JSON.parse(seatOrders)
  }
  catch (e) {
    console.error('Could not parse seatOrders:', e)
  }
}

const getColor = (disabled: any, seatName: any) => {
  // Determine the appropriate color based on the state
  if (selectedSeats.value.includes(seatName))
    return '#FB8C00'
  else if (disabled)
    return '#78909C'
  else
    return '#039BE5'
}

function handleOnClickSeat(chair: any) {
  // Kiểm tra xem selectedSeats có tồn tại và không phải là undefined
  if (selectedSeats !== undefined && selectedSeats.value) {
    // Nếu có, tiến hành xử lý các thao tác trên mảng selectedSeats
    const index = selectedSeats.value.indexOf(chair.seatName)
    if (index === -1)
      selectedSeats.value.push(chair.seatName)
    else
      selectedSeats.value.splice(index, 1)

    selectedSeats.value.sort()
  }
}
</script>

<template>
  <VRow>
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
              class="text-center"
            >
              <VItemGroup multiple>
                <VContainer>
                  <VRow>
                    <VCol
                      cols="12"
                      md="12"
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
              class="text-center"
            >
              <VItemGroup multiple>
                <VContainer>
                  <VRow>
                    <VCol
                      cols="12"
                      md="12"
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
            {{ selectedSeats.length }}
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
            {{ selectedSeats.join(', ') }}
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
            {{ selectedSeats.length * ticket.priceValue }}
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
        <VCardItem>
          <VForm
            ref="refForm"
            @submit.prevent="() => {}"
          >
            <VRow class="justify-center">
              <VCol
                cols="12"
                md="5"
                class="d-flex flex-row"
              >
                <AppTextField
                  v-model="searchValue"
                  placeholder="Tìm khách hàng"
                  :rules="[phoneNumberValidator]"
                />
                <VBtn class="ms-2">
                  Tìm kiếm
                </VBtn>
              </VCol>
            </VRow>
            <VRow class="justify-center">
              <VCol
                cols="12"
                md="3"
              >
                <AppTextField
                  v-model="fullName"
                  label="Tên khách hàng"
                  :rules="[requiredValidator]"
                />
              </VCol>
              <VCol
                cols="12"
                md="3"
              >
                <AppTextField
                  v-model="email"
                  label="Email"
                  :rules="[requiredValidator, emailValidator]"
                />
              </VCol>
            </VRow>
            <VRow class="justify-center">
              <VCol
                cols="12"
                md="3"
              >
                <AppTextField
                  v-model="phoneNumber"
                  label="Số điện thoại"
                  :rules="[requiredValidator, phoneNumberValidator]"
                />
              </VCol>
              <VCol
                cols="12"
                md="3"
              >
                <AppTextField
                  v-model="addreess"
                  label="Địa chỉ"
                  :rules="[requiredValidator]"
                />
              </VCol>
            </VRow>
            <VRow class="justify-center">
              <VCol
                cols="12"
                md="2"
                class="text-end"
              >
                <VBtn
                  block
                  size="large"
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
                  @click="refForm?.validate()"
                >
                  Đặt
                </VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardItem>
      </VCard>
    </VCol>
  </VRow>
</template>
