<template>
  <div class="date-archive-page">
    <article-list-header
      :background-color="null"
      :background-image="null"
      icon="icon-clock"
    >
      <i18n :zh="`发布于 ${date} 的所有文章`" :en="`${date} articles`" />
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
  import { prefetch, onClient } from '/@/universal'
  import { useEnhancer } from '../app/enhancer'
  import { Modules, getNamespace } from '/@/store'
  import { ArticleModuleActions } from '/@/store/article'
  import { nextScreen, scrollToTop } from '/@/utils/effects'
  import { LANGUAGE_KEYS } from '/@/language/key'
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
      const { store, helmet, isZhLang } = useEnhancer()
      const article = computed(() => store.state.article.list)
      const fetchArticles = (params: any) => {
        onClient(scrollToTop)
        return store.dispatch(
          getNamespace(Modules.Article, ArticleModuleActions.FetchList),
          params
        )
      }

      helmet(() => ({ title: `${props.date} | Date` }))

      const loadmoreArticles = () => {
        return fetchArticles({
          date: props.date,
          page: article.value.data.pagination.current_page + 1
        }).then(nextScreen)
      }

      onBeforeMount(() => {
        watch(
          () => props.date,
          (date) => fetchArticles({ date }),
          { flush: 'post' }
        )
      })

      return prefetch(() => fetchArticles({ date: props.date }), {
        article,
        loadmoreArticles
      })
    }
  })
</script>
