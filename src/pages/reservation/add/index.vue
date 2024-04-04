<script setup lang="ts">
import { router } from '@/plugins/1.router'
import $api from '@/utils/api'
import { useSeatStore } from '@core/stores/seatStore'

interface Region {
  value: number
  title: string
}
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

const selectedFrom = ref('')
const selectedTo = ref('')
const startDateRange = ref('')
const selectedTicket = ref()
const tickets = ref([] as Ticket[])
const seatStore = useSeatStore()
const cities = ref([] as Region[])
const now = new Date()
const date = now.toLocaleDateString('fr-CA')

const handleTicketClick = (ticket: any) => {
  if (selectedTicket.value === '') {
    selectedTicket.value = ticket.timeTableId
    tickets.value.forEach(t => {
      if (t.timeTableId !== ticket.timeTableId)
        t.expanded = false
      else
        t.expanded = true
    })

    return
  }

  if (ticket.timeTableId !== selectedTicket.value) {
    tickets.value.forEach(t => {
      if (t.timeTableId !== ticket.timeTableId)
        t.expanded = false
      else
        t.expanded = true
    })
    selectedTicket.value = ticket.timeTableId
    seatStore.clearSeats()
  }
}

const getExpandedValue = (ticket: any) => {
  return selectedTicket.value === ticket.timeTableId ? 'selectedSeat' : undefined
}

const getColor = (isSelected: any, disabled: any) => {
  // Determine the appropriate color based on the state
  if (isSelected)
    return '#FB8C00'
  else if (disabled)
    return '#78909C'
  else
    return '#039BE5'
}

function handleOnClickSeat(chair: SeatOrder) {
  seatStore.toggleSeat(chair)
}

async function getRegion(parentId: number | null, regionStructureId: number) {
  const res = await $api('/api/region/find', {
    method: 'POST',
    data: {
      parentId,
      regionStructureId,
    },
  })

  const data = res.data.valueReponse.data

  cities.value = data.map((item: { id: any; fullName: any }) => ({
    value: item.id,
    title: item.fullName,
  }))
}
await getRegion(null, 1)

function handleRedirectConfirmPage(id: number) {
  router.push({
    name: 'reservation-add-confirm',
    query: {
      id,
      fromId: selectedFrom.value.value,
      toId: selectedTo.value.value,
    },
  })
}

async function searchTicket() {
  const res = await $api('/api/bustrip/get', {
    method: 'GET',
    params: {
      fromId: selectedFrom.value.value,
      toId: selectedTo.value.value,
      timeStarted: startDateRange.value,
    },
  })

  const { respType, valueReponse } = res.data
  if (respType === 200)
    tickets.value = valueReponse.data
}
function formatToTime(dateTimeString: any) {
  const dateformat = new Date(dateTimeString)

  return dateformat.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false })
}
function formatTime(timeString: any) {
  const [hours, minutes] = timeString.split(':')

  return `${hours}:${minutes}`
}
</script>

