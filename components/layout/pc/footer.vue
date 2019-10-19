<template>
  <footer id="footer" class="footer">
    <div class="container">
      <div class="footer-content">
        <a
          class="sitemap-btn"
          href="/sitemap.xml"
          target="_blank"
          v-text="$i18n.nav.map"
        />
        <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
        <!-- english -->
        <span v-if="isEnLang">
          <span>Powered By</span>
          <a
            target="_blank"
            class="item"
            rel="external nofollow noopener"
            href="https://github.com/surmon-china/nodepress"
          >
            NodePress
          </a>
          <span>、</span>
          <a
            target="_blank"
            class="item"
            rel="external nofollow noopener"
            href="https://github.com/surmon-china/surmon.me"
          >
            Nuxt.js
          </a>
          <span>and solitarily.</span>
          <span>&nbsp; Designed By</span>
          <nuxt-link to="/about">Me</nuxt-link>
        </span>
        <!-- chinese -->
        <span v-else>
          <span>由&nbsp;</span>
          <a
            target="_blank"
            class="item"
            rel="external nofollow noopener"
            href="https://github.com/surmon-china/nodepress"
          >
            NodePress
          </a>
          <span>、</span>
          <a
            target="_blank"
            class="item"
            rel="external nofollow noopener"
            href="https://github.com/surmon-china/surmon.me"
          >
            Nuxt.js
          </a>
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
        return this.$store.getters['global/isEnLang']
      }
    }
  }
</script>

<style lang="scss" scoped>
  footer {
    margin-top: 1em;
    @include module-blur-bg();

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
