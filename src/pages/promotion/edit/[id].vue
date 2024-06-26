<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
import { VForm } from 'vuetify/components/VForm'
import { VDivider } from 'vuetify/lib/components/index.mjs'
import $api from '@/utils/api'
import type { PromoLine } from '@db/apps/promotion/types'

interface Item {
  value: number
  title: string
}
const isFormValid = ref(false)
const refForm = ref<VForm>()
const isFormLineValid = ref(false)
const refFormLine = ref<VForm>()
const newPromoLines = ref([] as PromoLine[])
const isDialogVisible = ref(false)
const title = ref('')
const message = ref('')
const resErr = ref(false)
const link = ref()
function handleDialogVisibility(value: boolean) {
  isDialogVisible.value = value
}

const promoTypes = [{
  value: 1,
  title: 'Giá',
},
{
  value: 2,
  title: 'Chiết khấu',
}]

const lineCode = ref('')
const promoName = ref('')
const fromDate = ref('')

const promoTypeValue = ref({
  value: -1,
  title: '',
} as Item)

const toDate = ref('')
const detailCode = ref('')
const discount = ref('')
const maxdiscount = ref()
const conditionApply = ref()
const route = useRoute('promotion-edit-id')
const checkPromoType = ref(true)

watch(promoTypeValue, () => {
  if (promoTypeValue.value !== null) {
    console.log(promoTypeValue.value)
    if (promoTypeValue.value.value === 1) {
      checkPromoType.value = true
      maxdiscount.value = null
    }
    if (promoTypeValue.value.value === 2) {
      checkPromoType.value = false
      conditionApply.value = null
    }
    console.log(checkPromoType.value)
  }
})

function resetDialog() {
  nextTick(() => {
    refFormLine.value?.reset()
    refFormLine.value?.resetValidation()
    fromDate.value = ''
    toDate.value = ''
  })
}

const response = await $api('/api/promotion/get-by-id', {
  method: 'GET',
  params: { promotionId: route.params.id },
})

const promotion = computed(() => response.data.valueReponse.data)
const comparisonDate = new Date(promotion.value.fromDate)
const currentDate = new Date()
const isLessThanCurrentDate = comparisonDate < currentDate
const checkStatus = promotion.value.status === 0

const update = async () => {
  const res = await $api('/api/promotion/update', {
    method: 'POST',
    data: {
      promotionId: promotion.value.id,
      name: promotion.value.name,
      fromDate: promotion.value.fromDate,
      toDate: promotion.value.toDate,
      description: promotion.value.description,
    },

  })

  const data = res.data

  if (data.respType === 200) {
    isDialogVisible.value = true
    title.value = 'Thông báo'
    message.value = 'Chỉnh sửa khuyến mãi thành công'
    link.value = '/promotion/list'
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
      update()
      nextTick(() => {
        refForm.value?.reset()
        refForm.value?.resetValidation()
      })
    }
  })
}

async function getLines() {
  const res = await $api('/api/promotion/get-line', {
    method: 'GET',
    params: {
      promotionId: promotion.value.id,
    },
  })

  const data = res.data.valueReponse.data

  newPromoLines.value = data.map((item: any) => ({
    id: item.id,
    code: item.code,
    promoName: item.lineName,
    promoType: item.promotionType,
    fromDate: item.fromDate,
    toDate: item.toDate,
    status: item.status,
  }))
}
await getLines()

const dialogLine = ref(false)
const dialogLineDelete = ref(false)
let editedLineIndex: number | null = null
// eslint-disable-next-line unused-imports/no-unused-vars
let editedDetailIndex: number | null = null
let deletedId = -1

async function getLineByID(id: number) {
  resetDialog()

  const res = await $api('/api/promotion/get-detail', {
    method: 'GET',
    params: {
      promotionLineId: id,
    },
  })

  const data = res.data.valueReponse.data
  const line = data.promotionLine

  editedLineIndex = line.id
  promoName.value = line.lineName
  lineCode.value = line.code
  fromDate.value = line.fromDate
  toDate.value = line.toDate
  editedDetailIndex = data.id
  detailCode.value = data.code
  discount.value = data.discount
  maxdiscount.value = data.maxDiscount
  conditionApply.value = data.conditionApply
  if (line.promotionType === 1) {
    checkPromoType.value = true
    promoTypeValue.value = {
      value: 1,
      title: 'Giá',
    }
  }
  if (line.promotionType === 2) {
    checkPromoType.value = false
    promoTypeValue.value = {
      value: 2,
      title: 'Chiết khấu',
    }
  }
}
function addLine() {
  editedLineIndex = null
  editedDetailIndex = null
  dialogLine.value = true
}

// Function to edit promo line
function editLine(id: number) {
  editedLineIndex = id
  getLineByID(id)
  dialogLine.value = true
}

// Function to delete promo line
function deleteLine(id: any) {
  deletedId = id
  dialogLineDelete.value = true
}

