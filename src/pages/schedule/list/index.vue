<script setup lang="ts">
import { VDataTableServer } from 'vuetify/labs/VDataTable'
import { VCardText } from 'vuetify/lib/components/index.mjs'
import $api from '@/utils/api'
import { paginationMeta } from '@api-utils/paginationMeta'

const selectedStatus = ref('')
const selectedDepartureDate = ref('')

interface Region {
  value: number
  title: string
}
const selectedFrom = ref()
const selectedTo = ref()
const from = ref()
const to = ref()

// Data table options
const itemPerPage = ref(10)
const page = ref(1)
const sortBy = ref()
const orderBy = ref()
const cities = ref([] as Region[])

// Update data table options
const updateOptions = (options: any) => {
  page.value = options.page
  sortBy.value = options.sortBy[0]?.order
  orderBy.value = options.sortBy[0]?.key
}

// 👉 headers
const headers = [
  { title: 'Code', key: 'code' },
  { title: 'Tuyến đường', key: 'routeDescription' },
  { title: 'Tên xe', key: 'busName' },
  { title: 'Loại xe', key: 'busType' },
  { title: 'Thời gian chạy', key: 'timeTransfer' },
  { title: 'Thời gian khởi hành', key: 'timeStarted' },
  { title: 'Trạng thái', key: 'status' },
  { title: 'Hành động', key: 'actions', sortable: false },
]

const status = [
  { title: 'Active', value: 1 },
  { title: 'Inactive', value: 0 },
]

// 👉 Fetch Invoices
const { data: routeData, execute: fetchRoutes } = await useApi<any>(createUrl('api/timetable/find', {
  query: {
    status: selectedStatus,
    departureDate: selectedDepartureDate,
    fromId: from,
    toId: to,
    itemPerPage,
    page: page.value - 1,
    sortBy,
    orderBy,
  },
}))

const routes = computed(() => routeData.value.valueReponse.data.content)
const totalPromotions = computed(() => routeData.value.valueReponse.data.totalElements)

const resolveUserStatusVariant = (stat: number) => {
  const statLowerCase = stat
  if (statLowerCase === 1)
    return { color: 'success', value: 'active' }
  if (statLowerCase === 0)
    return { color: 'secondary', value: 'inactive' }
}

watch(selectedFrom, () => from.value = selectedFrom.value?.value)
watch(selectedTo, () => to.value = selectedTo.value?.value)

// 👉 Delete Invoice
const deleteInvoice = async (id: number) => {
  await $api(`/apps/invoice/${id}`, { method: 'DELETE' })

  fetchRoutes()
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

function formatTime(timeString: string) {
  const time = new Date(`2000-01-01T${timeString}`)

  return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

function formatDateTime(DateTimeString: string) {
  const time = new Date(DateTimeString)

  return `${time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} ${time.toLocaleDateString()}`
}
</script>

<template>
  <section v-if="routes">
    <!-- 👉 Invoice Filters  -->
    <VCard
      title="Bộ lọc"
      class="mb-6"
    >
      <VCardText>
        <VRow>
          <!-- 👉 Status filter -->
          <VCol
            cols="12"
            md="3"
          >
            <AppSelect
              v-model="selectedStatus"
              label="Chọn trạng thái"
              placeholder="Chọn trạng thái"
              clearable
              clear-icon="tabler-x"
              :items="status"
            />
          </VCol>
          <!-- 👉 Status filter -->
          <VCol
            cols="12"
            md="3"
          >
            <AppDateTimePicker
              v-model="selectedDepartureDate"
              label="Chọn thời gian khởi hành"
              :config="{ enableTime: true, dateFormat: 'Y-m-dTH:i' }"
              clearable
              clear-icon="tabler-x"
            />
          </VCol>

          <!-- 👉 DateRange filter -->
          <VCol
            cols="12"
            md="3"
          >
            <AppCombobox
              v-model="selectedFrom"
              :items="cities"
              label="Điểm khởi hành"
            />
          </VCol>

          <!-- 👉 DateRange filter -->
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

        <div class="d-flex align-center flex-wrap gap-4">
          <!-- 👉 Create invoice -->
          <VBtn
            prepend-icon="tabler-plus"
            to="add"
          >
            Thêm lịch trình
          </VBtn>
        </div>
      </VCardText>
      <VDivider />

      <!-- SECTION Datatable -->
      <VDataTableServer
        v-model:items-per-page="itemPerPage"
        v-model:page="page"
        :items-length="totalPromotions"
        :items="routes"
        :headers="headers"
        class="text-no-wrap"
        @click:row="(item) => console.log(item)"
        @update:options="updateOptions"
      >
        <!-- ID -->
        <template #item.code="{ item }">
          {{ item.code }}
        </template>

        <template #item.routeDescription="{ item }">
          {{ item.routeDescription }}
        </template>

        <template #item.busName="{ item }">
          {{ item.busName }}
        </template>

        <template #item.busType="{ item }">
          {{ item.busType }}
        </template>

        <template #item.timeTransfer="{ item }">
          {{ formatTime(item.timeTransfer) }}
        </template>

        <template #item.timeStarted="{ item }">
          {{ formatDateTime(item.timeStarted) }}
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
          <IconBtn @click="deleteInvoice(item.id)">
            <VIcon icon="tabler-trash" />
          </IconBtn>

          <IconBtn :to="{ name: 'promotion-edit-id', params: { id: item.id } }">
            <VIcon icon="tabler-edit" />
          </IconBtn>
        </template>

        <!-- pagination -->

        <template #bottom>
          <VDivider />
          <div class="d-flex align-center justify-sm-space-between justify-center flex-wrap gap-3 pa-5 pt-3">
            <p class="text-sm text-disabled mb-0">
              {{ paginationMeta({ page, itemPerPage }, totalPromotions) }}
            </p>

            <VPagination
              v-model="page"
              :length="Math.ceil(totalPromotions / itemPerPage)"
              :total-visible="$vuetify.display.xs ? 1 : Math.ceil(totalPromotions / itemPerPage)"
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
