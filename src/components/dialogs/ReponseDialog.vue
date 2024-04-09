<script setup lang="ts">
interface Props {
  title: string
  message: string
  isDialogVisible: boolean
  link: string
  isError: boolean
}
interface Emit {
  (e: 'update:isDialogVisible', val: boolean): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emit>()

const dialogModelValueUpdate = (val: boolean) => {
  emit('update:isDialogVisible', val)
}

const router = useRouter()

const icon = ref()
const color = ref()

watchEffect(() => {
  if (props.isError) {
    icon.value = 'tabler-exclamation-circle'
    color.value = 'error'
  }
  else {
    icon.value = 'tabler-circle-check'
    color.value = 'success'
  }
})
function close() {
  if (!props.isError) {
    router.push(props.link)
    dialogModelValueUpdate(false)
  }
  else { dialogModelValueUpdate(false) }
}
</script>

<template>
  <VDialog
    :width="$vuetify.display.smAndDown ? 'auto' : 500"
    :model-value="props.isDialogVisible"
    @update:model-value="dialogModelValueUpdate"
  >
    <VCard class="pa-sm-8 pa-5">
      <VCardItem>
        <VCardTitle class="text-h3 mb-3 ">
          <VIcon
            large
            :color="color"
            :icon="icon"
          />
          {{ props.title }}
        </VCardTitle>
      </VCardItem>
      <VCardText>
        {{ props.message }}
      </VCardText>
      <VCardActions>
        <VSpacer />
        <VBtn
          color="green darken-1"
          @click="close"
        >
          OK
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>
