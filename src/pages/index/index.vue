<script lang="ts" setup>
  import { useStores } from '/@/stores'
  import { useEnhancer } from '/@/app/enhancer'
  import { usePageSeo } from '/@/composables/head'
  import { useUniversalFetch } from '/@/app/universal'
  import { LocalesKey } from '/@/locales'
  import { APP_PROFILE } from '/@/configs/app.config'
  import { isClient } from '/@/configs/app.env'
  import { scrollToNextScreen } from '/@/utils/scroller'
  import ArticleList from '/@/components/listing/desktop/list.vue'
  import Carrousel from './carrousel.vue'
  import Threads from './threads.vue'

  const { isZhLang, i18n: _i18n } = useEnhancer()
  const { appOptionsStore, threadsProfileStore, threadsLatestMediasStore, articleListStore } = useStores()

  const loadmoreArticles = async () => {
    const targetPage = articleListStore.pagination!.current_page + 1
    await articleListStore.fetch({ page: targetPage })
    if (targetPage > 1 && isClient) {
      scrollToNextScreen()
    }
  }

  usePageSeo(() => ({
    title: `${APP_PROFILE.title} - ${_i18n.t(LocalesKey.APP_SLOGAN)}`,
    description: isZhLang.value ? APP_PROFILE.description_zh : APP_PROFILE.description_en,
    keywords: appOptionsStore.data?.keywords.join(',')
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
    <article-list
      :mammon="false"
      :fetching="articleListStore.fetching"
      :articles="articleListStore.data"
      :pagination="articleListStore.pagination"
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
      margin-bottom: $gap-lg;
    }
  }
</style>
