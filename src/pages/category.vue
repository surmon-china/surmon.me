<template>
  <div class="category-archive-page">
    <article-list-header
      :background-color="currentCategoryColor"
      :background-image="currentCategoryImage"
      :icon="currentCategoryIcon"
    >
      <span>{{ currentCategory?.description || '...' }}</span>
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
  import { CategoryModuleActions } from '/@/store/category'
  import { getExtendsValue } from '/@/transforms/state'
  import ArticleListHeader from '/@/components/archive/header.vue'
  import ArticleList from '/@/components/archive/list.vue'

  export default defineComponent({
    name: 'CategoryPage',
    components: {
      ArticleListHeader,
      ArticleList
    },
    // head() {
    //   const slug = this.defaultParams.category_slug || ''
    //   const title = slug.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase())
    //   const isEnLang = this.$store.getters['global/isEnLang']
    //   const zhTitle = isEnLang ? '' : `${this.$i18n.nav[slug]} | `
    //   return { 
    //     title: `${zhTitle}${title} | Category` 
    //   }
    // },
    async setup() {
      const store = useStore()
      const route = useRoute()
      const router = useRouter()

      const fetchCategories = () => store.dispatch(
        getNamespace(Modules.Category, CategoryModuleActions.FetchList)
      )

      const fetchArticles = (params: any) => store.dispatch(
        getNamespace(Modules.Article, ArticleModuleActions.FetchList),
        params
      )

      const loadmoreArticles = () => fetchArticles({
        ...route.params,
        category_slug: route.params.category_slug,
        page: article.value.data.pagination.current_page + 1
      })

      await Promise.all([
        fetchCategories(),
        fetchArticles(route.params)
      ])

      const article = computed(() => store.state.article.list)
      const currentCategory = computed(() => {
        return store.state.category.data.find(category => {
          return category.slug === route.params.category_slug
        })
      })

      if (!currentCategory.value) {
        router.back()
        // throw error?
        return
      }

      const currentCategoryIcon = computed(() => {
        return getExtendsValue(currentCategory.value, 'icon') || 'icon-category'
      })
      const currentCategoryImage = computed(() => {
        return getExtendsValue(currentCategory.value, 'background')
      })
      const currentCategoryColor = computed(() => {
        return getExtendsValue(currentCategory.value, 'bgcolor')
      })

      return {
        article,
        currentCategory,
        currentCategoryIcon,
        currentCategoryImage,
        currentCategoryColor,
        loadmoreArticles
      }
    }
  })
</script>