// Function to confirm deletion of promo line
async function deleteLineConfirm() {
  const res = await $api(`/api/promotion/delete-line/${deletedId}`, {
    method: 'DELETE',
  })

  const data = res.data

  if (data.respType === 200) {
    isDialogVisible.value = true
    title.value = 'Thông báo'
    message.value = 'Xoá dòng khuyến mãi thành công'
    link.value = `/promotion/edit/${route.params.id}`
    resErr.value = false
  }
  else {
    isDialogVisible.value = true
    title.value = 'Đã xảy ra lỗi'
    message.value = data.responseMsg
    resErr.value = true
  }

  deletedId = -1
  closeLineDelete()
  await getLines()
}

// Function to close promo line dialog
function closeLine() {
  resetDialog()
  dialogLine.value = false
}

// Function to close promo line deletion dialog
function closeLineDelete() {
  dialogLineDelete.value = false
}

async function saveLine() {
  const res = await $api('/api/promotion/create-update/promotionline', {
    method: 'POST',
    data: {
      lineCode: lineCode.value,
      promotionId: promotion.value.id,
      promotionLineId: editedLineIndex,
      lineName: promoName.value,
      fromDate: fromDate.value,
      toDate: toDate.value,
      promotionType: promoTypeValue.value.value,
    },

  })

  const data = res.data

  if (data.respType !== 200) {
    isDialogVisible.value = true
    title.value = 'Đã xảy ra lỗi'
    message.value = data.responseMsg
    resErr.value = true

    return
  }

  editedLineIndex = res.data.valueReponse.data.id
}

async function saveDetail() {
  const res = await $api('/api/promotion/create-update/promotiondetail', {
    method: 'POST',
    data: {
      promotionLineId: editedLineIndex,
      detailCode: detailCode.value,
      discount: discount.value,
      maxDiscount: maxdiscount.value,
      conditionApply: conditionApply.value,
    },
  })

  const data = res.data

  if (data.respType === 200) {
    isDialogVisible.value = true
    title.value = 'Thông báo'
    message.value = 'Thêm/Chỉnh sửa dòng khuyến mãi thành công'
    link.value = `/promotion/edit/${route.params.id}`
    resErr.value = false
  }
  else {
    isDialogVisible.value = true
    title.value = 'Đã xảy ra lỗi'
    message.value = data.responseMsg
    resErr.value = true
  }
}

async function saveLineAndDetail() {
  if (refFormLine.value) {
    const validation = await refFormLine.value.validate()
    if (validation.valid) {
      try {
        await saveLine()
        await saveDetail()
      }
      catch (error) {
        console.error('Error saving line or detail:', error)

        return
      }

      closeLine()
      resetDialog()
      await getLines()
    }
  }
}

watch(dialogLine, val => {
  if (!val)
    closeLine()
})

watch(dialogLineDelete, val => {
  if (!val)
    closeLineDelete()
})

