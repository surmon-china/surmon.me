<template>
  <div class="search-archive-page">
    <article-list-header
      :background-color="null"
      :background-image="null"
      icon="icon-search"
    >
      <i18n
        :zh="`和 “${currentKeyword}” 有关的所有文章`"
        :en="`'${currentKeyword}' related articles`"
      />
    </article-list-header>
    <article-list
      :fetching="article.fetching"
      :articles="article.data.data"
      :pagination="article.data.pagination"
      @loadmore="loadmoreArticles"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed, watch } from 'vue'
  import { useEnhancer } from '/@/enhancer'
  import { Modules, getNamespace } from '/@/store'
  import { ArticleModuleActions } from '/@/store/article'
  import ArticleListHeader from '/@/components/archive/header.vue'
  import ArticleList from '/@/components/archive/list.vue'
  import { nextScreen, scrollToTop } from '/@/utils/effects'

  export default defineComponent({
    name: 'SearchPage',
    components: {
      ArticleListHeader,
      ArticleList
    },
    // head() {
    //   return {
    //     title: `${this.defaultParams.keyword} | Search`
    //   }
    // },
    setup() {
      const { store, route, router } = useEnhancer()
      const article = computed(() => store.state.article.list)
      const currentKeyword = computed(() => route.params.keyword)

      if (!currentKeyword.value) {
        router.back()
      }

      const fetchArticles = (params: any) => {
        return store.dispatch(
          getNamespace(Modules.Article, ArticleModuleActions.FetchList),
          params
        )
      }

      const loadmoreArticles = () => {
        return fetchArticles({
          keyword: currentKeyword.value,
          page: article.value.data.pagination.current_page + 1
        })
      }

      watch(
        () => route.params,
        ({ keyword }) => fetchArticles({ keyword }),
        { flush: 'post' }
      )

      // TODO: SSR
      fetchArticles({ keyword: currentKeyword.value })

      return {
        article,
        currentKeyword,
        loadmoreArticles
      }
    }
  })
</script>
