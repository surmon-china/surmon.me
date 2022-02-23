<template>
  <div class="date-flow-page">
    <article-list-header icon="icon-clock">
      <i18n :zh="`发布于 ${date} 的所有文章`" :en="`Articles published at ${date}`" />
    </article-list-header>
    <article-list
      :fetching="articleListStore.list.fetching"
      :articles="articleListStore.list.data"
      :pagination="articleListStore.list.pagination"
      @loadmore="loadmoreArticles"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent, watch, onBeforeMount } from 'vue'
  import { useUniversalFetch, onClient } from '/@/universal'
  import { useEnhancer } from '/@/app/enhancer'
  import { useArticleListStore } from '/@/stores/article'
  import { nextScreen, scrollToTop } from '/@/utils/effects'
  import ArticleListHeader from '/@/components/flow/desktop/header.vue'
  import ArticleList from '/@/components/flow/desktop/list.vue'

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
      const articleListStore = useArticleListStore()

      meta(() => ({ pageTitle: `${props.date} | Date` }))

      const fetchArticles = (params: any) => {
        onClient(scrollToTop)
        return articleListStore.fetchList(params)
      }

      const loadmoreArticles = () => {
        return fetchArticles({
          date: props.date,
          page: articleListStore.list.pagination.current_page + 1
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
        articleListStore,
        loadmoreArticles
      }
    }
  })
</script>
