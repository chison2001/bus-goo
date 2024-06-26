<script setup lang="ts">
import { VDataTableServer } from 'vuetify/labs/VDataTable'
import $api from '@/utils/api'
import { paginationMeta } from '@api-utils/paginationMeta'

// 👉 Store
const searchQuery = ref('')
const selectedStatus = ref()

// Data table options
const itemPerPage = ref(10)
const page = ref(1)
const sortBy = ref('dsc')
const orderBy = ref('userId')
const isDialogVisible = ref(false)
const title = ref('')
const message = ref('')
const resErr = ref(false)
function handleDialogVisibility(value: boolean) {
  isDialogVisible.value = value
}

// Update data table options
const updateOptions = (options: any) => {
  page.value = options.page
  if (options.sortBy[0]?.order !== undefined)
    sortBy.value = options.sortBy[0]?.order
  if (options.sortBy[0]?.key !== undefined)
    orderBy.value = options.sortBy[0]?.key
}

// Headers
const headers = [
  { title: 'CODE', key: 'userCode' },
  { title: 'Người dùng', key: 'fullName' },
  { title: 'Địa chỉ', key: 'address' },
  { title: 'Số điện thoại', key: 'phone' },
  { title: 'Trạng thái', key: 'status' },
  { title: 'Hành động', key: 'actions', sortable: false },
]

// 👉 Fetching users
const { data: usersData, execute: fetchUsers } = await useApi<any>(createUrl('/api/user/find', {
  query: {
    q: searchQuery,
    status: selectedStatus,
    itemPerPage,
    page,
    sortBy,
    orderBy,
  },
}))

console.log(usersData.value.valueReponse.data.content)

const users = computed(() => usersData.value.valueReponse.data.content)
const totalUsers = computed(() => usersData.value.valueReponse.data.totalElements)

const status = [
  { title: 'Active', value: 1 },
  { title: 'Inactive', value: 0 },
]

const resolveUserStatusVariant = (stat: number) => {
  const statLowerCase = stat
  if (statLowerCase === 1)
    return { color: 'success', value: 'active' }
  if (statLowerCase === 0)
    return { color: 'secondary', value: 'inactive' }
}

// 👉 Delete user
const deleteUser = async (userId: number) => {
  const reponse = await $api(`/api/user/delete/${userId}`, {
    method: 'DELETE',
  })

  const { respType, responseMsg } = reponse.data
  if (respType === 200) {
    isDialogVisible.value = true
    title.value = 'Thông báo'
    message.value = 'Xoá người dùng thành công'
    resErr.value = false
  }
  else {
    isDialogVisible.value = true
    title.value = 'Đã xảy ra lỗi'
    message.value = responseMsg
    resErr.value = true
  }

  // refetch User
  // TODO: Make this async
  fetchUsers()
}
</script>

<template>
  <section>
    <VCard id="user-list">
      <VCardText class="d-flex flex-wrap py-4 gap-4">
        <div class="me-3 d-flex gap-3">
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
        <div class="app-user-search-filter d-flex align-center flex-wrap gap-4">
          <!-- 👉 Search  -->
          <div style="inline-size: 10rem;">
            <AppTextField
              v-model="searchQuery"
              placeholder="Tìm kiếm"
              density="compact"
            />
          </div>
          <!-- 👉 Select status -->
          <div class="user-list-filter">
            <AppSelect
              v-model="selectedStatus"
              placeholder="Trạng thái"
              clearable
              clear-icon="tabler-x"
              single-line
              :items="status"
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
            Thêm người dùng
          </VBtn>
        </div>
      </VCardText>

      <VDivider />

      <!-- SECTION datatable -->
      <VDataTableServer
        v-model:items-per-page="itemPerPage"
        v-model:page="page"
        :items="users"
        height="450"
        :items-length="totalUsers"
        :headers="headers"
        class="text-no-wrap"
        @update:options="updateOptions"
      >
        <!-- User -->
        <template #item.code="{ item }">
          <span class="text-capitalize font-weight-medium">{{ item.userCode }}</span>
        </template>
        <!-- User -->
        <template #item.user="{ item }">
          <span class="text-capitalize font-weight-medium">{{ item.fullName }}</span>
        </template>

        <!-- Plan -->
        <template #item.address="{ item }">
          <span class="text-capitalize font-weight-medium">{{ item.address }}</span>
        </template>

        <!-- Plan -->
        <template #item.phoneNumber="{ item }">
          <span class="text-capitalize font-weight-medium">{{ item.phone }}</span>
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
          <IconBtn @click="deleteUser(item.userId)">
            <VIcon icon="tabler-trash" />
          </IconBtn>

          <IconBtn :to="{ name: 'user-view-id', params: { id: item.userId } }">
            <VIcon icon="tabler-eye" />
          </IconBtn>
        </template>

        <!-- pagination -->
        <template #bottom>
          <VDivider />
          <div class="d-flex align-center justify-sm-space-between justify-center flex-wrap gap-3 pa-5 pt-3">
            <p class="text-sm text-disabled mb-0">
              {{ paginationMeta({ page, itemPerPage }, totalUsers) }}
            </p>

            <VPagination
              v-model="page"
              :length="Math.ceil(totalUsers / itemPerPage)"
              :total-visible="$vuetify.display.xs ? 1 : Math.ceil(totalUsers / itemPerPage)"
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
  <ReponseDialog
    :is-dialog-visible="isDialogVisible"
    :title="title"
    :message="message"
    link="/user/list"
    :is-error="resErr"
    @update:is-dialog-visible="handleDialogVisibility"
  />
</template>

<style lang="scss">
#user-list {

  .user-list-filter {
    inline-size: 12rem;
  }
}
</style>
