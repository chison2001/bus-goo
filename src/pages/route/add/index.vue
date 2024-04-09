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
const isDialogVisible = ref(false)
const title = ref('')
const message = ref('')
const resErr = ref(false)
function handleDialogVisibility(value: boolean) {
  isDialogVisible.value = value
}

const add = async () => {
  const res = await $api('/api/route/create', {
    method: 'POST',
    data: {
      fromId: selectedFrom.value.value,
      toId: selectedTo.value.value,
      transferTime: transferTime.value,
    },

  })

  const data = res.data

  if (data.respType === 200) {
    isDialogVisible.value = true
    title.value = 'Thông báo'
    message.value = 'Thêm tuyến đường thành công'
    resErr.value = false
  }
  else {
    isDialogVisible.value = true
    title.value = 'Đã xảy ra lỗi'
    message.value = data.responseMsg
    resErr.value = true
  }
}

const onSubmit = () => {
  refForm.value?.validate().then(({ valid }) => {
    if (valid) {
      add()
      nextTick(() => {
        refForm.value?.reset()
        transferTime.value = ''
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
        Thêm tuyến đường
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
  <ReponseDialog
    :is-dialog-visible="isDialogVisible"
    :title="title"
    :message="message"
    link="/route/list"
    :is-error="resErr"
    @update:is-dialog-visible="handleDialogVisibility"
  />
</template>
