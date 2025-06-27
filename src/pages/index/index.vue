<script lang="ts" setup>
  import { useStores } from '/@/stores'
  import { useEnhancer } from '/@/app/enhancer'
  import { usePageSeo } from '/@/composables/head'
  import { useUniversalFetch, onClient } from '/@/universal'
  import { scrollToNextScreen } from '/@/utils/scroller'
  import { LanguageKey } from '/@/language'
  import { META } from '/@/config/app.config'
  import ArticleList from '/@/components/flow/desktop/list.vue'
  import Carrousel from './carrousel.vue'
  import Threads from './threads.vue'

  const { i18n: _i18n, isZhLang } = useEnhancer()
  const { appOption, threadsProfile, threadsLatestMedias, articleList: articleListStore } = useStores()

  const loadmoreArticles = async () => {
    const targetPage = articleListStore.pagination!.current_page + 1
    await articleListStore.fetch({ page: targetPage })
    if (targetPage > 1) {
      onClient(scrollToNextScreen)
    }
  }

  usePageSeo(() => ({
    title: `${META.title} - ${_i18n.t(LanguageKey.APP_SLOGAN)}`,
    description: isZhLang.value ? META.zh_description : META.en_description,
    keywords: appOption.data?.keywords.join(',')
  }))

  useUniversalFetch(() => {
    return Promise.all([
      articleListStore.fetch(),
      threadsProfile.fetch().catch(() => {}),
      threadsLatestMedias.fetch().catch(() => {})
    ])
  })
</script>

<template>
  <div class="index-page">
    <carrousel class="carrousel" :articles="articleListStore.data" :fetching="articleListStore.fetching" />
    <Threads
      class="threads"
      :profile="threadsProfile.data"
      :medias="threadsLatestMedias.data?.data ?? []"
      :fetching="threadsLatestMedias.fetching || threadsProfile.fetching || articleListStore.fetching"
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
