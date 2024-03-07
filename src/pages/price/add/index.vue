<script setup lang="ts">
import { VForm } from 'vuetify/components/VForm'
import type { Price, PriceDetail } from '@db/apps/price/types'

const isFormValid = ref(false)
const refForm = ref<VForm>()
const isFormDetailValid = ref(false)
const refFormDetail = ref<VForm>()
const fromDate = ref('')
const toDate = ref('')
const description = ref('')
const status = ref('Active')
const statusDetail = ref('Active')
const newPriceDetails = ref([] as PriceDetail[])
const routes = ['Hồ Chí Minh - Đà Lạt', 'Hồ Chí Minh - Nha Trang', 'Hồ Chí Minh - Bình Thuận', 'Hồ Chí Minh - Hà Nội', 'Hồ Chí Minh - Hải Phòng', 'Hồ Chí Minh - Đà Nẵng']
const typeBuses = ['Ghế', 'Giường', 'Limousine']
const boxRoute = ref('')
const boxTypeBus = ref('')
const priceValue = ref('')

const price = ref<Price>({
  id: 0,
  priceCode: 'PRICE001',
  fromDate: '',
  toDate: '',
  description: '',
  status: 'Active',
  priceDetails: [],
})

const dialog = ref(false)
const dialogDelete = ref(false)
const editedIndex = ref(-1)

let editedDetail: PriceDetail = {
  id: 0,
  priceDetailCode: '',
  priceValue: '',
  status: '',
  typeBus: '',
  route: '',
}

const defaultDetail: PriceDetail = {
  id: 0,
  priceDetailCode: '',
  priceValue: '',
  status: '',
  typeBus: '',
  route: '',
}

// 👉 drawer close
const closeDialog = () => {
  nextTick(() => {
    refForm.value?.reset()
    refForm.value?.resetValidation()
  })
}

const onSubmit = () => {
  refForm.value?.validate().then(({ valid }) => {
    if (valid) {
      price.value = {
        id: 0,
        priceCode: 'PRICE001',
        fromDate: fromDate.value,
        toDate: toDate.value,
        description: description.value,
        status: status.value,
        priceDetails: newPriceDetails.value,
      }
      nextTick(() => {
        refForm.value?.reset()
        refForm.value?.resetValidation()
      })
    }
  })
}

function editDetail(item: PriceDetail) {
  editedIndex.value = newPriceDetails.value.indexOf(item)
  statusDetail.value = item.status
  boxTypeBus.value = item.typeBus
  boxRoute.value = item.route
  priceValue.value = item.priceValue
  editedDetail = { ...item } // Spread operator for deep copy
  dialog.value = true
}

function deleteDetail(item: PriceDetail) {
  editedIndex.value = newPriceDetails.value.indexOf(item)
  editedDetail = { ...item }
  dialogDelete.value = true
}

function deleteDetailConfirm() {
  newPriceDetails.value.splice(editedIndex.value, 1)
  closeDelete()
}

function close() {
  dialog.value = false
  nextTick(() => {
    editedDetail = { ...defaultDetail }
    editedIndex.value = -1
  })
}

function closeDelete() {
  dialogDelete.value = false
  nextTick(() => {
    editedDetail = { ...defaultDetail }
    editedIndex.value = -1
  })
}

function save() {
  refFormDetail.value?.validate().then(({ valid }) => {
    if (valid) {
      editedDetail.status = statusDetail.value
      editedDetail.typeBus = boxTypeBus.value
      editedDetail.route = boxRoute.value
      editedDetail.priceValue = priceValue.value
      if (editedIndex.value > -1)
        Object.assign(newPriceDetails.value[editedIndex.value], editedDetail)
      else
        newPriceDetails.value.push(editedDetail)
      close()
      nextTick(() => {
        refFormDetail.value?.reset()
        refFormDetail.value?.resetValidation()
      })
    }
  })
}

watch(dialog, val => {
  if (!val)
    close()
})

watch(dialogDelete, val => {
  if (!val)
    closeDelete()
})
</script>

<template>
  <VCard class="pa-sm-8 pa-5">
    <VCardItem class="text-center">
      <VCardTitle class="text-h3 mb-3">
        Thêm đơn giá
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
            <AppDateTimePicker
              v-model="fromDate"
              :rules="[requiredValidator]"
              label="Ngày có hiệu lực"
            />
          </VCol>

          <!-- 👉 Email -->
          <VCol
            cols="12"
            md="6"
          >
            <AppDateTimePicker
              v-model="toDate"
              :rules="[requiredValidator]"
              label="Ngày hết hiệu lực"
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
              :items="[{ title: 'Active', value: 'Active' }, { title: 'Inactive', value: 'Inactive' }]"
            />
          </VCol>

          <!-- 👉 Role -->
          <VCol
            cols="12"
            md="6"
          >
            <AppTextarea
              v-model="description"
              rows="1"
              label="Ghi chú"
              :items="['Admin', 'Manager', 'Staff', 'Customer']"
            />
          </VCol>
          <VCardText>
            <VBtn @click="dialog = true">
              Thêm chi tiết
            </VBtn>
            <VTable>
              <thead>
                <tr>
                  <th class="text-center">
                    STT
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
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, index) in newPriceDetails"
                  :key="index"
                >
                  <td class="text-center">
                    {{ index + 1 }}
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
                    {{ item.status }}
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
              @click="closeDialog"
            >
              Huỷ
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
            <span class="text-h5">{{ editedIndex === -1 ? 'Thêm chi tiết' : 'Chỉnh sửa chi tiết' }}</span>
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
                    label="Loại xe"
                    :rules="[requiredValidator]"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                  mb="12"
                >
                  <AppSelect
                    v-model="statusDetail"
                    label="Trạng thái"
                    :rules="[requiredValidator]"
                    :items="[{ title: 'Active', value: 'Active' }, { title: 'Inactive', value: 'Inactive' }]"
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
