<script setup lang="ts">
import { VForm } from 'vuetify/components/VForm'
import $api from '@/utils/api'
import type { PriceDetail } from '@db/apps/price/types'

interface Item {
  value: number
  title: string
}
const isFormValid = ref(false)
const refForm = ref<VForm>()
const isFormDetailValid = ref(false)
const refFormDetail = ref<VForm>()
const newPriceDetails = ref([] as PriceDetail[])
const routes = ref([] as Item[])
const router = useRouter()
const boxRoute = ref()
const boxTypeBus = ref()
const priceValue = ref()

const typeBuses = [{
  value: 1,
  title: 'Ghế',
},
{
  value: 2,
  title: 'Giường',
},
{
  value: 3,
  title: 'Limousine',
}]

const route = useRoute('price-edit-id')

const response = await $api('/api/price/get', {
  method: 'GET',
  params: { priceId: route.params.id },
})

const price = computed(() => response.data.valueReponse.data)
const comparisonDate = new Date(price.value.fromDate)
const currentDate = new Date()
const isLessThanCurrentDate = comparisonDate <= currentDate
const checkStatus = price.value.status === 0
const dialog = ref(false)
const dialogDelete = ref(false)
let deletedId = -1

function deleteDetail(id: number) {
  deletedId = id
  dialogDelete.value = true
}

function deleteDetailConfirm() {
  deleteDetailAPI(deletedId)
  closeDelete()
}

function close() {
  dialog.value = false
}

function closeDelete() {
  dialogDelete.value = false
}

watch(dialog, val => {
  if (!val)
    close()
})

watch(dialogDelete, val => {
  if (!val)
    closeDelete()
})

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

async function getDetails() {
  const res = await $api('/api/price/find-detail', {
    method: 'GET',
    params: {
      priceId: price.value.id,
    },
  })

  const data = res.data.valueReponse.data

  newPriceDetails.value = data.map((item: any) => ({
    id: item.id,
    priceDetailCode: item.detailCode,
    priceValue: item.value,
    status: item.status,
    typeBus: item.typeBus.name,
    route: `${item.route.from.fullName} - ${item.route.to.fullName}`,
  }))
}
await getDetails()

async function saveDetail() {
  await $api('/api/price/create-detail', {
    method: 'POST',
    data: {
      typeBusId: boxTypeBus.value.value,
      routeId: boxRoute.value.value,
      priceValue: priceValue.value,
      priceId: price.value.id,
    },

  })
  await getDetails()
}

async function deleteDetailAPI(id: number) {
  await $api(`/api/price/delete-price-detail/${id}`, {
    method: 'DELETE',
  })
  await getDetails()
}

function save() {
  refFormDetail.value?.validate().then(({ valid }) => {
    if (valid) {
      saveDetail()
      location.reload()
      close()
      nextTick(() => {
        refFormDetail.value?.reset()
        refFormDetail.value?.resetValidation()
      })
    }
  })
}

async function savePrice() {
  const res = await $api('/api/price/update', {
    method: 'POST',
    data: {
      priceDescription: price.value.description,
      fromDate: price.value.fromDate,
      toDate: price.value.toDate,
      priceId: price.value.id,
    },

  })

  const data = res.data

  console.log(data.respType === '200')
  if (data.respType === 200)
    router.replace('/price/list')
}

function onSubmit() {
  refForm.value?.validate().then(({ valid }) => {
    if (valid)
      savePrice()
  })
}

const resolveUserStatusVariant = (stat: number) => {
  const statLowerCase = stat
  if (statLowerCase === 1)
    return { color: 'success', value: 'active' }
  if (statLowerCase === 0)
    return { color: 'secondary', value: 'inactive' }
}
</script>

