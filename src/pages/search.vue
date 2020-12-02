<template>
  <div class="search-archive-page">
    <article-list-header
      :background-color="null"
      :background-image="null"
      icon="icon-search"
    >
      <i18n
        :zh="`和 “${keyword}” 有关的所有文章`"
        :en="`'${keyword}' related articles`"
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
  import { defineComponent, computed, watch, onBeforeMount } from 'vue'
  import { onPrefetch, onClient } from '/@/universal'
  import { useEnhancer } from '/@/enhancer'
  import { Modules, getNamespace } from '/@/store'
  import { ArticleModuleActions } from '/@/store/article'
  import { nextScreen, scrollToTop } from '/@/utils/effects'
  import { LANGUAGE_KEYS } from '/@/language/key'
  import ArticleListHeader from '/@/components/archive/header.vue'
  import ArticleList from '/@/components/archive/list.vue'

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
      const { i18n, helmet, store } = useEnhancer()
      if (!props.keyword) {
        return Promise.reject({
          code: 500,
          message: i18n.t(LANGUAGE_KEYS.QUERY_PARAMS_ERROR)
        })
      }

      helmet(() => ({
        title: `${props.keyword} | Search`
      }))

      const article = computed(() => store.state.article.list)

      const fetchArticles = (params: any) => {
        onClient(scrollToTop)
        return store.dispatch(
          getNamespace(Modules.Article, ArticleModuleActions.FetchList),
          params
        )
      }

      const loadmoreArticles = async () => {
        await fetchArticles({
          keyword: props.keyword,
          page: article.value.data.pagination.current_page + 1
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

      return onPrefetch(
        () => fetchArticles({ keyword: props.keyword }),
        {
          article,
          loadmoreArticles
        }
      )
    }
  })
</script>
