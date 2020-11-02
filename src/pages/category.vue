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
      :fetching="articleData.fetching"
      :articles="articleData.data.data"
      :pagination="articleData.data.pagination"
      @loadmore="loadmoreArticles"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed, watch, onMounted } from 'vue'
  import { LANGUAGE_KEYS } from '/@/language/key'
  import { isClient, isServer } from '/@/enverionment'
  import { useEnhancer, onPreFetch } from '/@/enhancer'
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
    props: {
      categorySlug: {
        type: String,
        required: true
      }
    },
    setup(props) {
      const { store, i18n, helmet, isZhLang } = useEnhancer()
      // slug 是否为空
      if (!props.categorySlug) {
        return Promise.reject({
          code: 500,
          message: i18n.t(LANGUAGE_KEYS.QUERY_PARAMS_ERROR)
        })
      }

      // category 是否存在
      const currentCategory = computed(() => {
        return store.state.category.data.find(category => {
          return category.slug === props.categorySlug
        })
      })
      if (!currentCategory.value) {
        return Promise.reject({ code: 404 })
      }

      // helmet
      helmet.title(() => {
        const slug = currentCategory.value.slug
        const slugTitle = slug
          .toLowerCase()
          .replace(/( |^)[a-z]/g, (L) => L.toUpperCase())
        const enTitle = `${slugTitle} | Category`
        const zhTitle = i18n.t(slug)
        return isZhLang && zhTitle
          ? `${zhTitle} | ${enTitle}`
          : enTitle
      }, isServer)

      const articleData = computed(() => store.state.article.list)
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


      const fetchCategories = () => store.dispatch(
        getNamespace(Modules.Category, CategoryModuleActions.FetchAll)
      )

      const fetchArticles = (params: any) => store.dispatch(
        getNamespace(Modules.Article, ArticleModuleActions.FetchList),
        params
      )

      const loadmoreArticles = () => {
        fetchArticles({
          category_slug: props.categorySlug,
          page: articleData.value.data.pagination.current_page + 1
        }).then(() => {
          if (isClient) {
            nextScreen()
          }
        })
      }

      const fetchAllData = (category_slug: string) => {
        if (isClient) {
          scrollToTop()
        }
        return Promise.all([
          fetchCategories(),
          fetchArticles({ category_slug })
        ])
      }

      onMounted(() => {
        watch(
          () => props.categorySlug,
          categorySlug => fetchAllData(categorySlug),
          { flush: 'post' }
        )
      })

      const resultData = {
        articleData,
        currentCategory,
        currentCategoryIcon,
        currentCategoryImage,
        currentCategoryColor,
        loadmoreArticles
      }

      return onPreFetch(() => fetchAllData(props.categorySlug), resultData)
    }
  })
</script>
