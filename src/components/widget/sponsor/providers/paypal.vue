<script lang="ts" setup>
  import QrcodeProvider from './_qrcode.vue'
  const props = defineProps<{
    qrcode: string
    link: string
  }>()
</script>

<template>
  <qrcode-provider class="paypal-provider" :qrcode="props.qrcode">
    <ulink class="link" :href="props.link">
      <i class="iconfont icon-link"></i>
    </ulink>
  </qrcode-provider>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .paypal-provider {
    @include mix.radius-box($radius-sm);

    .link {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: $font-size-h1 * 1.2;
      color: rgba($white, 0.8);
    }
  }
</style>
