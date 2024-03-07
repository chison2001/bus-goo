<!-- eslint-disable vue/no-mutating-props -->
<script setup lang="ts">
import type { PriceDetail } from '@db/apps/price/types'

interface Emit {
  (e: 'removeDetail', value: number): void
}

interface Props {
  id: number
  data: PriceDetail
}

const props = withDefaults(defineProps<Props>(), {
  data: () => ({
    id: 1,
    priceDetailCode: 'PRICE001',
    priceValue: 30000,
    route: 'ho chi minh',
    status: 'Active',
    typeBus: 'Limousine',
  }),
})

const emit = defineEmits<Emit>()

const localPriceData = ref(structuredClone(toRaw(props.data)))

const busTypes = ['ghế', 'giường', 'limousine']
const routes = ['Hồ Chí Minh - Đà Lạt', 'Hồ Chí Minh - Vũng Tàu', 'Hồ Chí Minh - Bình Dương']
const status = ['Active', 'Inactive']

const removeDetail = () => {
  emit('removeDetail', props.id)
}
</script>

<template>
  <!-- eslint-disable vue/no-mutating-props -->
  <div class=" mb-4  ps-5 pe-16">
    <VCard
      flat
      border
      class="d-flex flex-row"
    >
      <!-- 👉 Left Form -->
      <div class="pa-5 flex-grow-1">
        <VRow>
          <VCol
            cols="12"
            md="3"
          >
            <AppTextField
              v-model="localPriceData.priceValue"
              label="Nhập giá"
              type="number"
              placeholder="30000"
              class="mb-3"
            />
          </VCol>

          <VCol
            cols="12"
            md="3"
          >
            <AppCombobox
              v-model="localPriceData.route"
              label="Chọn chuyến"
              :items="routes"
              placeholder="Hồ Chí Minh - Đà Lạt"
            />
          </VCol>

          <VCol
            cols="12"
            md="3"
          >
            <AppCombobox
              v-model="localPriceData.typeBus"
              label="Loại xe"
              :items="busTypes"
              placeholder="Giường"
            />
          </VCol>

          <VCol
            cols="12"
            md="3"
          >
            <AppSelect
              v-model="localPriceData.status"
              label="Trạng thái"
              :items="status"
            />
          </VCol>
        </VRow>
      </div>

      <!-- 👉 Item Actions -->
      <div class="d-flex flex-column justify-space-between border-s pa-1">
        <IconBtn @click="removeDetail">
          <VIcon
            size="20"
            icon="tabler-x"
          />
        </IconBtn>

        <IconBtn>
          <VIcon
            size="20"
            icon="tabler-settings"
          />
        </IconBtn>
      </div>
    </VCard>
  </div>
</template>
