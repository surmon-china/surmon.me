<template>
  <footer class="footer">
    <div class="footer-content">©{{ year }}&nbsp;&nbsp;{{ title }}</div>
  </footer>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { META } from '/@/config/app.config'
  export default defineComponent({
    name: 'MobileFooter',
    setup() {
      return {
        title: META.title,
        year: new Date().getFullYear()
      }
    }
  })
</script>

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
