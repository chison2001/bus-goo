<script setup lang="ts">
import { VDataTableServer } from 'vuetify/labs/VDataTable'
import { paginationMeta } from '@api-utils/paginationMeta'
import { useSeatStore } from '@core/stores/seatStore'

const store = useSeatStore()
const selectedStatus = ref('1')
const selectedFromDate = ref('')
const selectedToDate = ref('')

// Data table options
const itemPerPage = ref(10)
const page = ref(1)
const sortBy = ref('dsc')
const orderBy = ref('id')

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

function formatPrice(value: number) {
  return `${value.toLocaleString('vi-VN')} VNĐ`
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
