<script setup lang="ts">
import { VDataTableServer } from 'vuetify/labs/VDataTable'
import { VCardText } from 'vuetify/lib/components/index.mjs'
import $api from '@/utils/api'
import { paginationMeta } from '@api-utils/paginationMeta'

const searchQuery = ref('')
const selectedStatus = ref('')

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
  sortBy.value = options.sortBy[0]?.key
  orderBy.value = options.sortBy[0]?.order
}

// 👉 headers
const headers = [
  { title: 'Code', key: 'code' },
  { title: 'Điểm khởi hành', key: 'from.fullName' },
  { title: 'Điểm đến', key: 'to.fullName' },
  { title: 'Thời gian khởi hành', key: 'transferTime' },
  { title: 'Trạng thái', key: 'status' },
  { title: 'Hành động', key: 'actions', sortable: false },
]

const status = [
  { title: 'Active', value: 1 },
  { title: 'Inactive', value: 0 },
]

// 👉 Fetch Invoices
const { data: routeData, execute: fetchRoutes } = await useApi<any>(createUrl('api/route/find', {
  query: {
    status: selectedStatus,
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

watch(selectedFrom, () => from.value = selectedFrom.value.value)
watch(selectedTo, () => to.value = selectedTo.value.value)

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
            md="4"
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

          <!-- 👉 DateRange filter -->
          <VCol
            cols="12"
            md="4"
          >
            <AppCombobox
              v-model="selectedFrom"
              :items="cities"
              label="Điểm khởi hành"
              item-value="value"
              :rules="[requiredValidator]"
            />
          </VCol>

          <!-- 👉 DateRange filter -->
          <VCol
            cols="12"
            md="4"
          >
            <AppCombobox
              v-model="selectedTo"
              :items="cities"
              label="Điểm đến"
              :rules="[requiredValidator]"
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
          <!-- 👉 Search  -->
          <div class="invoice-list-filter">
            <AppTextField
              v-model="searchQuery"
              placeholder="Tìm kiếm"
              density="compact"
            />
          </div>

          <!-- 👉 Select status -->
          <div class="invoice-list-filter">
            <AppSelect
              v-model="selectedStatus"
              placeholder="Chọn trạng thái"
              clearable
              clear-icon="tabler-x"
              single-line
              :items="status"
            />
          </div>
          <!-- 👉 Create invoice -->
          <VBtn
            prepend-icon="tabler-plus"
            to="add"
          >
            Thêm tuyến đường
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

        <!-- Total -->
        <template #item.from.fullName="{ item }">
          {{ item.from.fullName }}
        </template>

        <!-- Order Date -->
        <template #item.to.fullName="{ item }">
          {{ item.to.fullName }}
        </template>

        <!-- Start Date -->
        <template #item.transferTime="{ item }">
          {{ formatTime(item.transferTime) }}
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
