<template>
  <footer id="footer" class="footer">
    <div class="container">
      <!-- <a
        class="ipc"
        target="_blank"
        rel="external nofollow noopener"
        href="http://www.beian.miit.gov.cn"
      >陕 ICP 备 13004859 号-2</a> -->
      <a
        class="sitemap-btn"
        href="/sitemap.xml"
        target="_blank"
        v-i18n="LANGUAGE_KEYS.PAGE_SITEMAP"
      />
      <span class="separator">|</span>
      <i18n zh="由 " en="Powered By " />
      <a
        target="_blank"
        class="item"
        rel="external nofollow noopener"
        href="https://github.com/surmon-china/nodepress"
      >NodePress</a>
      <i18n zh="、" en=", " />
      <a
        target="_blank"
        class="item"
        rel="external nofollow noopener"
        href="https://github.com/surmon-china/vuniversal"
      >Vuniversal</a>
      <i18n
        zh=" 和 日月星辰 强力驱动"
        en=" and solitarily"
      />
      <span class="separator">|</span>
      <i18n>
        <template #zh>
          <router-link to="/about" key="zh">吾之臂躯</router-link>
          <span> 行针步线</span>
        </template>
        <template #en>
          <span>Designed By </span>
          <router-link to="/about" key="en">Me</router-link>
        </template>
      </i18n>
    </div>
  </footer>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'
  import { LANGUAGE_KEYS } from '/@/language/key'
  import { Language } from '/@/language/data'

  export default defineComponent({
    name: 'PcFooter',
    setup() {
      return {
        LANGUAGE_KEYS
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
