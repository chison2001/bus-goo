<script setup lang="ts">
import { VForm } from 'vuetify/components/VForm'
import type { Price, PriceDetail } from '@db/apps/price/types'

const isFormValid = ref(false)
const refForm = ref<VForm>()
const fromDate = ref('')
const toDate = ref('')
const description = ref('')
const status = ref('Active')
const priceDetails = ref([] as PriceDetail[])

const price = ref<Price>({
  id: 0,
  priceCode: 'PRICE001',
  fromDate: '',
  toDate: '',
  description: '',
  status: 'Active',
  priceDetails: [],
})

// 👉 drawer close
const closeDialog = () => {
  nextTick(() => {
    refForm.value?.reset()
    refForm.value?.resetValidation()
  })
}

const onSubmit = () => {
  refForm.value?.validate().then(({ valid }) => {
    if (valid) {
      price.value = {
        id: 0,
        priceCode: 'PRICE001',
        fromDate: fromDate.value,
        toDate: toDate.value,
        description: description.value,
        status: status.value,
        priceDetails: priceDetails.value,
      }
      nextTick(() => {
        refForm.value?.reset()
        refForm.value?.resetValidation()
      })
    }
  })
}

const addDetail = (value: PriceDetail) => {
  priceDetails.value.push(value)
}

const removeDetail = (id: number) => {
  priceDetails.value.splice(id, 1)
}
</script>

<template>
  <VCard class="pa-sm-8 pa-5">
    <VCardItem class="text-center">
      <VCardTitle class="text-h3 mb-3">
        Thêm đơn giá
      </VCardTitle>
    </VCardItem>

    <VCardText>
      <!-- 👉 Form -->
      <VForm
        ref="refForm"
        v-model="isFormValid"
        @submit.prevent="onSubmit"
      >
        <VRow>
          <!-- 👉 Full name -->
          <VCol
            cols="12"
            md="6"
          >
            <AppDateTimePicker
              v-model="fromDate"
              :rules="[requiredValidator]"
              label="Ngày có hiệu lực"
            />
          </VCol>

          <!-- 👉 Email -->
          <VCol
            cols="12"
            md="6"
          >
            <AppDateTimePicker
              v-model="toDate"
              :rules="[requiredValidator]"
              label="Ngày hết hiệu lực"
            />
          </VCol>

          <!-- 👉 Status -->
          <VCol
            cols="12"
            md="6"
          >
            <AppSelect
              v-model="status"
              label="Chọn trạng thái"
              placeholder="Chọn trạng thái"
              :rules="[requiredValidator]"
              :items="[{ title: 'Active', value: 'active' }, { title: 'Inactive', value: 'inactive' }]"
            />
          </VCol>

          <!-- 👉 Role -->
          <VCol
            cols="12"
            md="6"
          >
            <AppTextarea
              v-model="description"
              rows="1"
              label="Ghi chú"
              :items="['Admin', 'Manager', 'Staff', 'Customer']"
            />
          </VCol>

          <PriceEditTable
            :data="priceDetails"
            @push="addDetail"
            @remove="removeDetail"
          />

          <!-- 👉 Submit and Cancel -->
          <VCol
            cols="12"
            class="d-flex flex-wrap justify-center gap-4"
          >
            <VBtn
              type="submit"
              class="me-3"
            >
              Thêm
            </VBtn>
            <VBtn
              type="reset"
              variant="outlined"
              color="secondary"
              to="list"
              @click="closeDialog"
            >
              Huỷ
            </VBtn>
          </VCol>
        </VRow>
      </VForm>
    </VCardText>
  </VCard>
</template>
