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
  import { defineComponent, computed, watch } from 'vue'
  import { useEnhancer } from '/@/enhancer'
  import { Modules, getNamespace } from '/@/store'
  import { ArticleModuleActions } from '/@/store/article'
  import { CategoryModuleActions } from '/@/store/category'
  import { getExtendsValue } from '/@/transforms/state'
  import { nextScreen, scrollToTop } from '/@/utils/effects'
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
    setup() {
      const { store, route, router } = useEnhancer()
      const categorySlug = computed(() => route.params.category_slug as string)

      const fetchCategories = () => store.dispatch(
        getNamespace(Modules.Category, CategoryModuleActions.FetchAll)
      )

      const fetchArticles = (params: any) => store.dispatch(
        getNamespace(Modules.Article, ArticleModuleActions.FetchList),
        params
      )

      const loadmoreArticles = () => {
        fetchArticles({
          category_slug: categorySlug.value,
          page: article.value.data.pagination.current_page + 1
        }).then(nextScreen)
      }

      const fetchAllData = (category_slug: string) => {
        scrollToTop()
        return Promise.all([
          fetchCategories(),
          fetchArticles({ category_slug })
        ])
      }

      watch(
        () => route.params,
        params => fetchAllData(params.category_slug as string),
        { flush: 'post' }
      )

      // TODO: SSR
      fetchAllData(categorySlug.value)

      const article = computed(() => store.state.article.list)
      const currentCategory = computed(() => {
        return store.state.category.data.find(category => {
          return category.slug === categorySlug.value
        })
      })

      if (!currentCategory.value) {
        router.back()
        // throw error?
        return
      }

      const currentCategoryIcon = computed(() => (
        getExtendsValue(currentCategory.value, 'icon') ||
        'icon-category'
      ))
      const currentCategoryImage = computed(() => getExtendsValue(
        currentCategory.value,
        'background'
      ))
      const currentCategoryColor = computed(() => getExtendsValue(
        currentCategory.value,
        'bgcolor'
      ))

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
