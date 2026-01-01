<script lang="ts" setup>
  import { useStores } from '/@/stores'
  import { useEnhancer } from '/@/app/enhancer'
  import { GAEventCategories } from '/@/constants/google-analytics'
  import { FOOTER_ELEMENT_ID } from '/@/constants/element-anchor'
  import { VALUABLE_LINKS } from '/@/configs/app.config'

  const { goLink } = useStores()
  const { globalState, gtag } = useEnhancer()
  const handleStatementModal = () => {
    globalState.toggleSwitcher('statement', true)
    gtag?.event('statement_modal', {
      event_category: GAEventCategories.Universal
    })
  }
</script>

<template>
  <container tag="footer" :id="FOOTER_ELEMENT_ID" v-disabled-wallflower class="footer">
    <ulink class="sitemap-btn" :href="VALUABLE_LINKS.SITE_MAP">sitemap.xml</ulink>
    <divider type="vertical" />
    <i18n zh="构建于 " en="Built with " />
    <ulink class="item" :href="VALUABLE_LINKS.GITHUB_NODEPRESS">NodePress</ulink>
    <i18n zh="、" en=", " />
    <ulink class="item" :href="VALUABLE_LINKS.GITHUB_SURMON_ME">Vue</ulink>
    <i18n zh=" 和 日月星辰" en="" />
    <divider type="vertical" />
    <a class="statement" href="javascript:void(0)" @click="handleStatementModal">
      <i18n zh="周知" en="FAQ" />
    </a>
    <divider type="vertical" />
    <ulink :href="goLink.map.status">
      <i18n zh="实态" en="STATUS" />
    </ulink>
  </container>
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
    font-size: $font-size-h6;
    color: $color-text-secondary;
    @include mix.common-bg-module();

    a:hover {
      @include mix.text-underline();
    }
  }
</style>
