<script setup lang="ts">
import { VForm } from 'vuetify/components/VForm'
import $api from '@/utils/api'

const isFormValid = ref(false)
const refForm = ref<VForm>()
const code = ref('')
const name = ref('')
const description = ref('')
const fromDate = ref('')
const toDate = ref('')
const isDialogVisible = ref(false)
const title = ref('')
const message = ref('')
const resErr = ref(false)
const now = new Date()

now.setDate(now.getDate() + 1)

const date = now.toLocaleDateString('en-CA')

function handleDialogVisibility(value: boolean) {
  isDialogVisible.value = value
}

const add = async () => {
  const res = await $api('/api/promotion/create-promotion', {
    method: 'POST',
    data: {
      code: code.value,
      name: name.value,
      fromDate: fromDate.value,
      toDate: toDate.value,
      description: description.value,
    },

  })

  const data = res.data

  if (data.respType === 200) {
    isDialogVisible.value = true
    title.value = 'Thông báo'
    message.value = 'Thêm khuyến mãi thành công'
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
        Thêm chương trình khuyến mãi
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
          <!-- 👉 code -->
          <VCol
            cols="12"
            md="6"
          >
            <AppTextField
              v-model="code"
              :rules="[requiredValidator]"
              :label="$t('Code')"
              placeholder="TET2024"
            />
          </VCol>

          <!-- 👉 Name -->
          <VCol
            cols="12"
            md="6"
          >
            <AppTextField
              v-model="name"
              :rules="[requiredValidator]"
              label="Nhập tên chương trình"
              placeholder="Khuyến mãi tết 2024"
            />
          </VCol>

          <!-- 👉 from date -->
          <VCol
            cols="12"
            md="6"
          >
            <AppDateTimePicker
              v-model="fromDate"
              label="Ngày bắt đầu"
              clear-icon="tabler-x"
              clearable
              :config="{ minDate: date }"
              :rules="[requiredValidator]"
            />
          </VCol>

          <!-- 👉 to date -->
          <VCol
            cols="12"
            md="6"
          >
            <AppDateTimePicker
              v-model="toDate"
              label="Ngày kết thúc"
              clear-icon="tabler-x"
              clearable
              :config="{ minDate: date }"
              :rules="[requiredValidator]"
            />
          </VCol>

          <!-- 👉 description -->
          <VCol
            cols="12"
            md="12"
          >
            <AppTextarea
              v-model="description"
              label="Giới thiệu chi tiết"
              placeholder="Nhập giới thiệu"
              rows="2"
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
    link="/promotion/list"
    :is-error="resErr"
    @update:is-dialog-visible="handleDialogVisibility"
  />
</template>
