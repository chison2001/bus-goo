<script setup lang="ts">
import { register } from 'swiper/element/bundle'
import { router } from '@/plugins/1.router'
import $api from '@/utils/api'
import { useSeatStore } from '@core/stores/seatStore'

register()

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
const cities = ref([] as Region[])
const promotions = ref([] as Promotion[])
const now = new Date()
const date = now.toLocaleDateString('fr-CA')

function formatPrice(value: number) {
  return `${value.toLocaleString('vi-VN')} VNĐ`
}

const handleTicketClick = (ticket: any) => {
  if (seatStore.selectedTicket === -1) {
    seatStore.selectedTicket = ticket.timeTableId
    seatStore.tickets.forEach(t => {
      if (t.timeTableId !== ticket.timeTableId)
        t.expanded = false
      else
        t.expanded = true
    })

    return
  }

  if (ticket.timeTableId !== seatStore.selectedTicket) {
    seatStore.tickets.forEach(t => {
      if (t.timeTableId !== ticket.timeTableId)
        t.expanded = false
      else
        t.expanded = true
    })
    seatStore.selectedTicket = ticket.timeTableId
    seatStore.clearSeats()
  }
}

const getExpandedValue = (ticket: any) => {
  return seatStore.selectedTicket === ticket.timeTableId ? 'selectedSeat' : undefined
}

const getColor = (disabled: any, seatName: any) => {
  if (seatStore.selectedSeats.includes(seatName))
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
    },
  })
}

async function searchTicket() {
  const res = await $api('/api/bustrip/get', {
    method: 'GET',
    params: {
      fromId: seatStore.selectedFrom.value,
      toId: seatStore.selectedTo.value,
      timeStarted: seatStore.startDateRange,
    },
  })

  const { respType, valueReponse } = res.data
  if (respType === 200)
    seatStore.tickets = valueReponse.data
}
async function getCurrentPromotion() {
  const res = await $api('/api/promotion/get-current-promotion', {
    method: 'GET',
  })

  const { respType, valueReponse } = res.data
  if (respType === 200)
    promotions.value = valueReponse.data
}
await getCurrentPromotion()
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
              v-model="seatStore.selectedFrom"
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
              v-model="seatStore.selectedTo"
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
              v-model="seatStore.startDateRange"
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
        md="12"
        lg="9"
        sm="12"
        cols="12"
      >
        <VCard v-if="seatStore.tickets.length > 0">
          <VList lines="three">
            <template
              v-for="(ticket, index) of seatStore.tickets"
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
                            color="#388E3C"
                            class="me-2"
                          />
                          <VDivider :thickness="2" />
                          <VModelText class="text-center w-100">
                            <span>{{ formatTime(ticket.transferTime) }}</span>
                            <br>
                            <span>dự kiến</span>
                          </VModelText>
                          <VDivider :thickness="2" />
                          <VIcon
                            icon="tabler-map-pin-filled"
                            color="#F57C00"
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
                          {{ formatPrice(ticket.priceValue) }}
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
                                <VSheet class="text-h5 text-center text-error">
                                  {{ formatPrice(seatStore.selectedSeats.length * Number(ticket.priceValue)) }}
                                </VSheet>
                              </VCol>
                              <VCol
                                cols="12"
                                md="2"
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
        <VCard v-else>
          <VCardText>
            Không tìm thấy vé
          </VCardText>
        </VCard>
      </VCol>
      <VCol
        md="12"
        lg="3"
        sm="12"
        cols="12"
      >
        <!-- 👉 Customer Review Swiper -->
        <div class="swiper-reviews-carousel py-4">
          <!-- eslint-disable vue/attribute-hyphenation -->
          <swiper-container
            slides-per-view="1"
            space-between="5"
            loop="true"
            autoplay-delay="3000"
            autoplay-disable-on-interaction="false"
            events-prefix="swiper-"
            :injectStyles="[
              `
                    .swiper{
                      padding: 0;
                    }
                    .swiper-button-next, .swiper-button-prev{
                      visibility: hidden;
                    }
                  `,
            ]"
            navigation="{
                  nextEl: '.swiper-button-next',
                  prevEl: '.swiper-button-prev',
                }"
            :breakpoints="{
              1280: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              960: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              600: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
            }"
          >
            <swiper-slide
              v-for="(data, index) in promotions"
              :key="index"
            >
              <VCard class="promotion-card">
                <VCardText class="card-text">
                  <div class="title">
                    Chương trình khuyến mãi
                  </div>
                  <h5 class="subtitle">
                    {{ data.promotionLineName }}
                  </h5>

                  <div
                    v-if="data.promotionType === 1"
                    class="promotion-details"
                  >
                    <div>
                      <div class="condition">
                        Đặt vé với giá trị hơn {{ formatPrice(data.conditionApply) }}
                      </div>
                      <div class="discount">
                        Giảm ngay {{ formatPrice(data.discount) }}
                      </div>
                    </div>
                  </div>

                  <div
                    v-if="data.promotionType === 2"
                    class="promotion-details"
                  >
                    <div>
                      <div class="discount">
                        Giảm ngay {{ data.discount }} % khi đặt vé
                      </div>
                    </div>
                  </div>
                </VCardText>
              </VCard>
            </swiper-slide>
          </swiper-container>
        </div>
      </VCol>
    </VRow>
  </div>
</template>

<style lang="scss" scoped>
@use "swiper/css/bundle";

swiper-container::part(bullet-active) {
  border-radius: 6px;
  background-color: rgba(var(--v-theme-on-background), var(--v-disabled-opacity));
  inline-size: 38px;
}

swiper-container::part(bullet) {
  background-color: rgba(var(--v-theme-on-background));
}

.swiper-reviews-carousel {
  swiper-container {
    .swiper {
      padding-block-end: 3rem;
    }

    .swiper-button-next{
      display: none;
    }
  }

  swiper-slide {
    block-size: auto;
    opacity: 1;
  }
}
</style>

<style lang="scss" scoped>
.swiper-divider{
  position: absolute;
  inset-block-end: 6rem;
}

.customer-reviews {
  margin-block: 5rem;
}

@media (max-width: 600px){
  .customer-reviews{
    margin-block: 4rem;
  }
}

#customer-review{
  border-radius: 3.75rem 3.75rem 0 0;
  background-color: rgb(var(--v-theme-background));
}

.section-title::after{
  position: absolute;
  background: url('../../../assets/images/front-pages/icons/section-title-icon.png') no-repeat left bottom/contain;
  background-size: contain;
  block-size: 100%;
  content: '';
  font-weight: 700;
  inline-size: 120%;
  inset-block-end: 0;
  inset-inline-start: -12%;
}
.promotion-card {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease-in-out;
  cursor: pointer;
  &:hover {
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
}

.card-text {
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.title {
  font-size: 1.5em;
  font-weight: bold;
  color: #333;
  margin-bottom: 16px;
}

.subtitle {
  font-size: 1.1em;
  margin-bottom: 32px;
  color: #555;
}

.promotion-details {
  display: flex;
  align-items: center;
  gap: 8px;
}

.condition,
.discount {
  font-size: 0.95em;
  color: #333;
  font-weight: 500;
}
</style>
