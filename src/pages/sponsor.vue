<script lang="ts" setup>
  import { onMounted, onBeforeMount } from 'vue'
  import { Language, LocalesKey } from '/@/locales'
  import { useEnhancer } from '/@/app/enhancer'
  import { usePageSeo } from '/@/composables/head'
  import { useGitHubSponsorsStore } from '/@/stores/sponsors'
  import { useSponsorState, ProviderId } from '/@/components/desktop/widgets/sponsor/state'
  import SponsorProvider from '/@/components/desktop/widgets/sponsor/provider.vue'
  import SponsorTabs from '/@/components/desktop/widgets/sponsor/tabs.vue'
  import PageBanner from '/@/components/desktop/widgets/page-banner.vue'
  import { firstUpperCase } from '/@/transforms/text'

  const { route, isZhLang, i18n: _i18n } = useEnhancer()
  const githubSponsorsStore = useGitHubSponsorsStore()
  const sponsorState = useSponsorState()

  usePageSeo(() => {
    const enTitle = firstUpperCase(_i18n.t(LocalesKey.PAGE_SPONSOR, Language.English)!)
    const titles = isZhLang.value ? [_i18n.t(LocalesKey.PAGE_SPONSOR)!, enTitle] : [enTitle]
    return { pageTitles: titles }
  })

  onBeforeMount(() => {
    githubSponsorsStore.fetch()
  })

  onMounted(() => {
    const targetId = route.hash.replace('#', '')
    if (targetId) {
      sponsorState.setProviderId(targetId as ProviderId)
    }
  })
</script>

<template>
  <div class="sponsor-page">
    <page-banner background-image="/images/page-sponsor/banner.webp" cdn>
      <template #title>
        <webfont>
          <i18n zh="隨喜一念，各得其安" en="Become a sponsor to me" />
        </webfont>
      </template>
      <template #description>
        <i18n
          zh="你的慷慨赞助将是我持续输出的不竭动力"
          en="Your generous financial support is my motivation to keep moving forward"
        />
      </template>
    </page-banner>
    <div class="page-content">
      <div class="tabs-wrapper">
        <div class="container">
          <sponsor-tabs class="sponsor-tabs" :state="sponsorState" />
        </div>
      </div>
      <sponsor-provider
        class="sponsor-provider"
        :state="sponsorState"
        :github-sponsors-data="githubSponsorsStore.data"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .sponsor-page {
    width: 100%;
    min-height: $full-page-content-height;
    display: flex;
    flex-direction: column;

    .page-content {
      flex-grow: 1;
      display: flex;
      flex-direction: column;

      .tabs-wrapper {
        background-color: $module-bg-translucent;

        .sponsor-tabs {
          height: 6rem;
        }
      }

      .sponsor-provider {
        flex: 1;
        margin: 0 auto;
        width: $container-width;
        min-height: 24rem;
        overflow: hidden;
      }
    }
  }
</style>
