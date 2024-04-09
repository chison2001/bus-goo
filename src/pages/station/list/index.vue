<script setup lang="ts">
import { VDataTableVirtual } from 'vuetify/labs/VDataTable'
import { VCardText } from 'vuetify/lib/components/index.mjs'
import $api from '@/utils/api'

interface Region {
  value: number
  title: string
}

interface Station {
  id: number
  code: string
  name: string
  addressId: number
  status: number
  description: string
  address: string
  addressParent: string
  addressDescription: string
}

const selectedRegion = ref()

const cities = ref([] as Region[])
const stations = ref([] as Station[])

// 👉 headers
const headers = [
  { title: 'Code', key: 'code' },
  { title: 'Tên bến', key: 'name' },
  { title: 'Địa chỉ', key: 'address' },
  { title: 'Trạng thái', key: 'status' },
]

const resolveUserStatusVariant = (stat: number) => {
  const statLowerCase = stat
  if (statLowerCase === 1)
    return { color: 'success', value: 'active' }
  if (statLowerCase === 0)
    return { color: 'secondary', value: 'inactive' }
}

// 👉 Fetch Invoices

async function getStation() {
  const res = await $api('/api/station/get', {
    method: 'GET',
    params: {
      regionDetailId: selectedRegion.value.value,
    },
  })

  const { valueReponse } = res.data

  stations.value = valueReponse.data
}

const totalSchedules = computed(() => stations.value.length)

async function getRegion(parentId: number | null) {
  const res = await $api('/api/region/find', {
    method: 'POST',
    data: {
      parentId,
      regionStructureId: 1,
    },
  })

  const data = res.data.valueReponse.data

  cities.value = data.map((item: { id: any; fullName: any }) => ({
    value: item.id,
    title: item.fullName,
  }))
}

await getRegion(null)
</script>

<template>
  <VCard id="invoice-list">
    <VCardText class="d-flex align-center flex-wrap gap-4">
      <div class="me-3 d-flex gap-3 align-center">
        <AppCombobox
          v-model="selectedRegion"
          :items="cities"
          style="inline-size: 15rem;"
        />
        <VBtn

          prepend-icon="tabler-search"
          @click="getStation"
        >
          Tìm kiếm
        </VBtn>
      </div>

      <VSpacer />

      <div class="d-flex align-center flex-wrap gap-4">
        <!-- 👉 Create invoice -->
        <VBtn
          prepend-icon="tabler-plus"
          to="add"
        >
          Thêm bến
        </VBtn>
      </div>
    </VCardText>
    <VDivider />
    <!-- SECTION Datatable -->
    <VDataTableVirtual
      :items-length="totalSchedules"
      :items="stations"
      :headers="headers"
      height="330"
      class="text-no-wrap"
      no-data-text="Không có bến xe nào được tìm thấy"
    >
      <template #item.address="{ item }">
        <span class="text-capitalize font-weight-medium">{{ `${item.addressDescription}, ${item.address}, ${item.addressParent}` }}</span>
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
    </VDataTableVirtual>
    <!-- !SECTION -->
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
