<script lang="ts" setup>
  import { watch, onBeforeMount, computed } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { useUniversalFetch } from '/@/app/universal'
  import { usePageSeo } from '/@/composables/head'
  import { useArticleListStore } from '/@/stores/article-list'
  import { scrollToNextScreen } from '/@/utils/scroller'
  import ArticleListHeader from '/@/components/desktop/listing/header.vue'
  import ArticleListMain from '/@/components/desktop/listing/index.vue'

  const props = defineProps<{ keyword: string }>()

  const { isZhLang } = useEnhancer()
  const articleListStore = useArticleListStore()

  const loadmoreArticles = async () => {
    await articleListStore.fetchNextPage({ keyword: props.keyword })
    scrollToNextScreen()
  }

  const pageDescription = computed(() => {
    return isZhLang.value ? `关键词 “${props.keyword}” 的搜索结果` : `Search results for "${props.keyword}"`
  })

  usePageSeo(() => ({
    pageTitles: isZhLang.value ? [`“${props.keyword}”`, '搜索'] : [`"${props.keyword}"`, 'Search'],
    description: pageDescription.value,
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
    <article-list-header class="page-header" icon-name="icon-search">
      {{ pageDescription }}
    </article-list-header>
    <article-list-main
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

  .search-flow-page {
    .page-header {
      margin-bottom: $gap;
    }
  }
</style>
