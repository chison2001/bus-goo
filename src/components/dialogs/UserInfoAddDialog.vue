<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import type { VForm } from 'vuetify/components/VForm'

import type { UserProperties } from '@db/apps/users/types'

interface Emit {
  (e: 'update:isDialogVisible', value: boolean): void
  (e: 'userData', value: UserProperties): void
}

interface Props {
  isDialogVisible: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<Emit>()

const isFormValid = ref(false)
const refForm = ref<VForm>()
const fullName = ref('')
const email = ref('')
const phoneNumber = ref('')
const address = ref()
const role = ref()
const status = ref()

// 👉 drawer close
const closeDialog = () => {
  emit('update:isDialogVisible', false)

  nextTick(() => {
    refForm.value?.reset()
    refForm.value?.resetValidation()
  })
}

const onSubmit = () => {
  refForm.value?.validate().then(({ valid }) => {
    if (valid) {
      emit('userData', {
        id: 0,
        fullName: fullName.value,
        address: address.value,
        role: role.value,
        phoneNumber: phoneNumber.value,
        email: email.value,
        status: status.value,
        avatar: '',
      })
      emit('update:isDialogVisible', false)
      nextTick(() => {
        refForm.value?.reset()
        refForm.value?.resetValidation()
      })
    }
  })
}

const dialogModelValueUpdate = (val: boolean) => {
  emit('update:isDialogVisible', val)
}
</script>

<template>
  <VDialog
    :width="$vuetify.display.smAndDown ? 'auto' : 677"
    :model-value="props.isDialogVisible"
    @update:model-value="dialogModelValueUpdate"
  >
    <!-- Dialog close btn -->
    <DialogCloseBtn @click="dialogModelValueUpdate(false)" />

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

            <!-- 👉 Country -->
            <VCol
              cols="12"
              md="6"
            >
              <AppTextField
                v-model="address"
                label="Nhập địa chỉ"
                placeholder="Nhập địa chỉ"
                :rules="[requiredValidator]"
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
                :rules="[requiredValidator]"
                label="Số điện thoại"
                placeholder="+1-541-754-3010"
              />
            </VCol>

            <!-- 👉 Role -->
            <VCol
              cols="12"
              md="6"
            >
              <AppSelect
                v-model="role"
                label="Chọn vai trò"
                placeholder="Chọn vai trò"
                :rules="[requiredValidator]"
                :items="['Admin', 'Manager', 'Staff', 'Customer']"
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
                @click="closeDialog"
              >
                Huỷ
              </VBtn>
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>
  </VDialog>
</template>