<template>
  <div>
    <VCard
      title="Tìm kiếm"
      class="mb-6"
    >
      <VCardText>
        <VRow>
          <!-- 👉 Chọn điểm đi -->
          <VCol
            cols="12"
            md="3"
          >
            <AppCombobox
              v-model="selectedFrom"
              :items="cities"
              label="Điểm đi"
            />
          </VCol>

          <!-- 👉 Chọn điểm đến -->
          <VCol
            cols="12"
            md="3"
          >
            <AppCombobox
              v-model="selectedTo"
              :items="cities"
              label="Điểm đến"
            />
          </VCol>

          <!-- 👉 DateRange filter -->
          <VCol
            cols="12"
            md="4"
          >
            <AppDateTimePicker
              v-model="startDateRange"
              label="Ngày khởi hành"
              clear-icon="tabler-x"
              :config="{ minDate: date }"
              clearable
            />
          </VCol>
          <!-- 👉 DateRange filter -->
          <VCol
            cols="12"
            md="2"
            class="mt-6"
          >
            <VBtn
              type="submit"
              class="me-3 px-10"
              @click="searchTicket"
            >
              Tìm kiếm
            </VBtn>
          </VCol>
        </VRow>
      </VCardText>
    </VCard>

    <VRow>
      <VCol
        md="3"
        cols="12"
      >
        <VRow>
          <VCol
            cols="12"
            md="12"
          >
            <VCard class="d-flex flex-column align-items-start">
              <VCardTitle class="text-center">
                Bộ lọc tìm kiếm
              </VCardTitle>
              <VDivider />
              <VCardText>
                Giờ đi
              </VCardText>
              <div class="ms-10">
                <VCheckbox label="Sáng sớm 00:00 - 06:00(0)" />
                <VCheckbox label="Buổi sáng 06:00 - 12:00(0)" />
                <VCheckbox label="Buổi chiều 12:00 - 18:00(0)" />
                <VCheckbox label="Buổi tối 18:00 - 24:00(0)" />
              </div>
              <VCardText>
                Loại xe
              </VCardText>
              <VChipGroup class="ms-2 d-flex flex-row">
                <VChip class="border py-1 px-2 mx-2">
                  Ghế
                </VChip>
                <VChip class="border py-1 px-2 mx-2">
                  Giường
                </VChip>
                <VChip class="border py-1 px-2 mx-2">
                  Limousine
                </VChip>
              </VChipGroup>
              <VLabel class="justify-center pb-5 text-error">
                <VIcon
                  icon="tabler-trash"
                  color="error"
                />
                Bỏ lọc
              </VLabel>
            </VCard>
          </VCol>
        </VRow>
      </VCol>

      <VCol
        lg="9"
        sm="12"
        md="9"
        cols="12"
      >
        <VCard>
          <VList lines="three">
            <template
              v-for="(ticket, index) of tickets"
              :key="ticket.timeTableId"
            >
              <VListItem>
                <VCard>
                  <VRow>
                    <VCol
                      cols="12"
                      md="8"
                    >
                      <VRow class="align-center mt-3">
                        <VCol
                          cols="12"
                          lg="3"
                        >
                          <VSheet class="text-h3 text-center ">
                            {{ formatToTime(ticket.timeStated) }}
                          </VSheet>
                        </VCol>
                        <VCol
                          cols="12"
                          lg="6"
                          class="d-flex flex-row align-center"
                        >
                          <VIcon
                            icon="tabler-circle-dot-filled"
                            class="me-2"
                          />
                          <VDivider :thickness="3" />
                          <span class="px-2">{{ formatTime(ticket.transferTime) }}</span>
                          <VDivider :thickness="3" />
                          <VIcon
                            icon="tabler-map-pin-filled"
                            class="ms-2"
                          />
                        </VCol>
                        <VCol
                          cols="12"
                          lg="3"
                        >
                          <VSheet class="text-h3 text-center ">
                            {{ formatToTime(ticket.endTime) }}
                          </VSheet>
                        </VCol>
                      </VRow>
                      <VRow>
                        <VCol
                          cols="12"
                          lg="3"
                        >
                          <VSheet class="text-h5 text-center ">
                            {{ ticket.fromName }}
                          </VSheet>
                        </VCol>
                        <VSpacer />
                        <VCol
                          cols="12"
                          lg="3"
                        >
                          <VSheet class="text-h5 text-center ">
                            {{ ticket.toName }}
                          </VSheet>
                        </VCol>
                      </VRow>
                    </VCol>
                    <VCol
                      cols="12"
                      md="4"
                    >
                      <VRow class="align-center mt-3">
                        <VCol
                          cols="12"
                          lg="6"
                        >
                          <VSheet class="text-h5 text-center ">
                            {{ ticket.typeBusName }}
                          </VSheet>
                        </VCol>
                        <VCol
                          cols="12"
                          lg="6"
                        >
                          <VSheet class="text-h6 text-center ">
                            {{ ticket.countEmptySeat }} chỗ trống
                          </VSheet>
                        </VCol>
                      </VRow>
                      <VCol
                        cols="12"
                        lg="12"
                      >
                        <VSheet class="text-h4 text-center text-error">
                          {{ ticket.priceValue }} vnd
                        </VSheet>
                      </VCol>
                    </VCol>
                  </VRow>
                  <VRow>
                    <VCol
                      cols="12"
                      lg="12"
                      md="12"
                      sm="12"
                    >
                      <VExpansionPanels v-model="ticket.expanded">
                        <VExpansionPanel :value="getExpandedValue(ticket)">
                          <VExpansionPanelTitle @click="handleTicketClick(ticket)">
                            Chọn ghế
                          </VExpansionPanelTitle>
                          <VExpansionPanelText>
                            <VRow>
                              <VCol
                                cols="12"
                                lg="12"
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
                                            toggle = () => {}, isSelected,
                                          }"
                                        >
                                          <VCard
                                            :color="getColor(isSelected, !chair.isAvailable)"
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
                                            isSelected, toggle = () => {},
                                          }"
                                        >
                                          <VCard
                                            :color="getColor(isSelected, !chair.isAvailable)"
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
                            <VRow
                              v-if="seatStore.selectedSeats.length > 0"
                              class="align-center"
                            >
                              <VCol
                                cols="12"
                                md="6"
                              >
                                <VSheet class="text-h4">
                                  {{ seatStore.selectedSeats.length }} vé
                                </VSheet>
                                <VSheet class="text-h5">
                                  {{ seatStore.selectedSeats.join(', ') }}
                                </VSheet>
                              </VCol>
                              <VSpacer />
                              <VCol
                                cols="12"
                                md="3"
                              >
                                <VSheet class="text-h3 text-center">
                                  Tổng tiền
                                </VSheet>
                                <VSheet class="text-h5 text-center text-primary">
                                  {{ seatStore.selectedSeats.length * Number(ticket.priceValue) }} vnd
                                </VSheet>
                              </VCol>
                              <VCol
                                cols="12"
                                md="1"
                              >
                                <VBtn @click="handleRedirectConfirmPage(ticket.timeTableId)">
                                  Đặt
                                </VBtn>
                              </VCol>
                            </VRow>
                          </VExpansionPanelText>
                        </VExpansionPanel>
                      </VExpansionPanels>
                    </VCol>
                  </VRow>
                </VCard>
                <VDivider v-if="index - 1" />
              </VListItem>
            </template>
          </VList>
        </VCard>
      </VCol>
    </VRow>
  </div>
</template>
