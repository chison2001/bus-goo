<script setup lang="ts">
import { VForm } from 'vuetify/components/VForm'

import authV2MaskDark from '@images/pages/misc-mask-dark.png'
import authV2MaskLight from '@images/pages/misc-mask-light.png'

const authThemeMask = useGenerateImageVariant(authV2MaskLight, authV2MaskDark)

definePage({
  meta: {
    layout: 'blank',
    unauthenticatedOnly: true,
  },
})

const form = ref({
  phoneNumber: '',
  email: '',
  password: '',
  privacyPolicies: false,
})

const isPasswordVisible = ref(false)

const confirmPassword = ref('')
</script>

<template>
  <VRow
    no-gutters
    class="auth-wrapper bg-surface"
  >
    <VCol
      md="8"
      class="d-none d-md-flex"
    >
      <div class="position-relative bg-background rounded-lg w-100 ma-8 me-0">
        <div class="d-flex align-center justify-center w-100 h-100">
          <VImg
            max-width="1300"
            src="https://res.cloudinary.com/dwbnrx0mg/image/upload/v1705895258/doan/a_01-1920x1080-1a7d0f916f14ccb238fe9fd0862894ee_npwmhe.jpg"
            class="auth-illustration mt-16 mb-2"
          />
        </div>

        <VImg
          class="auth-footer-mask"
          :src="authThemeMask"
        />
      </div>
    </VCol>

    <VCol
      cols="12"
      md="4"
      class="auth-card-v2 d-flex align-center justify-center"
      style="background-color: rgb(var(--v-theme-surface));"
    >
      <VCard
        flat
        :max-width="500"
        class="mt-12 mt-sm-0 pa-4"
      >
        <VCardText>
          <img src="https://res.cloudinary.com/dwbnrx0mg/image/upload/c_thumb,w_200,g_face/v1705993978/doan/3752bcc334a1ba2613c6d389318f503b_xau5p1.jpg">
          <h5 class="text-h5 mb-1">
            Tạo một tài khoản mới
          </h5>
          <p class="mb-0">
            Đặt vé xe trở nên dễ dàng.
          </p>
        </VCardText>

        <VCardText>
          <VForm @submit.prevent="() => {}">
            <VRow>
              <!-- email -->
              <VCol cols="12">
                <AppTextField
                  v-model="form.email"
                  :rules="[requiredValidator, emailValidator]"
                  label="Email"
                  type="email"
                  placeholder="leson@email.com"
                />
              </VCol>

              <!-- PhoneNumber -->
              <VCol cols="12">
                <AppTextField
                  v-model="form.phoneNumber"
                  :rules="[requiredValidator, phoneNumberValidator]"
                  autofocus
                  label="Số điện thoại"
                  placeholder="0322345124"
                />
              </VCol>

              <!-- password -->
              <VCol cols="12">
                <AppTextField
                  v-model="form.password"
                  :rules="[requiredValidator]"
                  label="Mật khẩu"
                  placeholder="············"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                  @click:append-inner="isPasswordVisible = !isPasswordVisible"
                />
              </VCol>

              <VCol cols="12">
                <AppTextField
                  v-model="confirmPassword"
                  :rules="[requiredValidator, confirmedValidator(confirmPassword, form.password)]"
                  label="Xác nhận mật khẩu"
                  placeholder="············"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                  @click:append-inner="isPasswordVisible = !isPasswordVisible"
                />
                <br>
                <VBtn
                  block
                  type="submit"
                >
                  Đăng kí
                </VBtn>
              </VCol>

              <!-- create account -->
              <VCol
                cols="12"
                class="text-center text-base"
              >
                <span>Đã có tài khoản?</span>
                <RouterLink
                  class="text-primary ms-2"
                  :to="{ name: 'login' }"
                >
                  Hãy đăng nhập
                </RouterLink>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";
</style>
