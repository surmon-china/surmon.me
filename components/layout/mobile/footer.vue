<template>
  <footer class="footer">
    <div class="footer-content">©{{ year }}&nbsp;&nbsp;Surmon.me</div>
  </footer>
</template>

<script>
  export default {
    name: 'mobile-footer',
    computed: {
      year() {
        return new Date().getFullYear()
      }
    }
  }
</script>

<style lang="scss" scoped>
  footer {
    margin: 0;
    @include module-blur-bg();

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
