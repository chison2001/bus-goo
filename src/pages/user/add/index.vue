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
const ward = ref()
const cities = ref([] as Region[])
const districts = ref([] as Region[])
const wards = ref([] as Region[])
const router = useRouter()

const add = async () => {
  const res = await $api('/api/user/create', {
    method: 'POST',
    data: {
      fullName: fullName.value,
      phone: phoneNumber.value,
      regeionDetailId: ward.value.value,
    },

  })

  const data = res.data

  console.log(data.respType === '200')
  if (data.respType === 200)
    router.replace('/user/list')
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

  console.log(data.map((item: { id: any; fullName: any }) => ({
    value: item.id,
    title: item.fullName,
  })))
  if (regionStructureId === 1) {
    cities.value = data.map((item: { id: any; fullName: any }) => ({
      value: item.id,
      title: item.fullName,
    }))
  }
  if (regionStructureId === 2) {
    districts.value = data.map((item: { id: any; fullName: any }) => ({
      value: item.id,
      title: item.fullName,
    }))
  }
  if (regionStructureId === 3) {
    wards.value = data.map((item: { id: any; fullName: any }) => ({
      value: item.id,
      title: item.fullName,
    }))
  }
  console.log(districts.value)
}
await getRegion(null, 1)
watch(selectedCity, () => getRegion(selectedCity.value.value, 2))
watch(district, () => getRegion(district.value.value, 3))
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
