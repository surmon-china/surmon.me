<script lang="ts" setup>
  import { useStores } from '/@/stores'
  import { useEnhancer } from '/@/app/enhancer'
  import { usePageSeo } from '/@/composables/head'
  import { useUniversalFetch } from '/@/app/universal'
  import { scrollToNextScreen } from '/@/utils/scroller'
  import { LanguageKey } from '/@/language'
  import { APP_META } from '/@/configs/app.config'
  import { isClient } from '/@/configs/app.env'
  import ArticleList from '/@/components/listing/desktop/list.vue'
  import Carrousel from './carrousel.vue'
  import Threads from './threads.vue'

  const { i18n: _i18n, isZhLang } = useEnhancer()
  const { appOption, threadsProfile, threadsLatestMedias, articleList: articleListStore } = useStores()

  const loadmoreArticles = async () => {
    const targetPage = articleListStore.pagination!.current_page + 1
    await articleListStore.fetch({ page: targetPage })
    if (targetPage > 1 && isClient) {
      scrollToNextScreen()
    }
  }

  usePageSeo(() => ({
    title: `${APP_META.title} - ${_i18n.t(LanguageKey.APP_SLOGAN)}`,
    description: isZhLang.value ? APP_META.zh_description : APP_META.en_description,
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
