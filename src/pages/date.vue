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
  import { useUniversalFetch } from '/@/universal'
  import { useEnhancer } from '/@/app/enhancer'
  import { useArticleListStore } from '/@/stores/article'
  import { scrollToNextScreen } from '/@/utils/scroller'
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
      meta(() => ({ pageTitle: `${props.date} | Date` }))

      const articleListStore = useArticleListStore()
      const loadmoreArticles = async () => {
        await articleListStore.fetchList({
          date: props.date,
          page: articleListStore.list.pagination!.current_page + 1
        })
        scrollToNextScreen()
      }

      onBeforeMount(() => {
        watch(
          () => props.date,
          (date) => articleListStore.fetchList({ date }),
          { flush: 'post' }
        )
      })

      useUniversalFetch(() => articleListStore.fetchList({ date: props.date }))

      return {
        articleListStore,
        loadmoreArticles
      }
    }
  })
</script>
