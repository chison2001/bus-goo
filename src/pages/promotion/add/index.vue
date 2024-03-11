<script setup lang="ts">
import { VForm } from 'vuetify/components/VForm'

const isFormValid = ref(false)
const refForm = ref<VForm>()
const code = ref('')
const description = ref('')
const startDate = ref()
const toDate = ref()
const status = ref('Inactive')

const onSubmit = () => {
  refForm.value?.validate().then(({ valid }) => {
    if (valid) {
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
          <!-- 👉 Full name -->
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

          <!-- 👉 Email -->
          <VCol
            cols="12"
            md="6"
          >
            <AppDateTimePicker
              v-model="startDate"
              label="Ngày bắt đầu"
              clear-icon="tabler-x"
              clearable
              :rules="[requiredValidator]"
              placeholder="Chọn ngày"
            />
          </VCol>

          <!-- 👉 Country -->
          <VCol
            cols="12"
            md="6"
          >
            <AppDateTimePicker
              v-model="toDate"
              label="Ngày kết thúc"
              clear-icon="tabler-x"
              clearable
              :rules="[requiredValidator]"
              placeholder="Chọn ngày"
            />
          </VCol>

          <!-- 👉 Contact -->
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
</template>
