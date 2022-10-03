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
  import { useUniversalFetch } from '/@/universal'
  import { useEnhancer } from '/@/app/enhancer'
  import { useArticleListStore } from '/@/stores/article'
  import { scrollToNextScreen } from '/@/utils/scroller'
  import ArticleListHeader from '/@/components/flow/desktop/header.vue'
  import ArticleList from '/@/components/flow/desktop/list.vue'

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
      meta(() => ({ pageTitle: `${props.keyword} | Search` }))

      const articleListStore = useArticleListStore()
      const loadmoreArticles = async () => {
        await articleListStore.fetchList({
          keyword: props.keyword,
          page: articleListStore.list.pagination!.current_page + 1
        })
        scrollToNextScreen()
      }

      onBeforeMount(() => {
        watch(
          () => props.keyword,
          (keyword) => articleListStore.fetchList({ keyword }),
          { flush: 'post' }
        )
      })

      useUniversalFetch(() => articleListStore.fetchList({ keyword: props.keyword }))

      return {
        articleListStore,
        loadmoreArticles
      }
    }
  })
</script>
