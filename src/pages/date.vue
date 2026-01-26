<script lang="ts" setup>
  import { watch, onBeforeMount, computed } from 'vue'
  import { useUniversalFetch } from '/@/app/universal'
  import { useEnhancer } from '/@/app/enhancer'
  import { usePageSeo } from '/@/composables/head'
  import { useStores } from '/@/stores'
  import { scrollToNextScreen } from '/@/utils/scroller'
  import ArticleListHeader from '/@/components/listing/desktop/header.vue'
  import ArticleList from '/@/components/listing/desktop/list.vue'

  const props = defineProps<{
    date: string
  }>()

  const { isZhLang } = useEnhancer()
  const { articleListStore } = useStores()

  const loadmoreArticles = async () => {
    await articleListStore.fetch({
      date: props.date,
      page: articleListStore.pagination!.current_page + 1
    })
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
    <article-list-header icon-name="icon-clock">
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
