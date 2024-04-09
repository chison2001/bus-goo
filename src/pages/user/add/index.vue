<script setup lang="ts">
import { VForm } from 'vuetify/components/VForm'
import $api from '@/utils/api'

interface Region {
  value: number
  title: string
}

const isFormValid = ref(false)
const refForm = ref<VForm>()
const fullName = ref('')
const phoneNumber = ref('')
const selectedCity = ref()
const district = ref()
const address = ref()
const cities = ref([] as Region[])
const districts = ref([] as Region[])
const router = useRouter()
const isDialogVisible = ref(false)
const title = ref('')
const message = ref('')
const resErr = ref(false)
function handleDialogVisibility(value: boolean) {
  isDialogVisible.value = value
}

const add = async () => {
  const res = await $api('/api/user/create', {
    method: 'POST',
    data: {
      fullName: fullName.value,
      phone: phoneNumber.value,
      regeionDetailId: district.value.value,
      addressDescription: address.value,
    },

  })

  const data = res.data

  if (data.respType === 200) {
    isDialogVisible.value = true
    title.value = 'Thông báo'
    message.value = 'Thêm người dùng thành công'
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

async function getCity() {
  const res = await $api('/api/region/find', {
    method: 'POST',
    data: {
      parentId: null,
      regionStructureId: 1,
    },
  })

  const data = res.data.valueReponse.data

  cities.value = data.map((item: { id: any; fullName: any }) => ({
    value: item.id,
    title: item.fullName,
  }))
}

async function getDistricts(parentId: number | null) {
  const res = await $api('/api/region/find', {
    method: 'POST',
    data: {
      parentId,
      regionStructureId: 2,
    },
  })

  const data = res.data.valueReponse.data

  districts.value = data.map((item: { id: any; fullName: any }) => ({
    value: item.id,
    title: item.fullName,
  }))
}
await getCity()
watch(selectedCity, async () => {
  if (typeof selectedCity.value.value === 'number')
    await getDistricts(selectedCity.value.value)
})
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
              placeholder="0347829036"
            />
          </VCol>

          <!-- 👉 Country -->
          <VCol
            cols="12"
            md="6"
          >
            <AppCombobox
              v-model="selectedCity"
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
            <AppTextField
              v-model="address"
              label="Địa chỉ chi tiết"
              placeholder="60 Ngô Tất Tố, P22"
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
              @click="router.go(-1)"
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
    link="/user/list"
    :is-error="resErr"
    @update:is-dialog-visible="handleDialogVisibility"
  />
</template>
