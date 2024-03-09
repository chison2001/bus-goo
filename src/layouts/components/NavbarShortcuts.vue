<script setup lang="ts">
const shortcuts = [
  {
    icon: 'tabler-calendar',
    title: 'Lịch',
    subtitle: 'Xem lịch',
    to: { name: 'apps-calendar' },
  },
  {
    icon: 'tabler-file-plus',
    title: 'Đặt vé',
    subtitle: 'Đặt vé',
    to: { name: 'reservation-add' },
  },
  {
    icon: 'tabler-user',
    title: 'Người dùng',
    subtitle: 'Quản lí người dùng',
    to: { name: 'user-list' },
  },
  {
    icon: 'tabler-settings',
    title: 'Cài đặt',
    subtitle: 'Cài đặt tài khoản',
    to: { name: 'pages-account-settings-tab', params: { tab: 'account' } },
  },

]
</script>

<template>
  <Shortcuts :shortcuts="shortcuts" />
</template>
