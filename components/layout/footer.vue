<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <!-- <span>陕ICP备13004859号</span> -->
        <!-- <span> - </span> -->
        <a class="sitemap-btn" href="/sitemap.xml" target="_blank">SITEMAP.XML</a>
        <span> &nbsp; </span>
        <span>Powered By </span>
        <router-link to="/project">NodePress</router-link>
        <span>、</span>
        <router-link to="/project">Nuxt.js</router-link>
        <span> and solitarily. &nbsp; Designed By </span>
        <router-link to="/about">Me</router-link>
      </div>
    </div>
  </footer>
</template>

<script>
  export default {
    name: 'layout-footer'
  }
</script>

<style lang="scss" scoped>
  @import '~assets/sass/variables';
  footer {
    margin-top: 1em;
    background-color: $module-bg;

    .container {
      position: relative;

      .footer-content {
        padding: 1em;
        font-size: .9em;
        text-align: center;
        text-transform: uppercase;
      }
    }
  }
</style>
