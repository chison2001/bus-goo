<script setup lang="ts">
import { VForm } from 'vuetify/components/VForm'
import type { PromoDetail, PromoLine } from '@db/apps/promotion/types'

const isFormValid = ref(false)
const refForm = ref<VForm>()
const isFormLineValid = ref(false)
const refFormLine = ref<VForm>()
const isFormDetailValid = ref(false)
const refFormDetail = ref<VForm>()
const newPromoDetails = ref([] as PromoDetail[])
const newPromoLines = ref([] as PromoLine[])
const promoTypes = ['chiết khấu', 'giá']
const promoName = ref('')
const fromDate = ref('')
const promoTypeValue = ref('')
const toDate = ref('')
const discount = ref('')
const maxdiscount = ref('')
const conditionApply = ref('')
const route = useRoute('promotion-edit-id')

const { data: promotion } = await useApi<any>(`/apps/promotions/${route.params.id}`)

newPromoLines.value = promotion.value.promoLines

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

const dialogDetail = ref(false)
const dialogDetailDelete = ref(false)
const editedDetailIndex = ref(-1)
const dialogLine = ref(false)
const dialogLineDelete = ref(false)
const editedLineIndex = ref(-1)

let editedDetail: PromoDetail = {
  id: 0,
  code: '',
  discount: '',
  maxdiscount: '',
  conditionApply: '',
}

const defaultDetail: PromoDetail = {
  id: 0,
  code: '',
  discount: '',
  maxdiscount: '',
  conditionApply: '',
}

let editedLine: PromoLine = {
  id: 0,
  code: '',
  promoName: '',
  fromDate: '',
  promoType: '',
  toDate: '',
  promoDetails: [],
}
const defaultLine: PromoLine = { id: 0, code: '', promoName: '', fromDate: '', promoType: '', toDate: '', promoDetails: [] }

function addLine() {
  dialogLine.value = true
  newPromoDetails.value = []
  promoName.value = ''
  fromDate.value = ''
  toDate.value = ''
  promoTypeValue.value = ''
}

// Function to edit promo line
function editLine(item: PromoLine) {
  editedLineIndex.value = newPromoLines.value.indexOf(item)
  promoName.value = item.promoName
  fromDate.value = item.fromDate
  promoTypeValue.value = item.promoType
  toDate.value = item.toDate
  newPromoDetails.value = { ...item.promoDetails }
  editedLine = { ...item }
  dialogLine.value = true
}

// Function to delete promo line
function deleteLine(item: PromoLine) {
  editedLineIndex.value = newPromoLines.value.indexOf(item)
  editedLine = { ...item }
  dialogLineDelete.value = true
}

// Function to confirm deletion of promo line
function deleteLineConfirm() {
  newPromoLines.value.splice(editedLineIndex.value, 1)
  closeLineDelete()
}

// Function to close promo line dialog
function closeLine() {
  dialogLine.value = false
  nextTick(() => {
    editedLine = { ...defaultLine }
    editedLineIndex.value = -1
  })
}

// Function to close promo line deletion dialog
function closeLineDelete() {
  dialogLineDelete.value = false
  nextTick(() => {
    editedLine = { ...defaultLine }
    editedLineIndex.value = -1
  })
}

