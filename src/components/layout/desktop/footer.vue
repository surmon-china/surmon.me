<template>
  <footer :id="FOOTER_ELEMENT_ID" class="footer">
    <div class="container">
      <a class="sitemap-btn" target="_blank" :href="VALUABLE_LINKS.SITE_MAP">sitemap.xml</a>
      <divider type="vertical" />
      <i18n zh="由 " en="Powered By " />
      <ulink class="item" :href="VALUABLE_LINKS.GITHUB_BLOG_LIST">NodePress</ulink>
      <i18n zh="、" en=", " />
      <ulink class="item" :href="VALUABLE_LINKS.SURMON_ME">Vue</ulink>
      <i18n zh=" 和 日月星辰 强力驱动" en=" and solitarily" />
      <divider type="vertical" />
      <i18n>
        <template #zh>
          <router-link :to="aboutPageUrl" key="zh">吾之臂躯</router-link>
          <span> 行针步线</span>
        </template>
        <template #en>
          <span>Designed By </span>
          <router-link :to="aboutPageUrl" key="en">Me</router-link>
        </template>
      </i18n>
    </div>
  </footer>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { RouteName } from '/@/app/router'
  import { FOOTER_ELEMENT_ID } from '/@/constants/anchor'
  import { LANGUAGE_KEYS } from '/@/language/key'
  import { getPageRoute } from '/@/transforms/route'
  import { VALUABLE_LINKS } from '/@/config/app.config'

  export default defineComponent({
    name: 'DesktopFooter',
    setup() {
      return {
        FOOTER_ELEMENT_ID,
        VALUABLE_LINKS,
        LANGUAGE_KEYS,
        aboutPageUrl: getPageRoute(RouteName.About)
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/init.scss';

  .footer {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: $footer-height;
    margin-top: $lg-gap;
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

      .ipc {
        margin-right: $xs-gap;
      }
    }
  }
</style>
