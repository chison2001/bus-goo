<script setup lang="ts">
import { VDataTableServer } from 'vuetify/labs/VDataTable'
import { paginationMeta } from '@api-utils/paginationMeta'

type invoiceStatus = 'Active' | 'Inactive' | null

const searchQuery = ref('')
const orderDateRange = ref('')
const startDateRange = ref('')
const selectedStatus = ref<invoiceStatus>(null)
const selectedRows = ref<string[]>([])

// Data table options
const itemsPerPage = ref(10)
const page = ref(1)
const sortBy = ref()
const orderBy = ref()

// Update data table options
const updateOptions = (options: any) => {
  page.value = options.page
  sortBy.value = options.sortBy[0]?.key
  orderBy.value = options.sortBy[0]?.order
}

// 👉 headers
const headers = [
  { title: 'Mã', key: 'id' },
  { title: 'Người đặt', key: 'client.fullName' },
  { title: 'Ngày đặt', key: 'orderDate' },
  { title: 'Ngày khởi hành', key: 'startDate' },
  { title: 'Tổng tiền', key: 'total' },
  { title: 'Trạng thái', key: 'status' },
  { title: 'Hành động', key: 'actions', sortable: false },
]

const selectedOrderDateRange = computed(() => {
  const [start, end] = orderDateRange.value ? orderDateRange.value.split('to') : ''

  return {
    start,
    end,
  }
})

const selectedStartDateRange = computed(() => {
  const [start, end] = startDateRange.value ? startDateRange.value.split('to') : ''

  return {
    start,
    end,
  }
})

// 👉 Fetch Invoices
const { data: invoiceData, execute: fetchInvoices } = await useApi<any>(createUrl('/apps/invoice', {
  query: {
    q: searchQuery,
    status: selectedStatus,
    selectedOrderDateRange,
    selectedStartDateRange,
    itemsPerPage,
    page,
    sortBy,
    orderBy,
  },
}))

const invoices = computed(() => invoiceData.value.invoices)
const totalInvoices = computed(() => invoiceData.value.totalInvoices)

const resolveUserStatusVariant = (stat: string) => {
  const statLowerCase = stat.toLowerCase()
  if (statLowerCase === 'active')
    return 'success'
  if (statLowerCase === 'inactive')
    return 'secondary'

  return 'primary'
}

const computedMoreList = computed(() => {
  return (paramId: number) => ([
    { title: 'Download', value: 'download', prependIcon: 'tabler-download' },
    {
      title: 'Edit',
      value: 'edit',
      prependIcon: 'tabler-pencil',
      to: { name: 'apps-invoice-edit-id', params: { id: paramId } },
    },
  ])
})

// 👉 Delete Invoice
const deleteInvoice = async (id: number) => {
  await $api(`/apps/invoice/${id}`, { method: 'DELETE' })

  fetchInvoices()
}
</script>

<template>
  <section v-if="invoices">
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
              :items="['Active', 'Inactive']"
            />
          </VCol>

          <!-- 👉 DateRange filter -->
          <VCol
            cols="12"
            md="4"
          >
            <AppDateTimePicker
              v-model="orderDateRange"
              label="Ngày đặt"
              clear-icon="tabler-x"
              clearable
              :config="{ mode: 'range' }"
              placeholder="Chọn ngày"
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
              :config="{ mode: 'range' }"
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
            :model-value="itemsPerPage"
            :items="[
              { value: 10, title: '10' },
              { value: 25, title: '25' },
              { value: 50, title: '50' },
              { value: 100, title: '100' },
              { value: -1, title: 'All' },
            ]"
            style="inline-size: 6.25rem;"
            @update:model-value="itemsPerPage = parseInt($event, 10)"
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
              :items="['Active', 'Inactive']"
            />
          </div>
          <!-- 👉 Create invoice -->
          <VBtn
            prepend-icon="tabler-plus"
            :to="{ name: 'reservation-add' }"
          >
            Đặt vé
          </VBtn>
        </div>
      </VCardText>
      <VDivider />

      <!-- SECTION Datatable -->
      <VDataTableServer
        v-model="selectedRows"
        v-model:items-per-page="itemsPerPage"
        v-model:page="page"
        :items-length="totalInvoices"
        :headers="headers"
        :items="invoices"
        class="text-no-wrap"
        @click:row="(item) => console.log(item)"
        @update:options="updateOptions"
      >
        <!-- ID -->
        <template #item.id="{ item }">
          {{ item.id }}
        </template>

        <!-- Total -->
        <template #item.total="{ item }">
          {{ item.total }} vnd
        </template>

        <!-- Order Date -->
        <template #item.orderDate="{ item }">
          {{ item.orderDate }}
        </template>

        <!-- Start Date -->
        <template #item.startdate="{ item }">
          {{ item.startdate }}
        </template>

        <!-- Status -->
        <template #item.status="{ item }">
          <VChip
            :color="resolveUserStatusVariant(item.status)"
            size="small"
            label
            class="text-capitalize"
          >
            {{ item.status }}
          </VChip>
        </template>

        <!-- Actions -->
        <template #item.actions="{ item }">
          <IconBtn @click="deleteInvoice(item.id)">
            <VIcon icon="tabler-trash" />
          </IconBtn>

          <MoreBtn
            :menu-list="computedMoreList(item.id)"
            item-props
            color="undefined"
          />
        </template>

        <!-- pagination -->

        <template #bottom>
          <VDivider />
          <div class="d-flex align-center justify-sm-space-between justify-center flex-wrap gap-3 pa-5 pt-3">
            <p class="text-sm text-disabled mb-0">
              {{ paginationMeta({ page, itemsPerPage }, totalInvoices) }}
            </p>

            <VPagination
              v-model="page"
              :length="Math.ceil(totalInvoices / itemsPerPage)"
              :total-visible="$vuetify.display.xs ? 1 : Math.ceil(totalInvoices / itemsPerPage)"
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
