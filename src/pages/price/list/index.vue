<script setup lang="ts">
import { VDataTableServer } from 'vuetify/labs/VDataTable'

import { paginationMeta } from '@api-utils/paginationMeta'

// 👉 Store
const searchQuery = ref('')
const selectedRole = ref()
const selectedStatus = ref()
const selectedFromDate = ref()
const selectedToDate = ref()
const toDateRange = ref('')
const fromDateRange = ref('')

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

// Headers
const headers = [
  { title: 'ID', key: 'id' },
  { title: 'Mã', key: 'priceCode' },
  { title: 'Ngày bắt đầu', key: 'fromDate' },
  { title: 'Ngày kết thúc', key: 'toDate' },
  { title: 'Trạng thái', key: 'status' },
  { title: 'Hành động', key: 'actions', sortable: false },
]

// 👉 Fetching users
const { data: pricesData, execute: fetchPrices } = await useApi<any>(createUrl('/apps/prices', {
  query: {
    q: searchQuery,
    status: selectedStatus,
    role: selectedRole,
    selectedFromDateRange: selectedFromDate,
    selectedToDateRange: selectedToDate,
    itemsPerPage,
    page,
    sortBy,
    orderBy,
  },
}))

const prices = computed(() => pricesData.value.prices)
const totalPrices = computed(() => pricesData.value.totalPrices)

const resolveUserStatusVariant = (stat: string) => {
  const statLowerCase = stat.toLowerCase()
  if (statLowerCase === 'active')
    return 'success'
  if (statLowerCase === 'inactive')
    return 'secondary'

  return 'primary'
}

// 👉 Delete user
const deletePrice = async (id: number) => {
  await $api(`/apps/prices/${id}`, {
    method: 'DELETE',
  })

  // refetch User
  // TODO: Make this async
  fetchPrices()
}
</script>

<template>
  <section>
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
              v-model="fromDateRange"
              label="Ngày bắt đầu"
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
              v-model="toDateRange"
              label="Ngày kết thúc"
              clear-icon="tabler-x"
              clearable
              :config="{ mode: 'range' }"
              placeholder="Chọn ngày"
            />
          </VCol>
        </VRow>
      </VCardText>
    </VCard>
    <VCard>
      <VCardText class="d-flex flex-wrap py-4 gap-4">
        <div class="me-3 d-flex gap-3">
          <AppSelect
            :model-value="itemsPerPage"
            :items="[
              { value: 10, title: '10' },
              { value: 25, title: '25' },
              { value: 50, title: '50' },
              { value: 100, title: '100' },
              { value: -1, title: 'Tất cả' },
            ]"
            style="inline-size: 6.25rem;"
            @update:model-value="itemsPerPage = parseInt($event, 10)"
          />
        </div>
        <VSpacer />

        <div class="app-user-search-filter d-flex align-center flex-wrap gap-4">
          <!-- 👉 Search  -->
          <div style="inline-size: 10rem;">
            <AppTextField
              v-model="searchQuery"
              placeholder="Tìm kiếm"
              density="compact"
            />
          </div>

          <!-- 👉 Export button -->
          <VBtn
            variant="tonal"
            color="secondary"
            prepend-icon="tabler-screen-share"
          >
            Export
          </VBtn>

          <!-- 👉 Add user button -->
          <VBtn
            prepend-icon="tabler-plus"
            to="add"
          >
            Thêm đơn giá
          </VBtn>
        </div>
      </VCardText>

      <VDivider />

      <!-- SECTION datatable -->
      <VDataTableServer
        v-model:items-per-page="itemsPerPage"
        v-model:page="page"
        :items="prices"
        :items-length="totalPrices"
        :headers="headers"
        class="text-no-wrap"
        @update:options="updateOptions"
      >
        <!-- User -->
        <template #item.user="{ item }">
          {{ item.id }}
        </template>

        <!-- 👉 Role -->
        <template #item.priceCode="{ item }">
          {{ item.priceCode }}
        </template>

        <!-- Plan -->
        <template #item.fromDate="{ item }">
          <span class="text-capitalize font-weight-medium">{{ item.fromDate }}</span>
        </template>

        <!-- Plan -->
        <template #item.toDate="{ item }">
          <span class="text-capitalize font-weight-medium">{{ item.toDate }}</span>
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
          <IconBtn @click="deletePrice(item.id)">
            <VIcon icon="tabler-trash" />
          </IconBtn>

          <IconBtn :to="{ name: 'price-edit-id', params: { id: item.id } }">
            <VIcon icon="tabler-edit" />
          </IconBtn>
        </template>

        <!-- pagination -->
        <template #bottom>
          <VDivider />
          <div class="d-flex align-center justify-sm-space-between justify-center flex-wrap gap-3 pa-5 pt-3">
            <p class="text-sm text-disabled mb-0">
              {{ paginationMeta({ page, itemsPerPage }, totalPrices) }}
            </p>

            <VPagination
              v-model="page"
              :length="Math.ceil(totalPrices / itemsPerPage)"
              :total-visible="$vuetify.display.xs ? 1 : Math.ceil(totalPrices / itemsPerPage)"
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
      <!-- SECTION -->
    </VCard>
    <!-- 👉 Add New User -->
  </section>
</template>
