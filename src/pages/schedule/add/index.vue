<script setup lang="ts">
import { VForm } from 'vuetify/components/VForm'
import $api from '@/utils/api'

interface Item {
  value: number
  title: string
}

const isFormValid = ref(false)
const refForm = ref<VForm>()
const selectedBus = ref()
const selectedRoute = ref()
const startedTime = ref('')
const routes = ref([] as Item[])
const buses = ref([] as Item[])
const router = useRouter()

const add = async () => {
  const res = await $api('/api/timetable/create', {
    method: 'POST',
    data: {
      busId: selectedBus.value.value,
      routeId: selectedRoute.value.value,
      startTime: startedTime.value,
    },

  })

  const data = res.data

  console.log(data.respType === '200')
  if (data.respType === 200)
    router.replace('/schedule/list')
}

const onSubmit = () => {
  refForm.value?.validate().then(({ valid }) => {
    if (valid) {
      add()
      nextTick(() => {
        refForm.value?.reset()
        startedTime.value = ''
        refForm.value?.resetValidation()
      })
    }
  })
}

async function getRoutes() {
  const res = await $api('/api/route/find-all', {
    method: 'GET',

  })

  const data = res.data.valueReponse.data

  routes.value = data.map((item: { id: any; to: { fullName: any }; from: { fullName: any } }) => ({
    value: item.id,
    title: `${item.from.fullName} - ${item.to.fullName}`,
  }))
}
await getRoutes()

async function getBuses() {
  const res = await $api('/api/bus/find-all', {
    method: 'GET',

  })

  const data = res.data.valueReponse.data

  console.log(data.map((item: { id: any; name: any; typeBus: { name: any } }) => ({
    value: item.id,
    title: `${item.name} - ${item.typeBus.name}`,
  })))
  buses.value = data.map((item: { id: any; name: any; typeBus: { name: any } }) => ({
    value: item.id,
    title: `${item.name} - ${item.typeBus.name}`,
  }))
}
await getBuses()
</script>

<template>
  <VCard class="pa-sm-8 pa-5">
    <VCardItem class="text-center">
      <VCardTitle class="text-h3 mb-3">
        Thêm lịch trình
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
              v-model="selectedRoute"
              :items="routes"
              label="Chọn tuyến đường"
              :rules="[requiredValidator]"
            />
          </VCol>

          <!-- 👉 Country -->
          <VCol
            cols="12"
            md="6"
          >
            <AppCombobox
              v-model="selectedBus"
              :items="buses"
              label="Chọn xe"
              :rules="[requiredValidator]"
            />
          </VCol>
          <!-- 👉 from date -->
          <VCol
            cols="12"
            md="6"
          >
            <AppDateTimePicker
              v-model="startedTime"
              label="Thời gian và ngày khởi hành"
              :config="{ enableTime: true, dateFormat: 'Y-m-dTH:i' }"
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
</template>
