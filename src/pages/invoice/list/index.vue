<script setup lang="ts">
import { VForm } from 'vuetify/components/VForm'
import { VDataTableServer } from 'vuetify/labs/VDataTable'
import $api from '@/utils/api'
import { paginationMeta } from '@api-utils/paginationMeta'
import { useSeatStore } from '@core/stores/seatStore'

const store = useSeatStore()
const selectedStatus = ref('1')
const selectedFromDate = ref('')
const selectedToDate = ref('')
const dialogCancelInvoice = ref(false)
const isFormValid = ref(false)
const reason = ref()
const refForm = ref<VForm>()
const isDialogVisible = ref(false)
const title = ref('')
const message = ref('')
const resErr = ref(false)
function handleDialogVisibility(value: boolean) {
  isDialogVisible.value = value
}

// Data table options
const itemPerPage = ref(10)
const page = ref(1)
const sortBy = ref('dsc')
const orderBy = ref('id')
let cancelID = -1

// Update data table options

// 👉 headers
const headers = [
  { title: 'Code', key: 'code' },
  { title: 'Tên người đặt', key: 'userName' },
  { title: 'Tuyến đường', key: 'busTrip' },
  { title: 'Ghế', key: 'strLstSeatName' },
  { title: 'Thời gian đặt', key: 'timeBooking' },
  { title: 'Tổng tiền', key: 'total' },
  { title: 'Hành động', key: 'actions', sortable: false },
]

onBeforeRouteLeave(to => {
  if (to.path === '/reservation/add')
    store.clearState()
})

// 👉 Fetch Invoices
const { data: orderData, execute: fetchInvoices } = await useApi<any>(createUrl('/api/invoice/find', {
  query: {
    status: selectedStatus,
    fromDate: selectedFromDate,
    toDate: selectedToDate,
    itemPerPage,
    page,
    sortBy,
    orderBy,
  },
}))

const updateOptions = (options: any) => {
  page.value = options.page
  if (options.sortBy[0]?.order !== undefined)
    sortBy.value = options.sortBy[0]?.order
  if (options.sortBy[0]?.key !== undefined)
    orderBy.value = options.sortBy[0]?.key
}

const promotions = computed(() => orderData.value.valueReponse.data.content)
const totalOrder = computed(() => orderData.value.valueReponse.data.totalElements)

const resolveUserStatusVariant = (stat: number) => {
  const statLowerCase = stat
  if (statLowerCase === 1)
    return { color: 'success', value: 'active' }
  if (statLowerCase === 0)
    return { color: 'secondary', value: 'inactive' }
}

const resolvePayVariant = (stat: number) => {
  const statLowerCase = stat
  if (statLowerCase === 1)
    return { color: 'success', value: 'đã thanh toán' }
  if (statLowerCase === 0)
    return { color: 'secondary', value: 'chưa thanh toán' }
}

// 👉 Delete Invoice
const deleteInvoice = async (id: number) => {
  dialogCancelInvoice.value = false

  const res = await $api('/api/invoice/return', {
    method: 'POST',
    data: {
      invoiceId: id,
      reason: reason.value,
    },
  })

  const data = res.data
  if (data.respType === 200) {
    isDialogVisible.value = true
    title.value = 'Thông báo'
    message.value = 'Huỷ hoá đơn thành công'
    resErr.value = false
  }
  else {
    isDialogVisible.value = true
    title.value = 'Đã xảy ra lỗi'
    message.value = data.responseMsg
    resErr.value = true
  }

  fetchInvoices()
}

function formatPrice(value: number) {
  return `${value.toLocaleString('vi-VN')} VNĐ`
}

function showCancelInvoice(id: number) {
  cancelID = id
  dialogCancelInvoice.value = true
}

const onSubmit = () => {
  refForm.value?.validate().then(({ valid }) => {
    if (valid) {
      deleteInvoice(cancelID)
      nextTick(() => {
        refForm.value?.reset()
        refForm.value?.resetValidation()
      })
    }
  })
}
</script>

