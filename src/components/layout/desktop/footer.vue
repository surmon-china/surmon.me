<template>
  <footer :id="FOOTER_ELEMENT_ID" class="footer">
    <div class="container">
      <ulink class="sitemap-btn" :href="VALUABLE_LINKS.SITE_MAP">sitemap.xml</ulink>
      <divider type="vertical" />
      <i18n zh="由 " en="Powered By " />
      <ulink class="item" :href="VALUABLE_LINKS.GITHUB_BLOG_STAR_LIST">NodePress</ulink>
      <i18n zh="、" en=", " />
      <ulink class="item" :href="VALUABLE_LINKS.GITHUB_SURMON_ME">Vue</ulink>
      <i18n zh=" 和 日月星辰 强力驱动" en="" />
      <divider type="vertical" />
      <i18n>
        <template #zh>
          <router-link :to="aboutPageUrl">吾之臂躯</router-link>
          <span> 行针步线</span>
        </template>
        <template #en>
          <span>Designed By </span>
          <router-link :to="aboutPageUrl">Me</router-link>
        </template>
      </i18n>
      <divider type="vertical" />
      <a class="statement" href="javascript:void(0)" @click="handleStatementModal">
        <i18n zh="周知" en="FAQ" />
      </a>
      <divider type="vertical" />
      <ulink :href="VALUABLE_LINKS.UPTIME_STATUS">
        <i18n zh="时态" en="STATUS" />
      </ulink>
    </div>
  </footer>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { RouteName } from '/@/app/router'
  import { GAEventCategories } from '/@/constants/gtag'
  import { FOOTER_ELEMENT_ID } from '/@/constants/anchor'
  import { getPageRoute } from '/@/transforms/route'
  import { VALUABLE_LINKS } from '/@/config/app.config'

  export default defineComponent({
    name: 'DesktopFooter',
    setup() {
      const { globalState, gtag } = useEnhancer()
      const handleStatementModal = () => {
        globalState.toggleSwitcher('statement', true)
        gtag?.event('statement_modal', {
          event_category: GAEventCategories.Universal
        })
      }

      return {
        FOOTER_ELEMENT_ID,
        VALUABLE_LINKS,
        aboutPageUrl: getPageRoute(RouteName.About),
        handleStatementModal
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/variables.scss';
  @import 'src/styles/mixins.scss';

  .footer {
    display: flex;
    align-items: center;
    height: $footer-height;
    @include common-bg-module();

    .container {
      color: $text-secondary;
      font-size: $font-size-h6;
      text-align: center;
      text-transform: uppercase;

      a {
        border-bottom: 1px solid transparent;
        &:hover {
          border-color: initial;
        }
      }
    }
  }
</style>
