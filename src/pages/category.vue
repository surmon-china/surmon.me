<template>
  <div class="category-flow-page">
    <article-list-header
      :background-color="currentCategoryColor"
      :background-image="currentCategoryImage"
      :icon="currentCategoryIcon"
    >
      <span>{{ currentCategory?.description || '...' }}</span>
    </article-list-header>
    <article-list
      :fetching="article.list.fetching"
      :articles="article.list.data"
      :pagination="article.list.pagination"
      @loadmore="loadmoreArticles"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed, watch, onBeforeMount } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { useUniversalFetch, onClient } from '/@/universal'
  import { useArticleStore } from '/@/store/article'
  import { useCategoryStore } from '/@/store/category'
  import { getExtendValue } from '/@/transforms/state'
  import { firstUpperCase } from '/@/transforms/text'
  import { nextScreen, scrollToTop } from '/@/utils/effects'
  import ArticleListHeader from '/@/components/flow-desktop/header.vue'
  import ArticleList from '/@/components/flow-desktop/list.vue'

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
      const { i18n, meta, isZhLang } = useEnhancer()
      const article = useArticleStore()
      const catrgory = useCategoryStore()
      const currentCategory = computed(() => {
        return catrgory.categories.find((category) => category.slug === props.categorySlug)
      })
      const currentCategoryIcon = computed(() => {
        return getExtendValue(currentCategory.value?.extends || [], 'icon') || 'icon-category'
      })
      const currentCategoryImage = computed(() => {
        return getExtendValue(currentCategory.value?.extends || [], 'background')
      })
      const currentCategoryColor = computed(() => {
        return getExtendValue(currentCategory.value?.extends || [], 'bgcolor')
      })

      meta(() => {
        const enTitle = firstUpperCase(props.categorySlug)
        const zhTitle = i18n.t(props.categorySlug)!
        const titles = isZhLang.value ? [zhTitle, enTitle] : [enTitle, 'Category']
        const description = currentCategory.value?.description || titles.join(',')
        return { pageTitle: titles.join(' | '), description }
      })

      const loadmoreArticles = async () => {
        await article.fetchList({
          category_slug: props.categorySlug,
          page: article.list.pagination.current_page + 1
        })
        onClient(nextScreen)
      }

      const fetchAllData = (category_slug: string) => {
        onClient(scrollToTop)
        return Promise.all([catrgory.fetchAll(), article.fetchList({ category_slug })])
      }

      onBeforeMount(() => {
        watch(
          () => props.categorySlug,
          (categorySlug) => fetchAllData(categorySlug),
          { flush: 'post' }
        )
      })

      useUniversalFetch(() => fetchAllData(props.categorySlug))

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
