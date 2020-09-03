<template>
  <div class="date-archive-page">
    <article-list-header
      :background-color="null"
      :background-image="null"
      icon="icon-clock"
    >
      <i18n
        :zh="`发布于 ${currentDate} 的所有文章`"
        :en="`${currentDate} articles`"
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
  import { nextScreen, scrollToTop } from '/@/utils/effects'
  import ArticleListHeader from '/@/components/archive/header.vue'
  import ArticleList from '/@/components/archive/list.vue'

  export default defineComponent({
    name: 'DatePage',
    components: {
      ArticleListHeader,
      ArticleList
    },
    async setup() {
      const { store, route, router } = useEnhancer()
      const article = computed(() => store.state.article.list)
      const currentDate = computed(() => route.params.date)

      // TODO: 验证参数
      // if (!currentDate.value || currentDate.value) {
        // throw Error('你很有问题!')
        // router.back()
      // }

      const fetchArticles = (params: any) => {
        scrollToTop()
        return store.dispatch(
          getNamespace(Modules.Article, ArticleModuleActions.FetchList),
          params
        )
      }

      const loadmoreArticles = () => {
        return fetchArticles({
          date: currentDate.value,
          page: article.value.data.pagination.current_page + 1
        }).then(nextScreen)
      }

      watch(
        () => route.params,
        ({ date }) => fetchArticles({ date })
      )

      await fetchArticles({ date: currentDate.value })

      return {
        article,
        currentDate,
        loadmoreArticles
      }
    }
  })
</script>
