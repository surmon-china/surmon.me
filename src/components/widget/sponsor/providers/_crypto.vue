<script lang="ts" setup>
  import { useEnhancer } from '/@/app/enhancer'
  import { copy } from '/@/utils/clipboard'

  const props = defineProps<{
    address: string
    qrcode: string
  }>()

  const { isZhLang, popup } = useEnhancer()

  const handleClickQRCode = () => {
    popup.vImage(props.qrcode)
  }

  const handleCopyAddress = () => {
    copy(props.address).then(() => {
      alert(isZhLang.value ? '地址已复制到剪贴板！' : 'Address copied!')
    })
  }
</script>

<template>
  <div class="crypto-provider">
    <code class="address" @click="handleCopyAddress">{{ props.address }}</code>
    <i class="iconfont icon-qrcode" @click="handleClickQRCode"></i>
  </div>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .crypto-provider {
    padding: 0 1em;
    line-height: 3em;
    border-radius: $radius-sm;
    transition: background-color $motion-duration-fast;
    background-color: $module-bg-darker-2;
    &:hover {
      background-color: $module-bg-darker-3;
    }

    .address {
      cursor: pointer;
      font-size: $font-size-base;
      font-family: $font-family-monospace;
      color: $color-text;
      &:hover {
        color: $color-link;
      }
    }

    .iconfont {
      margin-left: $gap;
      cursor: pointer;
      color: $color-text;
      &:hover {
        color: $color-link;
      }
    }
  }
</style>