// Function to save promo line
function saveLine() {
  editedLine.promoName = promoName.value
  editedLine.fromDate = fromDate.value
  editedLine.promoType = promoTypeValue.value
  editedLine.toDate = toDate.value
  editedLine.promoDetails = newPromoDetails.value
  newPromoDetails.value = []
  refFormLine.value?.validate().then(({ valid }) => {
    if (valid) {
      if (editedLineIndex.value > -1)
        Object.assign(newPromoLines.value[editedLineIndex.value], editedLine)
      else
        newPromoLines.value.push(editedLine)
      closeLine()
      nextTick(() => {
        refFormLine.value?.reset()
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

function addDetail() {
  dialogDetail.value = true
  discount.value = ''
  maxdiscount.value = ''
  conditionApply.value = ''
}

function editDetail(item: PromoDetail) {
  editedDetailIndex.value = newPromoDetails.value.indexOf(item)
  discount.value = item.discount
  maxdiscount.value = item.maxdiscount
  conditionApply.value = item.conditionApply
  editedDetail = { ...item }
  dialogDetail.value = true
}

function deleteDetail(item: PromoDetail) {
  editedDetailIndex.value = newPromoDetails.value.indexOf(item)
  editedDetail = { ...item }
  dialogDetailDelete.value = true
}

function deleteDetailConfirm() {
  newPromoDetails.value.splice(editedDetailIndex.value, 1)
  closeDetailDelete()
}

function closeDetail() {
  dialogDetail.value = false
  nextTick(() => {
    editedDetail = { ...defaultDetail }
    editedDetailIndex.value = -1
  })
}

function closeDetailDelete() {
  dialogDetailDelete.value = false
  nextTick(() => {
    editedDetail = { ...defaultDetail }
    editedDetailIndex.value = -1
  })
}

function saveDetail() {
  editedDetail.discount = discount.value
  editedDetail.maxdiscount = maxdiscount.value
  editedDetail.conditionApply = conditionApply.value
  refFormDetail.value?.validate().then(({ valid }) => {
    if (valid) {
      if (editedDetailIndex.value > -1)
        Object.assign(newPromoDetails.value[editedDetailIndex.value], editedDetail)
      else
        newPromoDetails.value.push(editedDetail)
      closeDetail()
      nextTick(() => {
        refFormDetail.value?.reset()
        refFormDetail.value?.resetValidation()
      })
    }
  })
}

watch(dialogDetail, val => {
  if (!val)
    closeDetail()
})

watch(dialogDetailDelete, val => {
  if (!val)
    closeDetailDelete()
})
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
              :label="$t('Code')"
              placeholder="TET2024"
            />
          </VCol>

          <!-- 👉 Status -->
          <VCol
            cols="12"
            md="6"
          >
            <AppSelect
              v-model="promotion.status"
              label="Chọn trạng thái"
              placeholder="Chọn trạng thái"
              :rules="[requiredValidator]"
              :items="[{ title: 'Active', value: 'active' }, { title: 'Inactive', value: 'inactive' }]"
            />
          </VCol>

          <!-- 👉 Email -->
          <VCol
            cols="12"
            md="6"
          >
            <AppDateTimePicker
              v-model="promotion.startDate"
              label="Ngày bắt đầu"
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
              placeholder="Nhập giới thiệu"
              rows="2"
            />
          </VCol>

          <VCardText>
            <VTable>
              <thead>
                <tr>
                  <th class="text-center">
                    STT
                  </th>
                  <th class="text-center">
                    CODE
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
                    Giảm giá tối đa
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
                    {{ index + 1 }}
                  </td>
                  <td class="text-center">
                    {{ item.code }}
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
                    {{ item.promoType }}
                  </td>
                  <td class="text-center">
                    <VIcon
                      class="me-2"
                      size="small"
                      icon="tabler-edit"
                      @click="editLine(item)"
                    />
                    <VIcon
                      size="small"
                      icon="tabler-trash"
                      @click="deleteLine(item)"
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
            >
              Thêm
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
              </VRow>
              <VCardText>
                <VTable>
                  <thead>
                    <tr>
                      <th class="text-center">
                        STT
                      </th>
                      <th class="text-center">
                        Giảm giá
                      </th>
                      <th class="text-center">
                        Giảm giá tối đa
                      </th>
                      <th class="text-center">
                        Điều kiện áp dụng
                      </th>
                      <th class="text-center">
                        <VIcon
                          class="me-2"
                          icon="tabler-plus"
                          @click="addDetail"
                        />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(item, index) in newPromoDetails"
                      :key="index"
                    >
                      <td class="text-center">
                        {{ index + 1 }}
                      </td>
                      <td class="text-center">
                        {{ item.discount }}
                      </td>
                      <td class="text-center">
                        {{ item.maxdiscount }}
                      </td>
                      <td class="text-center">
                        {{ item.conditionApply }}
                      </td>
                      <td class="text-center">
                        <VIcon
                          class="me-2"
                          size="small"
                          icon="tabler-edit"
                          @click="editDetail(item)"
                        />
                        <VIcon
                          size="small"
                          icon="tabler-trash"
                          @click="deleteDetail(item)"
                        />
                      </td>
                    </tr>
                  </tbody>
                </VTable>
              </VCardText>
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
                  @click="saveLine"
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
      <VDialog
        v-model="dialogDetail"
        max-width="500px"
      >
        <VCard>
          <VCardTitle>
            <span class="text-h5">{{ editedDetailIndex === -1 ? 'Thêm chi tiết' : 'Chỉnh sửa chi tiết' }}</span>
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
                    label="Giảm giá tối đa"
                    :rules="[requiredValidator]"
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
                    :rules="[requiredValidator]"
                  />
                </VCol>
              </VRow>
              <VRow>
                <VSpacer />
                <VBtn
                  color="blue-darken-1"
                  variant="text"
                  @click="closeDetail"
                >
                  Thoát
                </VBtn>
                <VBtn
                  color="blue-darken-1"
                  variant="text"
                  type="submit"
                  @click="saveDetail"
                >
                  Lưu chi tiết
                </VBtn>
              </VRow>
            </VForm>
          </VCardText>
        </VCard>
      </VDialog>
      <VDialog
        v-model="dialogDetailDelete"
        max-width="500px"
      >
        <VCard>
          <VCardTitle class="text-h5">
            Bạn có muốn xoá chi tiết khuyến mãi này không?
          </VCardTitle>
          <VCardActions>
            <VSpacer />
            <VBtn
              color="blue-darken-1"
              variant="text"
              @click="closeDetailDelete"
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
