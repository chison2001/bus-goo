<script setup lang="ts">
import $api from '@/utils/api'

const res = await $api('/api/report/dashboard', { method: 'GET' })

const { valueReponse } = res.data

function formatCurrency(amount) {
  return amount ? `${amount.toLocaleString('vi-VN')} VND` : '0 VND'
}

function formatCount(count) {
  return count ? count.toLocaleString('vi-VN') : '0'
}

const statisticsCards = [
  {
    icon: 'tabler-user',
    color: 'primary',
    title: 'Tổng người dùng',
    subTitle: 'Tháng trước',
    stat: formatCount(valueReponse.countUser),
  },
  {
    icon: 'tabler-packages',
    color: 'warning',
    title: 'Tổng hoá đơn',
    subTitle: 'Tháng trước',
    stat: formatCount(valueReponse.countInvoice),
  },
  {
    icon: 'tabler-chart-bar',
    color: 'info',
    title: 'Tổng doanh thu',
    subTitle: 'Tháng trước',
    stat: formatCurrency(valueReponse.income),
  },
  {
    icon: 'tabler-clock',
    color: 'error',
    title: 'Tổng hoá đơn chờ xử lí',
    subTitle: 'Tháng trước',
    stat: formatCount(valueReponse.countOrderInprogress),
  },
]
</script>

<template>
  <VRow class="match-height">
    <VCol
      v-for="card in statisticsCards"
      :key="card.title"
      cols="12"
      sm="12"
      md="6"
      lg="3"
    >
      <VCard>
        <VCardText>
          <VAvatar
            :color="card.color"
            variant="tonal"
            rounded
            size="60"
          >
            <VIcon :icon="card.icon" />
          </VAvatar>

          <h5 class="text-h4 mt-5">
            {{ $t(card.title) }}
          </h5>
          <p class="text-md  my-1 mb-0">
            {{ $t(card.subTitle) }}
          </p>
          <p class="mb-5">
            {{ card.stat }}
          </p>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>
