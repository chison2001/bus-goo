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
  value: 1,
  title: 'Giá',
} as Item)

const toDate = ref('')
const detailCode = ref('')
const discount = ref('')
const maxdiscount = ref()
const conditionApply = ref()
const route = useRoute('promotion-edit-id')
const checkPromoType = ref(true)

watch(promoTypeValue, val => {
  if (val.value === 1) {
    checkPromoType.value = true
    maxdiscount.value = null
  }
  if (val.value === 2) {
    checkPromoType.value = false
    conditionApply.value = null
  }
})

const response = await $api('api/promotion/get-by-id', {
  method: 'GET',
  params: { promotionId: route.params.id },
})

const promotion = computed(() => response.data.valueReponse.data)
const comparisonDate = new Date(promotion.value.fromDate)
const currentDate = new Date()
const isLessThanCurrentDate = comparisonDate < currentDate
const checkStatus = promotion.value.status === 0

const onSubmit = () => {
  refForm.value?.validate().then(({ valid }) => {
    if (valid) {
      nextTick(() => {
        refForm.value?.reset()
        refForm.value?.resetValidation()
      })
    }
  })
}

async function getLines() {
  const res = await $api('api/promotion/get-line', {
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
let editedDetailIndex: number | null = null
let deletedId = -1

async function getLineByID(id: number) {
  const res = await $api('api/promotion/get-detail', {
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
  promoTypeValue.value.value = line.promotionType
  toDate.value = line.toDate
  editedDetailIndex = data.id
  detailCode.value = data.code
  discount.value = data.discount
  maxdiscount.value = data.maxDiscount
  conditionApply.value = data.conditionApply
  if (promoTypeValue.value.value === 1)
    checkPromoType.value = true
  if (promoTypeValue.value.value === 2)
    checkPromoType.value = false
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
function deleteLineConfirm() {
  newPromoLines.value.splice(deletedId, 1)
  closeLineDelete()
}

// Function to close promo line dialog
function closeLine() {
  nextTick(() => {
    refFormLine.value?.reset()
    fromDate.value = ''
    toDate.value = ''
    refFormLine.value?.resetValidation()
  })
  dialogLine.value = false
}

// Function to close promo line deletion dialog
function closeLineDelete() {
  dialogLineDelete.value = false
}

async function saveLine() {
  const res = await $api('api/promotion/create-update/promotionline', {
    method: 'POST',
    data: {
      lineCode: lineCode.value,
      promotionId: promotion.value.id,
      promotionLineId: editedLineIndex,
      lineName: lineCode.value,
      fromDate: fromDate.value,
      toDate: toDate.value,
      promotionType: promoTypeValue.value.value,
    },

  })

  editedLineIndex = res.data.valueReponse.data.id
}

async function saveDetail() {
  await $api('api/promotion/create-update/promotiondetail', {
    method: 'POST',
    data: {
      promotionLineId: editedLineIndex,
      detailCode: detailCode.value,
      discount: discount.value,
      maxDiscount: maxdiscount.value,
      conditionApply: conditionApply.value,
    },

  })
}

function saveLineAnDetail() {
  refFormLine.value?.validate().then(async ({ valid }) => {
    if (valid) {
      await saveLine()
      await saveDetail()
      closeLine()
      nextTick(() => {
        refFormLine.value?.reset()
        fromDate.value = ''
        toDate.value = ''
        refFormLine.value?.resetValidation()
      })
    }
  })
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
              :disabled="isLessThanCurrentDate || checkStatus"
              :label="$t('Code')"
              placeholder="TET2024"
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
                  <th class="text-center">
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
                  <td class="text-center">
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
                  <AppCombobox
                    v-model="promoTypeValue"
                    :items="promoTypes"
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
                    v-model="discount"
                    label="Giảm giá"
                    :disabled="isLessThanCurrentDate || checkStatus"
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
                    label="Giảm giá tối đa"
                    :disabled="isLessThanCurrentDate || checkStatus || checkPromoType"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                  mb="12"
                >
                  <AppTextField
                    v-model="conditionApply"
                    label="Giá mua tối thiểu"
                    :disabled="isLessThanCurrentDate || checkStatus || !checkPromoType"
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
                  @click="saveLineAnDetail"
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
</template>
