<script setup lang="ts">
interface Props {
  title: string
  message: string
  color: string
  icon: string
  isDialogVisible: boolean
}

interface Emit {
  (e: 'update:isDialogVisible', val: boolean): void
}
const props = defineProps<Props>()
const emit = defineEmits<Emit>()

const dialogModelValueUpdate = (val: boolean) => {
  emit('update:isDialogVisible', val)
}
</script>

<template>
  <VDialog
    :width="$vuetify.display.smAndDown ? 'auto' : 677"
    :model-value="props.isDialogVisible"
    @update:model-value="dialogModelValueUpdate"
  >
    <!-- Dialog close btn -->
    <DialogCloseBtn @click="dialogModelValueUpdate(false)" />

    <VCard class="pa-sm-8 pa-5">
      <VCardItem class="text-center">
        <VCardTitle class="text-h3 mb-3">
          {{ props.title }}
        </VCardTitle>
      </VCardItem>
      <VCardText>
        <VIcon
          large
          :color="props.color"
          :icon="props.icon"
        />
        {{ props.message }}
      </VCardText>
      <VCardActions>
        <VSpacer />
        <VBtn
          color="green darken-1"
          @click="emit('update:isDialogVisible', false)"
        >
          OK
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>