const resolveVariant = (type: number) => {
  const statLowerCase = type
  if (statLowerCase === 1)
    return 'Giá'
  if (statLowerCase === 2)
    return 'Chiết khấu'
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
        Chỉnh sửa chương trình khuyến mãi
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
              v-model="promotion.code"
              :rules="[requiredValidator]"
              disabled="true"
              :label="$t('Code')"
            />
          </VCol>

          <!-- 👉 Full name -->
          <VCol
            cols="12"
            md="6"
          >
            <AppTextField
              v-model="promotion.name"
              :rules="[requiredValidator]"
              :disabled="isLessThanCurrentDate || checkStatus"
              label="Tên chương trình"
            />
          </VCol>

          <!-- 👉 Email -->
          <VCol
            cols="12"
            md="6"
          >
            <AppDateTimePicker
              v-model="promotion.fromDate"
              label="Ngày bắt đầu"
              :disabled="isLessThanCurrentDate || checkStatus"
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
              v-model="promotion.toDate"
              label="Ngày kết thúc"
              :disabled="isLessThanCurrentDate || checkStatus"
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
              v-model="promotion.description"
              label="Giới thiệu chi tiết"
              :disabled="isLessThanCurrentDate || checkStatus"
              placeholder="Nhập giới thiệu"
              rows="2"
            />
          </VCol>

          <VCardText>
            <VTable>
              <thead>
                <tr>
                  <th class="text-center">
                    ID
                  </th>
                  <th class="text-center">
                    Tên dòng
                  </th>
                  <th class="text-center">
                    Ngày bắt đầu
                  </th>
                  <th class="text-center">
                    Ngày kết thúc
                  </th>
                  <th class="text-center">
                    Loại khuyến mãi
                  </th>
                  <th class="text-center">
                    Trạng thái
                  </th>
                  <th
                    v-if="!isLessThanCurrentDate && !checkStatus"
                    class="text-center"
                  >
                    <VIcon
                      class="me-2"
                      size="small"
                      icon="tabler-plus"
                      @click="addLine"
                    />
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, index) in newPromoLines"
                  :key="index"
                >
                  <td class="text-center">
                    {{ item.id }}
                  </td>
                  <td class="text-center">
                    {{ item.promoName }}
                  </td>
                  <td class="text-center">
                    {{ item.fromDate }}
                  </td>
                  <td class="text-center">
                    {{ item.toDate }}
                  </td>
                  <td class="text-center">
                    {{ resolveVariant(item.promoType) }}
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
                  <td
                    v-if="!isLessThanCurrentDate && !checkStatus"
                    class="text-center"
                  >
                    <VIcon
                      class="me-2"
                      size="small"
                      icon="tabler-edit"
                      @click="editLine(item.id)"
                    />
                    <VIcon
                      size="small"
                      icon="tabler-trash"
                      @click="deleteLine(item.id)"
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
              to="/promotion/list"
            >
              Trở lại
            </VBtn>
          </VCol>
        </VRow>
      </VForm>
      <VDialog
        v-model="dialogLine"
        max-width="1000px"
        persistent
      >
        <VCard>
          <VCardTitle>
            <span class="text-h5">{{ editedLineIndex === -1 ? 'Thêm dòng khuyến mãi' : 'Chỉnh sửa dòng khuyến mãi' }}</span>
          </VCardTitle>

          <VCardText>
            <VForm
              ref="refFormLine"
              v-model="isFormLineValid"
              @submit.prevent="saveLineAndDetail"
            >
              <VRow>
                <!-- 👉 Full name -->
                <VCol
                  cols="12"
                  md="6"
                >
                  <AppTextField
                    v-model="lineCode"
                    :rules="[requiredValidator]"
                    :disabled="isLessThanCurrentDate || checkStatus"
                    :label="$t('Code')"
                    placeholder="TET2024"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                  mb="12"
                >
                  <AppTextField
                    v-model="promoName"
                    label="Tên dòng khuyến mãi"
                    :rules="[requiredValidator]"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                  mb="12"
                >
                  <AppDateTimePicker
                    v-model="fromDate"
                    label="Ngày bắt đầu"
                    clear-icon="tabler-x"
                    clearable
                    :config="{ minDate: promotion.fromDate }"
                    :rules="[requiredValidator]"
                    placeholder="Chọn ngày"
                  />
                </VCol>

                <VCol
                  cols="12"
                  md="6"
                  mb="12"
                >
                  <AppDateTimePicker
                    v-model="toDate"
                    label="Ngày kết thúc"
                    clear-icon="tabler-x"
                    :config="{ minDate: promotion.fromDate }"
                    clearable
                    :rules="[requiredValidator]"
                    placeholder="Chọn ngày"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                  mb="12"
                >
                  <AppSelect
                    v-model="promoTypeValue"
                    :items="promoTypes"
                    return-object
                    label="Loại dòng khuyến mãi"
                    :rules="[requiredValidator]"
                  />
                </VCol>
                <VDivider />
                <VCol
                  cols="12"
                  md="12"
                >
                  <span>Chi tiết khuyến mãi</span>
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                >
                  <AppTextField
                    v-model="detailCode"
                    :label="$t('Code')"
                    placeholder="TET2024"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                  mb="12"
                >
                  <AppTextField
                    v-model="discount"
                    label="Giảm giá"
                    :rules="[requiredValidator]"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                  mb="12"
                >
                  <AppTextField
                    v-model="maxdiscount"
                    :disabled="checkPromoType"
                    label="Giảm giá tối đa"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                  mb="12"
                >
                  <AppTextField
                    v-model="conditionApply"
                    :disabled="!checkPromoType"
                    label="Giá mua tối thiểu"
                  />
                </VCol>
              </VRow>
              <VRow>
                <VSpacer />
                <VBtn
                  color="blue-darken-1"
                  variant="text"
                  @click="closeLine"
                >
                  Thoát
                </VBtn>
                <VBtn
                  color="blue-darken-1"
                  variant="text"
                  type="submit"
                  :disabled="isLessThanCurrentDate || checkStatus"
                >
                  Lưu dòng khuyến mãi
                </VBtn>
              </VRow>
            </VForm>
          </VCardText>
        </VCard>
      </VDialog>
      <VDialog
        v-model="dialogLineDelete"
        max-width="500px"
      >
        <VCard>
          <VCardTitle class="text-h5">
            Bạn có muốn xoá dòng khuyến mãi này không?
          </VCardTitle>
          <VCardActions>
            <VSpacer />
            <VBtn
              color="blue-darken-1"
              variant="text"
              @click="closeLineDelete"
            >
              Cancel
            </VBtn>
            <VBtn
              color="blue-darken-1"
              variant="text"
              @click="deleteLineConfirm"
            >
              OK
            </VBtn>
            <VSpacer />
          </VCardActions>
        </VCard>
      </VDialog>
    </VCardText>
  </VCard>
  <ReponseDialog
    :is-dialog-visible="isDialogVisible"
    :title="title"
    :message="message"
    :link="link"
    :is-error="resErr"
    @update:is-dialog-visible="handleDialogVisibility"
  />
</template>
