<script setup lang="ts">
import { VDataTableServer } from 'vuetify/labs/VDataTable'
import { VCardText } from 'vuetify/lib/components/index.mjs'
import $api from '@/utils/api'
import { paginationMeta } from '@api-utils/paginationMeta'

const revenues = ref()
const totalRevenues = ref()
const selectedFromDate = ref('')
const selectedToDate = ref('')
const itemPerPage = ref(10)
const page = ref(1)
const sortBy = ref('busName')
const orderBy = ref('dsc')

const updateOptions = (options: any) => {
  page.value = options.page
  if (options.sortBy[0]?.order !== undefined)
    sortBy.value = options.sortBy[0]?.order
  if (options.sortBy[0]?.key !== undefined)
    orderBy.value = options.sortBy[0]?.key
}

// 👉 headers
const headers = [
  { title: 'Code', key: 'busCode' },
  { title: 'Tên xe', key: 'busName' },
  { title: 'Loại xe', key: 'busType' },
  { title: 'Doanh thu trước chiết khấu', key: 'ticketPrice' },
  { title: 'Chiết khấu', key: 'discount' },
  { title: 'Doanh thu sau chiết khấu', key: 'revenue' },
]

// 👉 Fetch Invoices

async function getRevenue() {
  const res = await $api('/api/report/sales-by-bus/page', {
    method: 'GET',
    params: {
      fromDate: selectedFromDate.value,
      toDate: selectedToDate.value,
      itemPerPage: itemPerPage.value,
      page: page.value,
      sortBy: sortBy.value,
      orderBy: orderBy.value,
    },
  })

  const { valueReponse } = res.data

  revenues.value = valueReponse.data.content

  totalRevenues.value = revenues.value.length
}
async function download() {
  try {
    const response = await $api('/api/report/sales-by-bus', {
      method: 'GET',
      params: {
        fromDate: selectedFromDate.value,
        toDate: selectedToDate.value,
      },
    })

    const name = response.data.valueReponse.fileName

    console.log('File name received:', name)

    const downloadResponse = await $api.get('/api/report/download', {
      params: { fileName: name },
      responseType: 'blob',
    })

    const fileURL = window.URL.createObjectURL(new Blob([downloadResponse.data]))
    const fileLink = document.createElement('a')

    fileLink.href = fileURL
    fileLink.setAttribute('download', name)
    document.body.appendChild(fileLink)
    fileLink.click()

    document.body.removeChild(fileLink)
    window.URL.revokeObjectURL(fileURL)
  }
  catch (error) {
    console.error('Download error:', error)

    // Xử lý lỗi tải xuống tại đây
  }
}

function formatCurrency(amount: any) {
  return amount ? `${amount.toLocaleString('vi-VN')} VND` : '0 VND'
}
</script>

<template>
  <VCard id="invoice-list">
    <VCardTitle class="text-h2 text-center font-weight-bold my-8">
      Thống kê doanh thu theo tuyến đường
    </VCardTitle>
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

        <VSpacer />

        <AppDateTimePicker
          v-model="selectedFromDate"
          clear-icon="tabler-x"
          clearable
          placeholder="Chọn ngày bắt đầu"
          style="inline-size: 15rem;"
        />
        <AppDateTimePicker
          v-model="selectedToDate"
          clear-icon="tabler-x"
          clearable
          :config="{ minDate: selectedFromDate }"
          placeholder="Chọn ngày kết thúc"
          style="inline-size: 15rem;"
        />
        <VBtn

          prepend-icon="tabler-search"
          @click="getRevenue"
        >
          Tìm kiếm
        </VBtn>
      </div>

      <VSpacer />

      <div class="d-flex align-center flex-wrap gap-4">
        <!-- 👉 Create invoice -->
        <VBtn
          prepend-icon="tabler-screen-share"
          @click="download"
        >
          Xuất excel
        </VBtn>
      </div>
      <VDivider />

      <!-- SECTION Datatable -->
      <VDataTableServer
        v-model:items-per-page="itemPerPage"
        v-model:page="page"
        :items-length="totalRevenues"
        :items="revenues"
        :headers="headers"
        no-data-text="Vui lòng chọn ngày để hiển thị dữ liệu"
        height="330"
        class="text-no-wrap"
        @click:row="(item) => console.log(item)"
        @update:options="updateOptions"
      >
        <template #item.ticketPrice="{ item }">
          {{ formatCurrency(item.ticketPrice) }}
        </template>
        <template #item.revenue="{ item }">
          {{ formatCurrency(item.revenue) }}
        </template>
        <template #bottom>
          <VDivider />
          <div class="d-flex align-center justify-sm-space-between justify-center flex-wrap gap-3 pa-5 pt-3">
            <p class="text-sm text-disabled mb-0">
              {{ paginationMeta({ page, itemPerPage }, totalRevenues) }}
            </p>

            <VPagination
              v-model="page"
              :length="Math.ceil(totalRevenues / itemPerPage)"
              :total-visible="$vuetify.display.xs ? 1 : Math.ceil(totalRevenues / itemPerPage)"
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
    </vcardtext>
  </VCard>
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
