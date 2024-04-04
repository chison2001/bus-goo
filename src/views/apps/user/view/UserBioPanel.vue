<script setup lang="ts">
interface RegionParent {
  fullName: string
}

interface RegionDetail {
  fullName: string
  regionParent: RegionParent
}
interface Props {
  userData: {
    id: number
    fullName: string
    address: string
    phone: string
    userCode: string
    status: number
    regeionDetail: RegionDetail
    addressDescription: string
  }
}

const props = defineProps<Props>()

// 👉 Status variant resolver
const resolveUserStatusVariant = (stat: number) => {
  const statLowerCase = stat
  if (statLowerCase === 1)
    return { color: 'success', value: 'active' }
  if (statLowerCase === 0)
    return { color: 'secondary', value: 'inactive' }
}
</script>

<template>
  <VRow>
    <!-- SECTION User Details -->
    <VCol cols="12">
      <VCard v-if="props.userData">
        <VCardText class="text-center pt-15">
          <!-- 👉 User fullName -->
          <h6 class="text-h4 mt-4">
            {{ props.userData.fullName }}
          </h6>
        </VCardText>

        <VDivider />

        <!-- 👉 Details -->
        <VCardText>
          <p class="text-sm text-uppercase text-disabled">
            Thông tin chi tiết người dùng
          </p>

          <!-- 👉 User Details list -->
          <VList class="card-list mt-2">
            <VListItem>
              <VListItemTitle>
                <h6 class="text-h6">
                  Họ và tên:
                  <span class="text-body-1">
                    {{ props.userData.fullName }}
                  </span>
                </h6>
              </VListItemTitle>
            </VListItem>
            <VListItem>
              <VListItemTitle>
                <h6 class="text-h6">
                  Số điện thoại:
                  <span class="text-body-1">{{ props.userData.phone }}</span>
                </h6>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <h6 class="text-h6">
                  Địa chỉ:
                  <span class="text-body-1">{{ `${props.userData.addressDescription}, ${props.userData.regeionDetail.fullName}, ${props.userData.regeionDetail.regionParent.fullName}` }}</span>
                </h6>
              </VListItemTitle>
            </VListItem>
            <VListItem>
              <VListItemTitle>
                <h6 class="text-h6">
                  Status:

                  <VChip
                    :color="resolveUserStatusVariant(props.userData.status)?.color"
                    size="small"
                    label
                    class="text-capitalize"
                  >
                    {{ resolveUserStatusVariant(props.userData.status)?.value }}
                  </VChip>
                </h6>
              </VListItemTitle>
            </VListItem>
          </VList>
        </VCardText>

        <!-- 👉 Edit and Suspend button -->
        <VCardText class="d-flex justify-center">
          <VBtn
            variant="outlined"
            color="secondary"
            to="/user/list"
          >
            Trở lại
          </VBtn>
        </VCardText>
      </VCard>
    </VCol>
  </vrow>
</template>

<style lang="scss" scoped>
.card-list {
  --v-card-list-gap: 0.75rem;
}

.text-capitalize {
  text-transform: capitalize !important;
}
</style>
