<script lang="ts" setup>
  import { watch, onBeforeMount } from 'vue'
  import { useUniversalFetch } from '/@/app/universal'
  import { usePageSeo } from '/@/composables/head'
  import { useStores } from '/@/stores'
  import { scrollToNextScreen } from '/@/utils/scroller'
  import ArticleListHeader from '/@/components/listing/desktop/header.vue'
  import ArticleList from '/@/components/listing/desktop/list.vue'

  const props = defineProps<{
    date: string
  }>()

  const { articleList: articleListStore } = useStores()

  const loadmoreArticles = async () => {
    await articleListStore.fetch({
      date: props.date,
      page: articleListStore.pagination!.current_page + 1
    })
    scrollToNextScreen()
  }

  usePageSeo(() => ({
    pageTitles: [props.date, 'Date'],
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
    <article-list-header icon="icon-clock">
      <i18n :zh="`发布于 ${date} 的所有文章`" :en="`Articles published at ${date}`" />
    </article-list-header>
    <article-list
      :fetching="articleListStore.fetching"
      :articles="articleListStore.data"
      :pagination="articleListStore.pagination"
      @loadmore="loadmoreArticles"
    />
  </div>
</template>
