<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import type { VForm } from 'vuetify/components/VForm'

import type { UserProperties } from '@db/apps/users/types'

interface Emit {
  (e: 'userData', value: UserProperties): void
}

const emit = defineEmits<Emit>()

const isFormValid = ref(false)
const refForm = ref<VForm>()
const fullName = ref('')
const email = ref('')
const phoneNumber = ref('')
const address = ref()
const city = ref('')
const district = ref()
const ward = ref()

const cities = ['Hồ Chí Minh', 'Bình Định', 'Bình Thuận', 'Nha Trang', 'Hà Nội', 'Hải Phòng', 'Đà Nẵng']
const districts = ['Quận 1', 'Quận 3', 'Bình Thạnh', 'Quận 12', 'Quận 10', 'Quận 8', 'Quận 9']
const wards = ['Quận 1', 'Quận 3', 'Bình Thạnh', 'Quận 12', 'Quận 10', 'Quận 8', 'Quận 9']

const onSubmit = () => {
  refForm.value?.validate().then(({ valid }) => {
    if (valid) {
      emit('userData', {
        id: 0,
        fullName: fullName.value,
        address: address.value,
        role: '',
        phoneNumber: phoneNumber.value,
        email: email.value,
        status: '',
        avatar: '',
      })
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
          <!-- 👉 Full name -->
          <VCol
            cols="12"
            md="6"
          >
            <AppTextField
              v-model="fullName"
              :rules="[requiredValidator]"
              :label="$t('Họ và tên')"
              placeholder="Lê Chí Sơn"
            />
          </VCol>

          <!-- 👉 Email -->
          <VCol
            cols="12"
            md="6"
          >
            <AppTextField
              v-model="email"
              :rules="[requiredValidator, emailValidator]"
              label="Email"
              placeholder="sonle@email.com"
            />
          </VCol>

          <!-- 👉 Contact -->
          <VCol
            cols="12"
            md="6"
          >
            <AppTextField
              v-model="phoneNumber"
              type="number"
              :rules="[requiredValidator, phoneNumberValidator]"
              label="Số điện thoại"
              placeholder="+1-541-754-3010"
            />
          </VCol>

          <!-- 👉 Country -->
          <VCol
            cols="12"
            md="6"
          >
            <AppCombobox
              v-model="city"
              :items="cities"
              label="Tỉnh/Thành phố"
              :rules="[requiredValidator]"
            />
          </VCol>

          <!-- 👉 Country -->
          <VCol
            cols="12"
            md="6"
          >
            <AppCombobox
              v-model="district"
              :items="districts"
              label="Quận/Huyện"
              :rules="[requiredValidator]"
            />
          </VCol>

          <!-- 👉 Country -->
          <VCol
            cols="12"
            md="6"
          >
            <AppCombobox
              v-model="ward"
              :items="wards"
              label="Phường/Xã"
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
