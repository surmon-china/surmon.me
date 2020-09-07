<template>
  <footer id="footer" class="footer">
    <div class="container">
      <ulink
        class="ipc"
        href="http://www.beian.miit.gov.cn"
        v-if="false"
      >
        陕 ICP 备 13004859 号-2
      </ulink>
      <a
        class="sitemap-btn"
        href="/sitemap.xml"
        target="_blank"
        v-i18n="LANGUAGE_KEYS.PAGE_ARCHIVE"
      />
      <span class="separator">|</span>
      <i18n zh="由 " en="Powered By " />
      <ulink
        class="item"
        href="https://github.com/surmon-china/nodepress"
      >
        NodePress
      </ulink>
      <i18n zh="、" en=", " />
      <ulink
        class="item"
        href="https://github.com/surmon-china/vuniversal"
      >
        Vuniversal
      </ulink>
      <i18n
        zh=" 和 日月星辰 强力驱动"
        en=" and solitarily"
      />
      <span class="separator">|</span>
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
  import { defineComponent, computed } from 'vue'
  import { RouteName } from '/@/router'
  import { LANGUAGE_KEYS } from '/@/language/key'
  import { Language } from '/@/language/data'
  import { getPageRoute } from '/@/transforms/route'
  export default defineComponent({
    name: 'PcFooter',
    setup() {
      return {
        LANGUAGE_KEYS,
        aboutPageUrl: getPageRoute(RouteName.About)
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/assets/styles/init.scss';

  .footer {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: $footer-height;
    margin-top: $lg-gap;
    @include common-bg-module();

    .container {
      font-size: $font-size-h6;
      text-align: center;
      text-transform: uppercase;

      .separator {
        margin: 0 $sm-gap;
      }

      .ipc {
        margin-right: $xs-gap;
      }
    }
  }
</style>
