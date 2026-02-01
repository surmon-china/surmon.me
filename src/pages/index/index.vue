<script lang="ts" setup>
  import { useEnhancer } from '/@/app/enhancer'
  import { usePageSeo } from '/@/composables/head'
  import { useUniversalFetch } from '/@/app/universal'
  import { useArticleListStore } from '/@/stores/article-list'
  import { useThreadsProfileStore, useThreadsLatestMediasStore } from '/@/stores/socials'
  import { LocalesKey } from '/@/locales'
  import { APP_PROFILE } from '/@/configs/app.config'
  import { scrollToNextScreen } from '/@/utils/scroller'
  import ArticleListMain from '/@/components/desktop/listing/index.vue'
  import Carrousel from './carrousel.vue'
  import Threads from './threads.vue'

  const { appOptions, isZhLang, i18n: _i18n } = useEnhancer()
  const articleListStore = useArticleListStore()
  const threadsProfileStore = useThreadsProfileStore()
  const threadsLatestMediasStore = useThreadsLatestMediasStore()

  const loadmoreArticles = async () => {
    await articleListStore.fetchNextPage()
    scrollToNextScreen()
  }

  usePageSeo(() => ({
    title: `${APP_PROFILE.title} - ${_i18n.t(LocalesKey.APP_SLOGAN)}`,
    description: isZhLang.value ? APP_PROFILE.description_zh : APP_PROFILE.description_en,
    keywords: appOptions.value?.keywords.join(',')
  }))

  useUniversalFetch(() => {
    return Promise.all([
      articleListStore.fetch(),
      threadsProfileStore.fetch().catch(() => {}),
      threadsLatestMediasStore.fetch().catch(() => {})
    ])
  })
</script>

<template>
  <div class="index-page">
    <carrousel class="carrousel" :articles="articleListStore.data" :fetching="articleListStore.fetching" />
    <threads
      class="threads"
      :profile="threadsProfileStore.data"
      :medias="threadsLatestMediasStore.data?.data ?? []"
      :fetching="threadsLatestMediasStore.fetching || threadsProfileStore.fetching || articleListStore.fetching"
    />
    <article-list-main
      :mammon="false"
      :articles="articleListStore.data"
      :pagination="articleListStore.pagination"
      :fetching="articleListStore.fetching"
      :has-more="articleListStore.hasMore"
      @loadmore="loadmoreArticles"
    />
  </div>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .index-page {
    .carrousel,
    .threads {
      margin-bottom: $gap;
    }
  }
</style>
