<script setup lang="ts">
import { router } from '@/plugins/1.router'
import { database } from '@/plugins/fake-api/handlers/apps/ticket/db'
import type { Seat } from '@/plugins/fake-api/handlers/apps/ticket/types'

const start = ref('')
const arrive = ref('')
const startDateRange = ref('')
const selectedTicket = ref('')
const tickets = database
const selectedSeats = ref<string[]>([])

const handleTicketClick = (ticket: any, target: string) => {
  if (selectedTicket.value === '') {
    selectedTicket.value = ticket.id
    tickets.forEach(t => {
      if (t.id === ticket.id)
        t.expanded = target
    })

    return
  }

  if (ticket.id !== selectedTicket.value) {
    tickets.forEach(t => {
      if (t.id === ticket.id)
        t.expanded = target
      else
        t.expanded = ''
    })
    selectedTicket.value = ticket.id
    selectedSeats.value = []
  }
}

const getExpandedValue = (ticketId: string) => {
  return selectedTicket.value === ticketId ? 'selectedSeat' : undefined
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

function handleOnClickSeat(chair: Seat) {
  // Kiểm tra xem ghế đã được chọn trước đó chưa
  const index = selectedSeats.value.indexOf(chair.location)

  // Nếu ghế chưa được chọn trước đó, thêm vào mảng selectedSeats
  if (index === -1) {
    selectedSeats.value.push(chair.location)
  }
  else {
    // Nếu ghế đã được chọn trước đó, xoá khỏi mảng selectedSeats
    selectedSeats.value.splice(index, 1)
  }
  selectedSeats.value.sort()
}

function handleRedirectConfirmPage() {
  router.push({
    name: 'reservation-add-confirm',
  })
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
            <AppTextField
              v-model="start"
              label="Điểm đi"
              placeholder="Hồ Chí Minh"
            />
          </VCol>

          <!-- 👉 Chọn điểm đến -->
          <VCol
            cols="12"
            md="3"
          >
            <AppTextField
              v-model="arrive"
              label="Điểm đến"
              placeholder="Đà Lạt"
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
              :key="ticket.id"
            >
              <VListItem @click="handleTicketClick(ticket, 'selectedSeat')">
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
                            {{ ticket.departureTime }}
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
                          <span class="px-2">14:30</span>
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
                            {{ ticket.arrivalTime }}
                          </VSheet>
                        </VCol>
                      </VRow>
                      <VRow>
                        <VCol
                          cols="12"
                          lg="3"
                        >
                          <VSheet class="text-h5 text-center ">
                            {{ ticket.departure }}
                          </VSheet>
                        </VCol>
                        <VSpacer />
                        <VCol
                          cols="12"
                          lg="3"
                        >
                          <VSheet class="text-h5 text-center ">
                            {{ ticket.destination }}
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
                            {{ ticket.busType }}
                          </VSheet>
                        </VCol>
                        <VCol
                          cols="12"
                          lg="6"
                        >
                          <VSheet class="text-h6 text-center ">
                            {{ ticket.emptySeat }}
                          </VSheet>
                        </VCol>
                      </VRow>
                      <VCol
                        cols="12"
                        lg="12"
                      >
                        <VSheet class="text-h4 text-center text-error">
                          {{ ticket.price }} vnd
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
                      <VExpansionPanels :model-value="ticket.expanded">
                        <VExpansionPanel :value="getExpandedValue(ticket.id)">
                          <VExpansionPanelTitle>Chọn ghế</VExpansionPanelTitle>
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
                                        v-for="(chair, i) in ticket.downFloorSeat"
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
                                                {{ chair.location }}
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
                                        v-for="(chair, i) in ticket.upFloorSeat"
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
                                                {{ chair.location }}
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
                              v-if="selectedSeats.length > 0"
                              class="align-center"
                            >
                              <VCol
                                cols="12"
                                md="6"
                              >
                                <VSheet class="text-h4">
                                  {{ selectedSeats.length }} vé
                                </VSheet>
                                <VSheet class="text-h5">
                                  {{ selectedSeats.join(', ') }}
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
                                  {{ selectedSeats.length * Number(ticket.price) }} vnd
                                </VSheet>
                              </VCol>
                              <VCol
                                cols="12"
                                md="1"
                              >
                                <VBtn @click="handleRedirectConfirmPage">
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
