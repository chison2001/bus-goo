<script setup lang="ts">
import UserBioPanel from '@/views/apps/user/view/UserBioPanel.vue'

const route = useRoute('user-view-id')

const { data: userData } = await useApi<any>(`/apps/users/${route.params.id}`)
</script>

<template>
  <VRow v-if="userData">
    <VCol
      cols="12"
      lg="12"
    >
      <UserBioPanel :user-data="userData" />
    </VCol>
  </VRow>
</template>
