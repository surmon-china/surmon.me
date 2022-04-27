<template>
  <div class="sponsor-page">
    <page-banner image="/images/page-sponsor/banner.webp" :blur="false">
      <template #title>
        <webfont>
          <i18n zh="赠吾玫瑰，手留余香" en="Become a sponsor to me" />
        </webfont>
      </template>
      <template #description>
        <i18n>
          <template #zh>愿我的输出对你有所帮助，对我来说那是最好的褒奖和鼓励</template>
          <template #en
            >Your generous financial support is my motivation to keep moving forward</template
          >
        </i18n>
      </template>
    </page-banner>
    <div class="tips">
      <i18n :k="LanguageKey.SPONSOR_TEXT" />
    </div>
    <div class="sponsor-wrapper">
      <sponsor class="sponsor" :init-id="initSponsor" />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'
  import { Language, LanguageKey } from '/@/language'
  import { useEnhancer } from '/@/app/enhancer'
  import { firstUpperCase } from '/@/transforms/text'
  import Sponsor from '/@/components/widget/sponsor.vue'
  import PageBanner from '/@/components/common/fullpage/banner.vue'

  export default defineComponent({
    name: 'SponsorPage',
    components: {
      Sponsor,
      PageBanner
    },
    setup() {
      const { route, i18n, meta, isZhLang } = useEnhancer()
      const initSponsor = computed(() => route.hash.replace('#', ''))
      meta(() => {
        const enTitle = firstUpperCase(i18n.t(LanguageKey.PAGE_SPONSOR, Language.English)!)
        const titles = isZhLang.value ? [i18n.t(LanguageKey.PAGE_SPONSOR), enTitle] : [enTitle]
        return { pageTitle: titles.join(' | ') }
      })

      return { LanguageKey, initSponsor }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/variables.scss';
  @import 'src/styles/mixins.scss';

  .sponsor-page {
    width: 100%;
    min-height: $full-page-active-content-height;
    display: flex;
    flex-direction: column;

    .tips {
      width: 100%;
      height: 3em;
      line-height: 3em;
      text-align: center;
      color: $text-disabled;
      background-color: $module-bg-lighter;
      letter-spacing: 1px;
    }

    .sponsor-wrapper {
      flex-grow: 1;
      display: flex;
      background-color: $module-bg;

      .sponsor {
        flex-shrink: 0;
        width: $container-width;
        margin: 2rem auto;
        border-radius: $xs-radius;
        overflow: hidden;
      }
    }
  }
</style>
