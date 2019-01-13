<template>
  <footer id="footer" class="footer">
    <div class="container">
      <div class="footer-content">
        <!-- <span>陕ICP备13004859号</span> -->
        <!-- <span> - </span> -->
        <a class="sitemap-btn" href="/sitemap.xml" target="_blank" v-text="$i18n.nav.map">SITEMAP.XML</a>
        <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>

        <!-- english -->
        <span v-if="isEnLang">
          <span>Powered By</span>
          <nuxt-link to="/project">NodePress</nuxt-link>
          <span>、</span>
          <nuxt-link to="/project">Nuxt.js</nuxt-link>
          <span>and solitarily.</span>
          <span>&nbsp; Designed By</span>
          <nuxt-link to="/about">Me</nuxt-link>
        </span>

        <!-- chinese -->
        <span v-else>
          <span>由&nbsp;</span>
          <nuxt-link to="/project">NodePress</nuxt-link>
          <span>、</span>
          <nuxt-link to="/project">Nuxt.js</nuxt-link>
          <span>&nbsp;和&nbsp;日月星辰&nbsp;强力驱动&nbsp;</span>
          <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
          <nuxt-link to="/about">吾之臂躯</nuxt-link>
          <span>&nbsp;行针步线</span>
        </span>
      </div>
    </div>
  </footer>
</template>

<script>
  export default {
    name: 'pc-footer',
    computed: {
      isEnLang() {
        return this.$store.state.global.isEnLang
      }
    }
  }
</script>

<style lang="scss" scoped>
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
