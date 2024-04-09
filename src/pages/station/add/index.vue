<script setup lang="ts">
import { VForm } from 'vuetify/components/VForm'
import $api from '@/utils/api'

interface Region {
  value: number
  title: string
}

const isFormValid = ref(false)
const refForm = ref<VForm>()
const name = ref('')
const addressDescription = ref('')
const description = ref('')
const selectedCity = ref()
const district = ref()
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
  const res = await $api('/api/station/create', {
    method: 'POST',
    data: {
      stationName: name.value,
      addressDescription: addressDescription.value,
      regionDetailId: district.value.value,
      description: description.value,
    },

  })

  const data = res.data

  if (data.respType === 200) {
    isDialogVisible.value = true
    title.value = 'Thông báo'
    message.value = 'Thêm bến xe thành công'
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

  console.log(cities.value)
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
              v-model="name"
              :rules="[requiredValidator]"
              label="Tên bến xe"
              placeholder="Bến Ngã tư ga"
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
              v-model="addressDescription"
              label="Địa chỉ chi tiết"
              placeholder="60 Ngô Tất Tố, P22"
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
    link="/station/list"
    :is-error="resErr"
    @update:is-dialog-visible="handleDialogVisibility"
  />
</template>
