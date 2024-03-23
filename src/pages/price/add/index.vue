<script setup lang="ts">
import { VForm } from 'vuetify/components/VForm'
import $api from '@/utils/api'

const isFormValid = ref(false)
const refForm = ref<VForm>()

const fromDate = ref('')
const toDate = ref('')
const description = ref('')
const router = useRouter()

const add = async () => {
  const res = await $api('/api/price/create', {
    method: 'POST',
    data: {
      toDate: toDate.value,
      fromDate: fromDate.value,
      priceDescription: description.value,
    },

  })

  const data = res.data

  console.log(data.respType === '200')
  if (data.respType === 200)
    router.replace('/price/list')
}

const onSubmit = () => {
  refForm.value?.validate().then(({ valid }) => {
    if (valid) {
      add()
      nextTick(() => {
        refForm.value?.reset()
        refForm.value?.resetValidation()
      })
    }
  })
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
            >
              Huỷ
            </VBtn>
          </VCol>
        </VRow>
      </VForm>
    </VCardText>
  </VCard>
</template>
