<script lang="ts" setup>
  import { watch, onBeforeMount, computed } from 'vue'
  import { useUniversalFetch } from '/@/app/universal'
  import { useEnhancer } from '/@/app/enhancer'
  import { usePageSeo } from '/@/composables/head'
  import { useArticleListStore } from '/@/stores/article'
  import { scrollToNextScreen } from '/@/utils/scroller'
  import ArticleListHeader from '/@/components/listing/desktop/header.vue'
  import ArticleList from '/@/components/listing/desktop/list.vue'

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
    <article-list-header icon-name="icon-search">
      {{ pageDescription }}
    </article-list-header>
    <article-list
      :fetching="articleListStore.fetching"
      :articles="articleListStore.data"
      :pagination="articleListStore.pagination"
      @loadmore="loadmoreArticles"
    />
  </div>
</template>