<template>
  <section v-if="promotions">
    <!-- 👉 Invoice Filters  -->
    <VCard
      class="mb-3"
      fixed
    >
      <VCardText>
        <VRow>
          <!-- 👉 DateRange filter -->
          <VCol
            cols="12"
            md="6"
          >
            <AppDateTimePicker
              v-model="selectedFromDate"
              label="Ngày bắt đầu"
              clear-icon="tabler-x"
              clearable
              placeholder="Chọn ngày"
            />
          </VCol>

          <!-- 👉 DateRange filter -->
          <VCol
            cols="12"
            md="6"
          >
            <AppDateTimePicker
              v-model="selectedToDate"
              label="Ngày kết thúc"
              clear-icon="tabler-x"
              clearable
              placeholder="Chọn ngày"
            />
          </VCol>
        </VRow>
      </VCardText>
    </VCard>

    <VCard id="invoice-list">
      <VCardText class="d-flex align-center flex-wrap gap-4">
        <div class="me-3 d-flex gap-3 align-center">
          <AppSelect
            :model-value="itemPerPage"
            :items="[
              { value: 10, title: '10' },
              { value: 25, title: '25' },
              { value: 50, title: '50' },
              { value: 100, title: '100' },
              { value: -1, title: 'Tất cả' },
            ]"
            style="inline-size: 8rem;"
            @update:model-value="itemPerPage = parseInt($event, 10)"
          />
        </div>

        <VSpacer />
      </VCardText>
      <VDivider />

      <!-- SECTION Datatable -->
      <VDataTableServer
        v-model:items-per-page="itemPerPage"
        v-model:page="page"
        :items-length="totalOrder"
        :items="promotions"
        :headers="headers"
        height="330"
        class="text-no-wrap"
        @click:row="(item) => console.log(item)"
        @update:options="updateOptions"
      >
        <template #item.payStatus="{ item }">
          <VChip
            :color="resolvePayVariant(item.isPay)?.color"
            size="small"
            label
            class="text-capitalize"
          >
            {{ resolvePayVariant(item.isPay)?.value }}
          </VChip>
        </template>
        <template #item.total="{ item }">
          <span class="text-capitalize font-weight-medium">{{ formatPrice(item.total) }}</span>
        </template>

        <!-- Status -->
        <template #item.status="{ item }">
          <VChip
            :color="resolveUserStatusVariant(item.status)?.color"
            size="small"
            label
            class="text-capitalize"
          >
            {{ resolveUserStatusVariant(item.status)?.value }}
          </VChip>
        </template>

        <!-- Actions -->
        <template #item.actions="{ item }">
          <IconBtn @click="showCancelInvoice(item.id)">
            <VIcon
              icon="tabler-x"
              color="error"
            />
          </IconBtn>

          <IconBtn :to="{ name: 'invoice-view-id', params: { id: item.id } }">
            <VIcon icon="tabler-eye" />
          </IconBtn>
        </template>

        <!-- pagination -->

        <template #bottom>
          <VDivider />
          <div class="d-flex align-center justify-sm-space-between justify-center flex-wrap gap-3 pa-5 pt-3">
            <p class="text-sm text-disabled mb-0">
              {{ paginationMeta({ page, itemPerPage }, totalOrder) }}
            </p>

            <VPagination
              v-model="page"
              :length="Math.ceil(totalOrder / itemPerPage)"
              :total-visible="$vuetify.display.xs ? 1 : Math.ceil(totalOrder / itemPerPage)"
            >
              <template #prev="slotProps">
                <VBtn
                  variant="tonal"
                  color="default"
                  v-bind="slotProps"
                  :icon="false"
                >
                  Trước
                </VBtn>
              </template>

              <template #next="slotProps">
                <VBtn
                  variant="tonal"
                  color="default"
                  v-bind="slotProps"
                  :icon="false"
                >
                  Sau
                </VBtn>
              </template>
            </VPagination>
          </div>
        </template>
      </VDataTableServer>
    <!-- !SECTION -->
    </VCard>
  </section>
  <section v-else>
    <VCard>
      <VCardTitle>Không tìm thấy hoá đơn!!</VCardTitle>
    </VCard>
  </section>

  <VDialog
    v-model="dialogCancelInvoice"
    max-width="500px"
  >
    <VCard>
      <VCardTitle class="text-h5">
        Nhập lí do huỷ hoá đơn
      </VCardTitle>
      <VCardItem>
        <VForm
          ref="refForm"
          v-model="isFormValid"
          @submit.prevent="onSubmit"
        >
          <VRow>
            <VCol
              cols="12"
              md="12"
            >
              <AppTextarea
                v-model="reason"
                label="Lí do huỷ hoá đơn"
                :rules="[requiredValidator]"
              />
            </VCol>
          </VRow>
          <VCardActions>
            <VSpacer />
            <VBtn
              color="blue-darken-1"
              variant="text"
              @click="dialogCancelInvoice = false"
            >
              Cancel
            </VBtn>
            <VBtn
              color="blue-darken-1"
              variant="text"
              type="submit"
            >
              OK
            </VBtn>
            <VSpacer />
          </VCardActions>
        </VForm>
      </VCardItem>
    </VCard>
  </VDialog>
  <ReponseDialog
    :is-dialog-visible="isDialogVisible"
    :title="title"
    :message="message"
    link="/invoice/list"
    :is-error="resErr"
    @update:is-dialog-visible="handleDialogVisibility"
  />
</template>

<style lang="scss">
#invoice-list {
  .invoice-list-actions {
    inline-size: 8rem;
  }

  .invoice-list-filter {
    inline-size: 12rem;
  }
}
</style>
