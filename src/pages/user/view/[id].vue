<script setup lang="ts">
import $api from '@/utils/api'
import UserBioPanel from '@/views/apps/user/view/UserBioPanel.vue'

const route = useRoute('user-view-id')

const res = await $api('api/user/get', {
  method: 'GET',
  params: {
    userId: route.params.id,
  },

})

const userData = res.data.valueReponse.data
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
