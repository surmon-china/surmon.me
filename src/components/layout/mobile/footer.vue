<script lang="ts" setup>
  import { META } from '/@/config/app.config'
  const year = new Date().getFullYear()
  const title = META.title
</script>

<template>
  <footer class="footer">
    <div class="footer-content">©{{ year }}&nbsp;&nbsp;{{ title }}</div>
  </footer>
</template>

<style lang="scss" scoped>
  @import 'src/styles/variables.scss';
  @import 'src/styles/mixins.scss';

  .footer {
    margin: 0;
    @include common-bg-module();

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
