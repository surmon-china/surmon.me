<template>
  <div class="sponsor-page">
    <page-banner image="/images/page-sponsor/banner.webp" :blur="false">
      <template #title>
        <webfont>
          <i18n zh="赠吾玫瑰，手留余香" en="Become a sponsor to me" />
        </webfont>
      </template>
      <template #description>
        <i18n
          zh="你的慷慨赞助将是我持续输出的不竭动力"
          en="Your generous financial support is my motivation to keep moving forward"
        />
      </template>
    </page-banner>
    <div class="sponsor-wrapper">
      <div class="tabs-wrapper">
        <div class="container">
          <sponsor-tabs class="tabs" :state="sponsorState" />
        </div>
      </div>
      <sponsor-provider class="provider" :state="sponsorState" />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted } from 'vue'
  import { Language, LanguageKey } from '/@/language'
  import { firstUpperCase } from '/@/transforms/text'
  import { useEnhancer } from '/@/app/enhancer'
  import { useSponsorState, ProviderId } from '/@/components/widget/sponsor/state'
  import SponsorTabs from '/@/components/widget/sponsor/tabs.vue'
  import SponsorProvider from '/@/components/widget/sponsor/provider.vue'
  import PageBanner from '/@/components/common/fullpage/banner.vue'

  export default defineComponent({
    name: 'SponsorPage',
    components: {
      SponsorTabs,
      SponsorProvider,
      PageBanner
    },
    setup() {
      const { route, i18n, meta, isZhLang } = useEnhancer()
      const sponsorState = useSponsorState()

      meta(() => {
        const enTitle = firstUpperCase(i18n.t(LanguageKey.PAGE_SPONSOR, Language.English)!)
        const titles = isZhLang.value ? [i18n.t(LanguageKey.PAGE_SPONSOR), enTitle] : [enTitle]
        return { pageTitle: titles.join(' | ') }
      })

      onMounted(() => {
        const targetId = route.hash.replace('#', '')
        if (targetId) {
          sponsorState.setProviderId(targetId as ProviderId)
        }
      })

      return { LanguageKey, sponsorState }
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

    .sponsor-wrapper {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      background-color: $module-bg;

      .tabs-wrapper {
        background-color: $module-bg-lighter;
      }

      .tabs {
        height: 8rem;
      }

      .provider {
        flex: 1;
        margin: 0 auto;
        width: $container-width;
        overflow: hidden;
      }
    }
  }
</style>
