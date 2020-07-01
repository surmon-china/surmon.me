<template>
  <div class="category-archive-page">
    <article-list-header
      :background-color="currentCategoryColor"
      :background-image="currentCategoryImage"
      :icon="currentCategoryIcon"
    >
      <span>{{ currentCategory.description || '...' }}</span>
    </article-list-header>
    <article-list
      :article="articleData"
      @loadmore="loadmoreArticles"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import { useStore, Modules, getNamespace } from '/@/store'
  import { ArticleModuleActions } from '/@/store/article'
  import { getExtendsValue } from '/@/transforms/state'
  import ArticleListHeader from '/@/components/archive/header.vue'
  import ArticleList from '/@/components/archive/list.vue'

  export default defineComponent({
    name: 'CategoryPage',
    components: {
      ArticleListHeader,
      ArticleList
    },
    // validate({ params, store }) {
    //   return params.category_slug && store.state.category.data.some(
    //     category => category.slug === params.category_slug
    //   )
    // },
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

      const articleData = computed(() => store.state.article.list)
      const currentCategory = computed(() => {
        return store.state.category.data.find(category => {
          return category.slug === route.params.category_slug
        })
      })

      // TODO: 验证参数
      if (!currentCategory.value) {
        router.back()
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

      const fetchArticles = (params: any) => {
        return store.dispatch(
          getNamespace(Modules.Article, ArticleModuleActions.FetchList),
          params
        )
      }

      const loadmoreArticles = () => {
        return fetchArticles({
          ...route.params,
          category_slug: route.params.category_slug,
          page: articleData.value.data.pagination.current_page + 1
        })
      }

      await fetchArticles(route.params)

      return {
        articleData,
        currentCategory,
        currentCategoryIcon,
        currentCategoryImage,
        currentCategoryColor,
        loadmoreArticles,
      }
    }
  })
</script>