<template>
  <VCard class="pa-sm-8 pa-5">
    <VCardItem class="text-center">
      <VCardTitle class="text-h3 mb-3">
        Cập nhật đơn giá
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
          <!-- 👉 From date -->
          <VCol
            cols="12"
            md="6"
          >
            <AppDateTimePicker
              v-model="price.fromDate"
              :disabled="isLessThanCurrentDate || checkStatus"
              :rules="[requiredValidator]"
              label="Ngày có hiệu lực"
            />
          </VCol>

          <!-- 👉 To date -->
          <VCol
            cols="12"
            md="6"
          >
            <AppDateTimePicker
              v-model="price.toDate"
              :disabled="isLessThanCurrentDate || checkStatus"
              :rules="[requiredValidator]"
              label="Ngày hết hiệu lực"
            />
          </VCol>

          <!-- 👉 Role -->
          <VCol
            cols="12"
            md="12"
          >
            <AppTextarea
              v-model="price.description"
              :disabled="isLessThanCurrentDate || checkStatus"
              rows="2"
              label="Ghi chú"
            />
          </VCol>
          <VCardText>
            <VTable>
              <thead>
                <tr>
                  <th class="text-center">
                    id
                  </th>
                  <th class="text-center">
                    Giá trị đơn giá
                  </th>
                  <th class="text-center">
                    Loại xe
                  </th>
                  <th class="text-center">
                    Tuyến
                  </th>
                  <th class="text-center">
                    Trạng thái
                  </th>
                  <th class="text-center">
                    <VIcon
                      class="me-2"
                      size="small"
                      icon="tabler-plus"
                      @click="dialog = true"
                    />
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in newPriceDetails"
                  :key="item.id"
                >
                  <td class="text-center">
                    {{ item.id }}
                  </td>
                  <td class="text-center">
                    {{ item.priceValue }}
                  </td>
                  <td class="text-center">
                    {{ item.typeBus }}
                  </td>
                  <td class="text-center">
                    {{ item.route }}
                  </td>
                  <td class="text-center">
                    <VChip
                      :color="resolveUserStatusVariant(item.status)?.color"
                      size="small"
                      label
                      class="text-capitalize"
                    >
                      {{ resolveUserStatusVariant(item.status)?.value }}
                    </VChip>
                  </td>
                  <td class="text-center">
                    <VIcon
                      size="small"
                      icon="tabler-trash"
                      @click="deleteDetail(item.id)"
                    />
                  </td>
                </tr>
              </tbody>
            </VTable>
          </VCardText>
          <!-- 👉 Submit and Cancel -->
          <VCol
            cols="12"
            class="d-flex flex-wrap justify-center gap-4"
          >
            <VBtn
              type="submit"
              class="me-3"
              :disabled="isLessThanCurrentDate || checkStatus"
            >
              Cập nhật
            </VBtn>
            <VBtn
              type="reset"
              variant="outlined"
              color="secondary"
              to="/price/list"
            >
              Trở lại
            </VBtn>
          </VCol>
        </VRow>
      </VForm>
      <VDialog
        v-model="dialog"
        max-width="500px"
      >
        <VCard>
          <VCardTitle>
            <span class="text-h5">Thêm chi tiết</span>
          </VCardTitle>

          <VCardText>
            <VForm
              ref="refFormDetail"
              v-model="isFormDetailValid"
            >
              <VRow>
                <VCol
                  cols="12"
                  md="6"
                  mb="12"
                >
                  <AppTextField
                    v-model="priceValue"
                    label="Giá trị đơn giá"
                    :disabled="isLessThanCurrentDate || checkStatus"
                    :rules="[requiredValidator]"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                  mb="12"
                >
                  <AppCombobox
                    v-model="boxRoute"
                    :items="routes"
                    :disabled="isLessThanCurrentDate || checkStatus"
                    label="Chuyến xe"
                    :rules="[requiredValidator]"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                  mb="12"
                >
                  <AppCombobox
                    v-model="boxTypeBus"
                    :items="typeBuses"
                    :disabled="isLessThanCurrentDate || checkStatus"
                    label="Loại xe"
                    :rules="[requiredValidator]"
                  />
                </VCol>
              </VRow>
              <VRow>
                <VSpacer />
                <VBtn
                  color="blue-darken-1"
                  variant="text"
                  @click="close"
                >
                  Thoát
                </VBtn>
                <VBtn
                  color="blue-darken-1"
                  variant="text"
                  type="submit"
                  :disabled="isLessThanCurrentDate || checkStatus"
                  @click="save"
                >
                  Lưu chi tiết
                </VBtn>
              </VRow>
            </VForm>
          </VCardText>
        </VCard>
      </VDialog>
      <VDialog
        v-model="dialogDelete"
        max-width="500px"
      >
        <VCard>
          <VCardTitle class="text-h5">
            Bạn có muốn xoá chi tiết đơn giá này không?
          </VCardTitle>
          <VCardActions>
            <VSpacer />
            <VBtn
              color="blue-darken-1"
              variant="text"
              @click="closeDelete"
            >
              Cancel
            </VBtn>
            <VBtn
              color="blue-darken-1"
              variant="text"
              @click="deleteDetailConfirm"
            >
              OK
            </VBtn>
            <VSpacer />
          </VCardActions>
        </VCard>
      </VDialog>
    </VCardText>
  </VCard>
</template>
