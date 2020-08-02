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
  import { defineComponent, computed } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import { useStore, Modules, getNamespace } from '/@/store'
  import { ArticleModuleActions } from '/@/store/article'
  import ArticleListHeader from '/@/components/archive/header.vue'
  import ArticleList from '/@/components/archive/list.vue'

  export default defineComponent({
    name: 'DatePage',
    components: {
      ArticleListHeader,
      ArticleList
    },
    async setup() {
      const store = useStore()
      const route = useRoute()
      const router = useRouter()

      const article = computed(() => store.state.article.list)
      const currentDate = computed(() => route.params.date)

      // TODO: 验证参数
      if (!currentDate.value) {
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
          ...route.params,
          date: route.params.date,
          page: article.value.data.pagination.current_page + 1
        })
      }

      await fetchArticles(route.params)

      return {
        article,
        currentDate,
        loadmoreArticles
      }
    }
  })
</script>
