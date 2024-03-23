<script setup lang="ts">
import { VDataTableServer } from 'vuetify/labs/VDataTable'
import $api from '@/utils/api'
import { paginationMeta } from '@api-utils/paginationMeta'

const searchQuery = ref('')
const selectedStatus = ref('')
const selectedFromDate = ref('')
const selectedToDate = ref('')

// Data table options
const itemPerPage = ref(10)
const page = ref(1)
const sortBy = ref()
const orderBy = ref()

// Update data table options
const updateOptions = (options: any) => {
  page.value = options.page
  sortBy.value = options.sortBy[0]?.order
  orderBy.value = options.sortBy[0]?.key
}

// 👉 headers
const headers = [
  { title: 'Code', key: 'code' },
  { title: 'Tên', key: 'name' },
  { title: 'Ngày bắt đầu', key: 'fromDate' },
  { title: 'Ngày kết thúc', key: 'toDate' },
  { title: 'Trạng thái', key: 'status' },
  { title: 'Hành động', key: 'actions', sortable: false },
]

const status = [
  { title: 'Active', value: 1 },
  { title: 'Inactive', value: 0 },
]

// 👉 Fetch Invoices
const { data: promotionData, execute: fetchInvoices } = await useApi<any>(createUrl('/api/promotion/find', {
  query: {
    q: searchQuery,
    status: selectedStatus,
    fromDate: selectedFromDate,
    toDate: selectedToDate,
    itemPerPage,
    page: page.value - 1,
    sortBy,
    orderBy,
  },
}))

const promotions = computed(() => promotionData.value.valueReponse.data.content)
const totalPromotions = computed(() => promotionData.value.valueReponse.data.totalElements)

const resolveUserStatusVariant = (stat: number) => {
  const statLowerCase = stat
  if (statLowerCase === 1)
    return { color: 'success', value: 'active' }
  if (statLowerCase === 0)
    return { color: 'secondary', value: 'inactive' }
}

// 👉 Delete Invoice
const deleteInvoice = async (id: number) => {
  await $api(`/apps/invoice/${id}`, { method: 'DELETE' })

  fetchInvoices()
}
</script>

<template>
  <section v-if="promotions">
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
            md="4"
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
            Thêm khuyến mãi
          </VBtn>
        </div>
      </VCardText>
      <VDivider />

      <!-- SECTION Datatable -->
      <VDataTableServer
        v-model:items-per-page="itemPerPage"
        v-model:page="page"
        :items-length="totalPromotions"
        :items="promotions"
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
        <template #item.name="{ item }">
          {{ item.name }}
        </template>

        <!-- Order Date -->
        <template #item.startdate="{ item }">
          {{ item.startdate }}
        </template>

        <!-- Start Date -->
        <template #item.toDate="{ item }">
          {{ item.toDate }}
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
