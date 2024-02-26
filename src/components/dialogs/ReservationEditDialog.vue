<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import type { VForm } from 'vuetify/components/VForm'

import type { Invoice } from '../../plugins/fake-api/handlers/apps/reservation/types'

interface Props {
  reservationData?: Invoice
  isDialogVisible: boolean
}

interface Emit {
  (e: 'submit', value: Invoice): void
  (e: 'update:isDialogVisible', val: boolean): void
}

const props = withDefaults(defineProps<Props>(), {
  reservationData: () => ({
    id: '',
    orderDate: '',
    busNumber: '',
    client: {
      id: 0,
      fullName: '',
      role: '',
      address: '',
      phoneNumber: '',
      email: '',
      status: '',
      avatar: '',
    },
    startDate: '',
    total: 0,
    paymentStatus: '',
    status: '',
  }),
})

const emit = defineEmits<Emit>()

const reservationData = ref<Invoice>(structuredClone(toRaw(props.reservationData)))

const isFormValid = ref(false)

watch(props, () => {
  reservationData.value = structuredClone(toRaw(props.reservationData))
})

const onFormSubmit = () => {
  emit('update:isDialogVisible', false)
  emit('submit', reservationData.value)
}

const onFormReset = () => {
  reservationData.value = structuredClone(toRaw(props.reservationData))

  emit('update:isDialogVisible', false)
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

            <!-- 👉 Submit and Cancel -->
            <VCol
              cols="12"
              class="d-flex flex-wrap justify-center gap-4"
            >
              <VBtn type="submit">
                Cập nhật
              </VBtn>

              <VBtn
                color="secondary"
                variant="tonal"
                @click="onFormReset"
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
