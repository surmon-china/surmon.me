<template>
  <footer class="footer">
    <div class="container" :class="{ mobile: mobileLayout }">
      <div class="footer-content" v-if="!mobileLayout">
        <span>陕ICP备13004859号</span>
        <span> - </span>
        <a class="sitemap-btn" href="/sitemap.xml" target="_blank">SITEMAP</a>
        <span> - </span>
        <span>Powered By </span>
        <router-link to="/project">NodePress</router-link>
        <span> and </span>
        <router-link to="/project">Nuxt.js</router-link>
        <span>. Dsigned By </span>
        <router-link to="/about">Surmon</router-link>
        <span> used </span>
        <a class="sitemap-btn" href="https://cn.vuejs.org/" target="_blank" rel="external nofollow">Vue.js</a>
      </div>
      <div class="footer-content" v-if="mobileLayout">Surmon.me</div>
    </div>
  </footer>
</template>

<script>
  export default {
    name: 'footer',
    computed: {
      mobileLayout() {
        return this.$store.state.option.mobileLayout
      }
    }
  }
</script>

<style lang="scss">
  @import '~assets/sass/variables';
  footer {
    margin-top: 1em;
    background-color: $module-bg;

    .container {
      position: relative;

      &.mobile {
        width: 100%;
      }

      .footer-content {
        padding: 1em;
        font-size: .9em;
        text-align: center;
        text-transform: uppercase;
      }
    }
  }
</style>
