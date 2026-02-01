<script lang="ts" setup>
  import { watch, onBeforeMount, computed } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { useUniversalFetch } from '/@/app/universal'
  import { usePageSeo } from '/@/composables/head'
  import { useArticleListStore } from '/@/stores/article-list'
  import { scrollToNextScreen } from '/@/utils/scroller'
  import ArticleListHeader from '/@/components/desktop/listing/header.vue'
  import ArticleListMain from '/@/components/desktop/listing/index.vue'

  const props = defineProps<{
    date: string
  }>()

  const { isZhLang } = useEnhancer()
  const articleListStore = useArticleListStore()

  const loadmoreArticles = async () => {
    await articleListStore.fetchNextPage({ date: props.date })
    scrollToNextScreen()
  }

  const pageDescription = computed(() => {
    return isZhLang.value ? `发布于 ${props.date} 的文章` : `Articles from ${props.date}`
  })

  usePageSeo(() => ({
    pageTitles: [props.date, isZhLang.value ? '日期' : 'Date'],
    description: pageDescription.value,
    ogType: 'website'
  }))

  onBeforeMount(() => {
    watch(
      () => props.date,
      (date) => articleListStore.fetch({ date }),
      { flush: 'post' }
    )
  })

  useUniversalFetch(() => {
    return articleListStore.fetch({ date: props.date })
  })
</script>

<template>
  <div class="date-flow-page">
    <article-list-header class="page-header" icon-name="icon-clock">
      {{ pageDescription }}
    </article-list-header>
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

  .date-flow-page {
    .page-header {
      margin-bottom: $gap;
    }
  }
</style>
