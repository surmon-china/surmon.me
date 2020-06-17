<template>
  <footer id="footer" class="footer">
    <div class="container">
      <!-- <a
        target="_blank"
        rel="external nofollow noopener"
        href="http://www.beian.miit.gov.cn"
      >陕ICP备13004859号-2</a>
      <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span> -->
      <a
        class="sitemap-btn"
        href="/sitemap.xml"
        target="_blank"
        v-i18n="LANGUAGE_KEYS.PAGE_SITEMAP"
      />
      <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
      <i18n zh="由&nbsp;" en="Powered By&nbsp;" />
      <a
        target="_blank"
        class="item"
        rel="external nofollow noopener"
        href="https://github.com/surmon-china/nodepress"
      >NodePress</a>
      <i18n zh="、" en=",&nbsp;" />
      <a
        target="_blank"
        class="item"
        rel="external nofollow noopener"
        href="https://github.com/surmon-china/vuniversal"
      >Vuniversal</a>
      <i18n>
        <template #zh>
          <span>&nbsp;和&nbsp;日月星辰&nbsp;强力驱动&nbsp;&nbsp;|&nbsp;&nbsp;</span>
          <router-link to="/about" key="zh">吾之臂躯</router-link>
          <span>&nbsp;行针步线</span>
        </template>
        <template #en>
          <span>&nbsp;and solitarily.&nbsp; Designed By&nbsp;</span>
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
  import { useI18n } from '/@/services/i18n'

  export default defineComponent({
    name: 'PcFooter',
    setup() {
      const i18n = useI18n()
      const isZhLang = computed(() => i18n.language.value === Language.Zh)

      return {
        isZhLang,
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
    user-select: none;
    @include module-blur-bg();

    .container {
      font-size: $font-size-h6;
      text-align: center;
      text-transform: uppercase;
    }
  }
</style>
