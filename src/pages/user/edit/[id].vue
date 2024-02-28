<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import type { VForm } from 'vuetify/components/VForm'

interface UserData {
  id: number | null
  fullName: string
  role: string
  address: string
  phoneNumber: string
  email: string
  status: string
  avatar: string
}

const emit = defineEmits<Emit>()

const route = useRoute('user-view-id')

const { data: userData } = await useApi<any>(`/apps/users/${route.params.id}`)

interface Emit {
  (e: 'submit', value: UserData): void
}

const isFormValid = ref(false)

const onFormSubmit = () => {
  emit('submit', userData.value)
}

const onFormReset = () => {

}
</script>

<template>
  <VCard class="pa-sm-8 pa-5">
    <VCardItem class="text-center">
      <VCardTitle class="text-h3 mb-3">
        Chỉnh sửa thông tin người dùng
      </VCardTitle>
    </VCardItem>

    <VCardText>
      <!-- 👉 Form -->
      <VForm
        v-model="isFormValid"
        class="mt-6"
        @submit.prevent="onFormSubmit"
      >
        <VRow>
          <!-- 👉 First Name -->
          <VCol
            cols="12"
            md="6"
          >
            <AppTextField
              v-model="userData.fullName"
              :rules="[requiredValidator]"
              label="Họ và tên"
            />
          </VCol>

          <!-- 👉 Billing Email -->
          <VCol
            cols="12"
            md="6"
          >
            <AppTextField
              v-model="userData.email"
              :rules="[requiredValidator, emailValidator]"
              label="Email"
            />
          </VCol>

          <!-- 👉 Status -->
          <VCol
            cols="12"
            md="6"
          >
            <AppSelect
              v-model="userData.status"
              :rules="[requiredValidator]"
              label="Trạng thái"
              :items="[{ title: 'Active', value: 'active' }, { title: 'Inactive', value: 'inactive' }]"
            />
          </VCol>

          <!-- 👉 Contact -->
          <VCol
            cols="12"
            md="6"
          >
            <AppTextField
              v-model="userData.phoneNumber"
              :rules="[requiredValidator]"
              label="Số điện thoại"
            />
          </VCol>

          <!-- 👉 Country -->
          <VCol
            cols="12"
            md="6"
          >
            <AppTextField
              v-model="userData.address"
              :rules="[requiredValidator]"
              label="Địa chỉ"
            />
          </VCol>

          <!-- 👉 Status -->
          <VCol
            cols="12"
            md="6"
          >
            <AppSelect
              v-model="userData.status"
              label="Chọn trạng thái"
              placeholder="Chọn trạng thái"
              :rules="[requiredValidator]"
              :items="[{ title: 'Active', value: 'active' }, { title: 'Inactive', value: 'inactive' }]"
            />
          </VCol>

          <!-- 👉 Submit and Cancel -->
          <VCol
            cols="12"
            class="d-flex flex-wrap justify-center gap-4"
          >
            <VBtn
              type="submit"
              to="/user/list"
            >
              Cập nhật
            </VBtn>

            <VBtn
              color="secondary"
              variant="tonal"
              to="/user/list"
              @click="onFormReset"
            >
              Huỷ
            </VBtn>
          </VCol>
        </VRow>
      </VForm>
    </VCardText>
  </VCard>
</template>
