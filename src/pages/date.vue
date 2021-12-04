<template>
  <div class="date-archive-page">
    <article-list-header icon="icon-clock">
      <i18n :zh="`发布于 ${date} 的所有文章`" :en="`${date} articles`" />
    </article-list-header>
    <article-list
      :fetching="articleStore.list.fetching"
      :articles="articleStore.list.data"
      :pagination="articleStore.list.pagination"
      @loadmore="loadmoreArticles"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent, watch, onBeforeMount } from 'vue'
  import { useUniversalFetch, onClient } from '/@/universal'
  import { useEnhancer } from '/@/app/enhancer'
  import { useArticleStore } from '/@/store/article'
  import { nextScreen, scrollToTop } from '/@/utils/effects'
  import ArticleListHeader from '/@/components/archive/header.vue'
  import ArticleList from '/@/components/archive/list.vue'

  export default defineComponent({
    name: 'DatePage',
    components: {
      ArticleListHeader,
      ArticleList
    },
    props: {
      date: {
        type: String,
        required: true
      }
    },
    setup(props) {
      const { meta } = useEnhancer()
      const articleStore = useArticleStore()

      meta(() => ({ pageTitle: `${props.date} | Date` }))

      const fetchArticles = (params: any) => {
        onClient(scrollToTop)
        return articleStore.fetchList(params)
      }

      const loadmoreArticles = () => {
        return fetchArticles({
          date: props.date,
          page: articleStore.list.pagination.current_page + 1
        }).then(nextScreen)
      }

      onBeforeMount(() => {
        watch(
          () => props.date,
          (date) => fetchArticles({ date }),
          { flush: 'post' }
        )
      })

      useUniversalFetch(() => fetchArticles({ date: props.date }))

      return {
        articleStore,
        loadmoreArticles
      }
    }
  })
</script>
