<script lang="ts" setup>
  import { onMounted, onBeforeMount } from 'vue'
  import { Language, LocaleKey } from '/@/locales'
  import { useEnhancer } from '/@/app/enhancer'
  import { usePageSeo } from '/@/composables/head'
  import { useGitHubSponsorsStore } from '/@/stores/sponsors'
  import { useSponsorState, ProviderId } from '/@/components/widgets/sponsor/state'
  import { firstUpperCase } from '/@/transforms/text'
  import SponsorTabs from '/@/components/widgets/sponsor/tabs.vue'
  import SponsorProvider from '/@/components/widgets/sponsor/provider.vue'
  import PageBanner from '/@/components/common/banner.vue'

  const { i18n: _i18n, route, isZhLang } = useEnhancer()
  const sponsorState = useSponsorState()
  const githubSponsorsStore = useGitHubSponsorsStore()

  usePageSeo(() => {
    const enTitle = firstUpperCase(_i18n.t(LocaleKey.PAGE_SPONSOR, Language.English)!)
    const titles = isZhLang.value ? [_i18n.t(LocaleKey.PAGE_SPONSOR)!, enTitle] : [enTitle]
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
    <page-banner image="/images/page-sponsor/banner.webp" cdn>
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
      <container class="tabs-wrapper">
        <sponsor-tabs class="sponsor-tabs" :state="sponsorState" />
      </container>
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
    min-height: $full-page-active-content-height;
    display: flex;
    flex-direction: column;

    .page-content {
      flex-grow: 1;
      display: flex;
      flex-direction: column;

      .tabs-wrapper {
        background-color: $module-bg-translucent;
        .sponsor-tabs {
          height: 8rem;
        }
      }

      .sponsor-provider {
        flex: 1;
        margin: 0 auto;
        width: $container-width;
        min-height: 27rem;
        overflow: hidden;
      }
    }
  }
</style>
