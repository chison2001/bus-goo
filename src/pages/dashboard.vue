<script setup lang="ts">
import CrmEarningReportsYearlyOverview from '@/views/dashboards/crm/CrmEarningReportsYearlyOverview.vue'

const statisticsCards = [
  {
    icon: 'tabler-user',
    color: 'primary',
    title: 'Tổng người dùng',
    subTitle: 'Tháng trước',
    stat: '1.28k',
    change: '+2%',
  },
  {
    icon: 'tabler-packages',
    color: 'warning',
    title: 'Tổng hoá đơn',
    subTitle: 'Tháng trước',
    stat: '1.2k',
    change: '-10%',
  },
  {
    icon: 'tabler-chart-bar',
    color: 'info',
    title: 'Tổng doanh thu',
    subTitle: 'Tháng trước',
    stat: '200.000.000vnd',
    change: '+5.2%',
  },
  {
    icon: 'tabler-clock',
    color: 'error',
    title: 'Tổng hoá đơn chờ xử lí',
    subTitle: 'Tháng trước',
    stat: '200',
    change: '+2.2%',
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
          <p class="text-md text-disabled my-1 mb-0">
            {{ $t(card.subTitle) }}
          </p>
          <p class="mb-5">
            {{ card.stat }}
          </p>
          <VChip
            color="disabled"
            label
          >
            {{ card.change }}
          </VChip>
        </VCardText>
      </VCard>
    </VCol>

    <!-- 👉 Earning Reports -->
    <VCol
      cols="12"
      md="12"
    >
      <CrmEarningReportsYearlyOverview />
    </VCol>
  </VRow>
</template>
