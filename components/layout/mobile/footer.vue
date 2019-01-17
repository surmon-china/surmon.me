<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">©{{ year }}&nbsp;&nbsp;Surmon.me</div>
    </div>
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
    padding: 1rem 0;
    background-color: $module-bg;

    .container {
      width: 100%;
      position: relative;

      .footer-content {
        padding: 1rem;
        font-size: .9em;
        text-align: center;
        text-transform: uppercase;
      }
    }
  }
</style>
