<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <span>陕ICP备13004859号</span>
        <span> - </span>
        <span>
          <a href="">SITEMAP</a>
        </span>
        <span> - </span>
        <span>Powered By NodePress Dsigned By Surmon used Vue.js</span>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'footer'
}
</script>

<style lang="scss">
  @import '../../sass/variables';
  footer {
    margin-top: 20px;
    background-color: $module-bg;

    .footer-content {
      padding: 1em;
      font-size: .9em;
      text-align: center;
      color: #333;
      text-transform: uppercase;
    }
  }
</style>
