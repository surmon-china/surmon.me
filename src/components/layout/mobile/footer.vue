<script lang="ts" setup>
  import { APP_META } from '/@/configs/app.config'
  const year = new Date().getFullYear()
  const title = APP_META.title
</script>

<template>
  <footer class="footer">
    <div class="footer-content">©{{ year }}&nbsp;&nbsp;{{ title }}</div>
  </footer>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .footer {
    margin: 0;
    @include mix.common-bg-module();

    .footer-content {
      width: 100%;
      height: $mobile-footer-height;
      line-height: $mobile-footer-height;
      font-size: $font-size-h6;
      text-align: center;
      text-transform: uppercase;
    }
  }
</style>
