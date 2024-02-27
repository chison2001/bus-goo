<script setup lang="ts">
import { VForm } from 'vuetify/components/VForm'
import { database } from '@/plugins/fake-api/handlers/apps/ticket/db'

const tickets = database
const now = new Date()
const date = now.toLocaleDateString('es-CL')

const selectedSeats = ref<string[]>([])
const refForm = ref<VForm>()
const fullName = ref('')
const email = ref('')
const phoneNumber = ref('')
const addreess = ref('')
const searchValue = ref('')

const getColor = (isSelected: any, disabled: any) => {
  // Determine the appropriate color based on the state
  if (isSelected)
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
    const index = selectedSeats.value.indexOf(chair.location)

    if (index === -1)
      selectedSeats.value.push(chair.location)
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
                      v-for="(chair, i) in tickets[0].downFloorSeat"
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
                      v-for="(chair, i) in tickets[0].upFloorSeat"
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
            {{ tickets[0].departure.trim() }} - {{ tickets[0].destination.trim() }}
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
            {{ date }}
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
            {{ selectedSeats.length * Number(tickets[0].price) }}
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
