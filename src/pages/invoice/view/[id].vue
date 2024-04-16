<script setup lang="ts">
import type { Level, RenderAs } from 'qrcode.vue'
import QrcodeVue from 'qrcode.vue'
import $api from '@/utils/api'
import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
import { themeConfig } from '@themeConfig'

const val = ref('qrcode')
const level = ref<Level>('M')
const renderAs = ref<RenderAs>('svg')
interface OrderDetail {
  orderDetailId: null | number
  code: string
  seatId: number
  seatName: string
  price: number
  orderId: number
}
const route = useRoute('reservation-view-id')
const router = useRouter()

const res = await $api('/api/invoice/get', {
  method: 'GET',
  params: {
    invoiceId: route.params.id,
  },

})

const invoiceData = res.data.valueReponse.data

// 👉 Print Invoice
const printInvoice = () => {
  window.print()
}

function formatPrice(value: number) {
  return `${value.toLocaleString('vi-VN')} VNĐ`
}

function formatDateString(dateString: string) {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')

  return `${hours}:${minutes} ${day}-${month}-${year}`
}
</script>

<template>
  <section v-if="invoiceData">
    <VRow>
      <VCol
        cols="12"
        md="9"
      >
        <VCard>
          <!-- SECTION Header -->
          <VCardText class="d-flex flex-wrap justify-space-between flex-column flex-sm-row print-row">
            <!-- 👉 Left Content -->
            <div class="ma-sm-4">
              <div class="d-flex align-center mb-6">
                <!-- 👉 Logo -->
                <VNodeRenderer
                  :nodes="themeConfig.app.logo"
                  class="me-3"
                />

                <!-- 👉 Title -->
                <h6 class="font-weight-bold text-capitalize text-h4">
                  {{ themeConfig.app.title }}
                </h6>
              </div>

              <!-- 👉 Address -->
              <p class="mb-0">
                Văn phòng 34 Toà nhà ATOWN
              </p>
              <p class="my-2">
                37 Điện Biên Phủ, phường 22, Bình Thạnh, Hồ Chí Minh
              </p>
              <p class="mb-0">
                0378256368, 0356375245
              </p>
            </div>

            <!-- 👉 Right Content -->
            <div class="mt-4 ma-sm-4">
              <!-- 👉 Invoice ID -->
              <h6 class="font-weight-medium text-h4">
                Hoá đơn #{{ invoiceData.code }}
              </h6>

              <!-- 👉 Issue Date -->
              <p class="my-3">
                <span>Ngày đặt </span>
                <span>{{ new Date(invoiceData.timeBooking).toLocaleDateString('en-GB') }}</span>
              </p>
              <VRow class="justify-center mt-3">
                <QrcodeVue
                  :value="val"
                  :level="level"
                  :render-as="renderAs"
                />
              </VRow>
            </div>
          </VCardText>
          <!-- !SECTION -->

          <VDivider />

          <!-- 👉 Payment Details -->
          <VCardText class="d-flex justify-space-between flex-wrap flex-column flex-sm-row print-row">
            <div class="ma-sm-4">
              <h6 class="text-base font-weight-medium mb-6">
                Người đặt vé
              </h6>
              <p class="mb-1">
                {{ invoiceData.userName }}
              </p>
              <p class="mb-1">
                {{ invoiceData.userPhone }}
              </p>
              <p class="mb-1">
                {{ invoiceData.userAddress }}
              </p>
            </div>
            <div class="mt-4 ma-sm-4">
              <h6 class="text-h6 font-weight-medium mb-6">
                Thông tin vé
              </h6>
              <table>
                <tbody>
                  <tr>
                    <td class="pe-6 pb-1">
                      Tuyến đường:
                    </td>
                    <td class="pb-1">
                      <span class="font-weight-medium">
                        {{ invoiceData.busTrip }}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td class="pe-6 pb-1">
                      Thời gian đặt:
                    </td>
                    <td class="pb-1">
                      <span class="font-weight-medium">
                        {{ invoiceData.timeBooking }}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td class="pe-6 pb-1">
                      Thời gian khởi hành:
                    </td>
                    <td class="pb-1">
                      <span class="font-weight-medium">
                        {{ formatDateString(invoiceData.timeStarted) }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </VCardText>

          <!-- 👉 Table -->
          <VDivider />

          <VTable class="invoice-preview-table">
            <thead>
              <tr>
                <th
                  scope="col"
                  class="text-center"
                >
                  Các ghế đã đặt
                </th>
                <th
                  scope="col"
                  class="text-center"
                >
                  Giá
                </th>
                <th
                  scope="col"
                  class="text-center"
                >
                  Số lượng
                </th>
                <th
                  scope="col"
                  class="text-center"
                >
                  Thành tiền
                </th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td class="text-center">
                  {{ invoiceData.list.map((detail: OrderDetail) => detail.seatName).join(', ') }}
                </td>
                <td class="text-center">
                  {{ formatPrice(invoiceData.list[0].price) }}
                </td>
                <td class="text-center">
                  {{ invoiceData.list.length }}
                </td>
                <td class="text-center">
                  {{ formatPrice(invoiceData.list[0].price * invoiceData.list.length) }}
                </td>
              </tr>
            </tbody>
          </VTable>

          <VDivider class="mb-2" />

          <!-- Total -->
          <VCardText class="d-flex justify-space-between flex-column flex-sm-row print-row">
            <div class="my-2 mx-sm-4">
              <table>
                <tbody>
                  <tr>
                    <td class="text-end">
                      <div class="me-5">
                        <p class="mb-2">
                          Tổng phụ:
                        </p>
                        <p class="mb-2">
                          Giảm giá:
                        </p>
                        <p class="mb-2">
                          Thuế:
                        </p>
                        <p class="mb-2">
                          Tổng tiền:
                        </p>
                      </div>
                    </td>

                    <td class="font-weight-medium text-high-emphasis">
                      <p class="mb-2">
                        {{ formatPrice(invoiceData.totalTiketPrice) }}
                      </p>
                      <p class="mb-2">
                        {{ formatPrice(invoiceData.totalDiscount) }}
                      </p>
                      <p class="mb-2">
                        {{ formatPrice(0) }}
                      </p>
                      <p class="mb-2">
                        {{ formatPrice(invoiceData.total) }}
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </VCardText>
        </VCard>
      </VCol>

      <VCol
        cols="12"
        md="3"
        class="d-print-none"
      >
        <VCard>
          <VCardText>
            <VBtn
              block
              variant="tonal"
              class="mb-2"
              @click="printInvoice"
            >
              In hoá đơn
            </VBtn>

            <VBtn
              block
              variant="tonal"
              color="secondary"
              class="mb-2"
              @click="router.push('/invoice/list')"
            >
              Trở lại
            </VBtn>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </section>
</template>

<style lang="scss">
.invoice-preview-table {
  --v-table-row-height: 44px !important;
}

@media print {
  .v-theme--dark {
    --v-theme-surface: 255, 255, 255;
    --v-theme-on-surface: 94, 86, 105;
  }

  body {
    background: none !important;
  }

  @page { margin: 0; size: auto; }

  .layout-page-content,
  .v-row,
  .v-col-md-9 {
    padding: 0;
    margin: 0;
  }

  .product-buy-now {
    display: none;
  }

  .v-navigation-drawer,
  .layout-vertical-nav,
  .app-customizer-toggler,
  .layout-footer,
  .layout-navbar,
  .layout-navbar-and-nav-container {
    display: none;
  }

  .v-card {
    box-shadow: none !important;

    .print-row {
      flex-direction: row !important;
    }
  }

  .layout-content-wrapper {
    padding-inline-start: 0 !important;
  }

  .v-table__wrapper {
    overflow: hidden !important;
  }
}
</style>
