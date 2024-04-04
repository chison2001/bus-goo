<script setup lang="ts">
import { VDataTableServer } from 'vuetify/labs/VDataTable'
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
  <!-- 👉 Invoice Filters  -->
  <VCard
    title="Bộ lọc"
    class="mb-6"
  >
    <VCardText>
      <VRow>
        <!-- 👉 DateRange filter -->
        <VCol
          cols="12"
          md="6"
        >
          <AppCombobox
            v-model="selectedRegion"
            :items="cities"
            label="Điểm khởi hành"
          />
        </VCol>
        <!-- 👉 DateRange filter -->
        <VCol
          cols="12"
          md="3"
        >
          <!-- 👉 Create invoice -->
          <VBtn
            class="mt-6"
            prepend-icon="tabler-search"
            @click="getStation"
          >
            Tìm kiếm
          </VBtn>
        </VCol>

        <!-- 👉 DateRange filter -->
        <VCol
          class="mt-6"
          cols="12"
          md="3"
        >
          <!-- 👉 Create invoice -->
          <VBtn
            prepend-icon="tabler-plus"
            to="add"
          >
            Thêm bến
          </VBtn>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
  <section v-if="stations">
    <VCard id="invoice-list">
      <!-- SECTION Datatable -->
      <VDataTableServer
        :items-length="totalSchedules"
        :items="stations"
        :headers="headers"
        class="text-no-wrap"
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
      </VDataTableServer>
    <!-- !SECTION -->
    </VCard>
  </section>
  <section v-else>
    <VCard>
      <VCardTitle>Không tìm thấy bến xe!!</VCardTitle>
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
