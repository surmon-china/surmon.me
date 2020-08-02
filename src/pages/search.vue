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
  import { defineComponent, computed } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import { useStore, Modules, getNamespace } from '/@/store'
  import { ArticleModuleActions } from '/@/store/article'
  import ArticleListHeader from '/@/components/archive/header.vue'
  import ArticleList from '/@/components/archive/list.vue'

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
    async setup() {
      const store = useStore()
      const route = useRoute()
      const router = useRouter()

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

      await fetchArticles(route.params)

      return {
        article,
        currentKeyword,
        loadmoreArticles
      }
    }
  })
</script>
