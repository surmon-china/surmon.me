<script lang="ts" setup>
  import QrcodeProvider from './_qrcode.vue'
  const props = defineProps<{
    qrcode: string
    text: string
  }>()
</script>

<template>
  <qrcode-provider class="alipay-provider" :qrcode="props.qrcode">
    <div class="text">
      <i class="iconfont icon-qrcode"></i>
      <span>{{ props.text }}</span>
    </div>
  </qrcode-provider>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .alipay-provider {
    @include mix.radius-box(100%);

    .text {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: $font-size-h5;

      .iconfont {
        font-size: $font-size-h1 * 2;
        margin-bottom: $gap-tiny;
      }
    }
  }
</style>
