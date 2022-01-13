<template>
  <div class="search-flow-page">
    <article-list-header icon="icon-search">
      <i18n
        :zh="`和 “${keyword}” 有关的所有文章`"
        :en="`Keyword &quot;${keyword}&quot;\'s result`"
      />
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
  import { useArticleListStore } from '/@/store/article'
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
      const articleListStore = useArticleListStore()

      meta(() => ({ pageTitle: `${props.keyword} | Search` }))

      const fetchArticles = (params: any) => {
        onClient(scrollToTop)
        return articleListStore.fetchList(params)
      }

      const loadmoreArticles = async () => {
        await fetchArticles({
          keyword: props.keyword,
          page: articleListStore.list.pagination.current_page + 1
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
        articleListStore,
        loadmoreArticles
      }
    }
  })
</script>
