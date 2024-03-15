<script setup lang="ts">
import { VForm } from 'vuetify/components/VForm'
import $api from '@/utils/api'

interface Region {
  value: number
  title: string
}

const isFormValid = ref(false)
const refForm = ref<VForm>()
const transferTime = ref('')
const selectedFrom = ref()
const selectedTo = ref()
const cities = ref([] as Region[])
const router = useRouter()

const add = async () => {
  const res = await $api('api/route/create', {
    method: 'POST',
    data: {
      fromId: selectedFrom.value.value,
      toId: selectedTo.value.value,
      transferTime: transferTime.value,
    },

  })

  const data = res.data

  console.log(data.respType === '200')
  if (data.respType === 200)
    router.replace('/route/list')
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
</script>

<template>
  <VCard class="pa-sm-8 pa-5">
    <VCardItem class="text-center">
      <VCardTitle class="text-h3 mb-3">
        Thêm thông tin người dùng
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
          <!-- 👉 Country -->
          <VCol
            cols="12"
            md="6"
          >
            <AppCombobox
              v-model="selectedFrom"
              :items="cities"
              label="Điểm khởi hành"
              :rules="[requiredValidator]"
            />
          </VCol>

          <!-- 👉 Country -->
          <VCol
            cols="12"
            md="6"
          >
            <AppCombobox
              v-model="selectedTo"
              :items="cities"
              label="Điểm đến"
              :rules="[requiredValidator]"
            />
          </VCol>
          <!-- 👉 from date -->
          <VCol
            cols="12"
            md="6"
          >
            <AppDateTimePicker
              v-model="transferTime"
              label="Thời gian chạy"
              :config="{ enableTime: true, noCalendar: true, dateFormat: 'H:i' }"
              clear-icon="tabler-x"
              clearable
              :rules="[requiredValidator]"
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
              Trở lại
            </VBtn>
          </VCol>
        </VRow>
      </VForm>
    </VCardText>
  </VCard>
</template>
