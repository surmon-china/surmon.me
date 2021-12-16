<template>
  <div class="search-flow-page">
    <article-list-header icon="icon-search">
      <i18n :zh="`和 “${keyword}” 有关的所有文章`" :en="`'${keyword}' related articles`" />
    </article-list-header>
    <article-list
      :fetching="article.list.fetching"
      :articles="article.list.data"
      :pagination="article.list.pagination"
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
  import ArticleListHeader from '/@/components/flow-desktop/header.vue'
  import ArticleList from '/@/components/flow-desktop/list.vue'

  export default defineComponent({
    name: 'SearchPage',
    components: {
      ArticleListHeader,
      ArticleList
    },
    props: {
      keyword: {
        type: String,
        required: true
      }
    },
    setup(props) {
      const { meta } = useEnhancer()
      const article = useArticleStore()

      meta(() => ({ pageTitle: `${props.keyword} | Search` }))

      const fetchArticles = (params: any) => {
        onClient(scrollToTop)
        return article.fetchList(params)
      }

      const loadmoreArticles = async () => {
        await fetchArticles({
          keyword: props.keyword,
          page: article.list.pagination.current_page + 1
        })
        onClient(nextScreen)
      }

      onBeforeMount(() => {
        watch(
          () => props.keyword,
          (keyword) => fetchArticles({ keyword }),
          { flush: 'post' }
        )
      })

      useUniversalFetch(() => fetchArticles({ keyword: props.keyword }))

      return {
        article,
        loadmoreArticles
      }
    }
  })
</script>
