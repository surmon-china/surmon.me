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
  import { prefetch, onClient } from '/@/universal'
  import { useArticleStore } from '/@/store/article'
  import { useCategoryStore } from '/@/store/category'
  import { getExtendsValue } from '/@/transforms/state'
  import { firstUpperCase } from '/@/transforms/text'
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
      const { i18n, meta, isZhLang } = useEnhancer()
      const article = useArticleStore()
      const catrgory = useCategoryStore()
      const currentCategory = computed(() => {
        return catrgory.categories.find((category) => category.slug === props.categorySlug)
      })

      meta(() => {
        const enTitle = firstUpperCase(props.categorySlug)
        const zhTitle = i18n.t(props.categorySlug)!
        const titles = isZhLang.value ? [zhTitle, enTitle] : [enTitle, 'Category']
        const description = currentCategory.value?.description || titles.join(',')
        return { pageTitle: titles.join(' | '), description }
      })

      const currentCategoryIcon = computed(
        () => getExtendsValue(currentCategory.value, 'icon') || 'icon-category'
      )
      const currentCategoryImage = computed(() =>
        getExtendsValue(currentCategory.value, 'background')
      )
      const currentCategoryColor = computed(() => getExtendsValue(currentCategory.value, 'bgcolor'))

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

      const resultData = {
        article,
        currentCategory,
        currentCategoryIcon,
        currentCategoryImage,
        currentCategoryColor,
        loadmoreArticles
      }

      return prefetch(() => fetchAllData(props.categorySlug), resultData)
    }
  })
</script>
