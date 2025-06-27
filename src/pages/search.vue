<script lang="ts" setup>
  import { watch, onBeforeMount } from 'vue'
  import { useUniversalFetch } from '/@/universal'
  import { useEnhancer } from '/@/app/enhancer'
  import { usePageSeo } from '/@/composables/head'
  import { useArticleListStore } from '/@/stores/article'
  import { scrollToNextScreen } from '/@/utils/scroller'
  import ArticleListHeader from '/@/components/flow/desktop/header.vue'
  import ArticleList from '/@/components/flow/desktop/list.vue'

  const props = defineProps<{ keyword: string }>()

  const { isZhLang } = useEnhancer()
  const articleListStore = useArticleListStore()
  const loadmoreArticles = async () => {
    await articleListStore.fetch({
      keyword: props.keyword,
      page: articleListStore.pagination!.current_page + 1
    })
    scrollToNextScreen()
  }

  usePageSeo(() => ({
    pageTitles: [`"${props.keyword}"`, isZhLang.value ? '搜索' : 'Search'],
    ogType: 'website'
  }))

  onBeforeMount(() => {
    watch(
      () => props.keyword,
      (keyword) => articleListStore.fetch({ keyword }),
      { flush: 'post' }
    )
  })

  useUniversalFetch(() => {
    return articleListStore.fetch({ keyword: props.keyword })
  })
</script>

<template>
  <div class="search-flow-page">
    <article-list-header icon="icon-search">
      <i18n :zh="`和 “${keyword}” 有关的所有文章`" :en="`Keyword &quot;${keyword}&quot;\'s result`" />
    </article-list-header>
    <article-list
      :fetching="articleListStore.fetching"
      :articles="articleListStore.data"
      :pagination="articleListStore.pagination"
      @loadmore="loadmoreArticles"
    />
  </div>
</template>
