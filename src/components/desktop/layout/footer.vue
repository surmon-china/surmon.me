<script lang="ts" setup>
  import { useEnhancer } from '/@/app/enhancer'
  import { LocalesKey } from '/@/locales'
  import { FOOTER_ELEMENT_ID } from '/@/constants/element-anchor'
  import { RESOURCE_LINKS, BFF_CONFIG } from '/@/configs/app.config'

  const { globalState, goLinks } = useEnhancer()
</script>

<template>
  <footer :id="FOOTER_ELEMENT_ID" class="footer" v-disabled-wallflower>
    <div class="container">
      <ulink class="link" :href="BFF_CONFIG.route_path_sitemap">sitemap.xml</ulink>
      <divider type="vertical" />
      <i18n zh="构建于 " en="Built with " />
      <ulink class="link" :href="RESOURCE_LINKS.GITHUB_SURMON_ME">Vue</ulink>
      <i18n zh=" 和 日月星辰" en="" />
      <divider type="vertical" />
      <button class="button" @click="globalState.toggleSwitcher('statementModal', true)">
        <i18n zh="周知" en="FAQ" />
      </button>
      <divider type="vertical" />
      <button class="button" @click="globalState.toggleSwitcher('feedbackModal', true)">
        <i18n :k="LocalesKey.FEEDBACK" />
      </button>
      <divider type="vertical" />
      <ulink
        class="link"
        href="/privacy/index.html"
        @click.prevent="globalState.toggleSwitcher('privacyModal', true)"
      >
        <i18n :k="LocalesKey.PRIVACY" />
      </ulink>
      <divider type="vertical" />
      <ulink class="link" :href="goLinks.status">
        <i18n zh="实态" en="STATUS" />
      </ulink>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .footer {
    display: flex;
    align-items: center;
    height: $footer-height;
    text-align: center;
    text-transform: uppercase;
    color: $color-text-secondary;
    @include mix.common-bg-module();

    .link:hover {
      @include mix.text-underline();
    }

    .button {
      vertical-align: baseline;
      text-transform: uppercase;
      color: $color-link;
      &:hover {
        color: $color-link-hover;
      }
    }
  }
</style>
