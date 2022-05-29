<template>
  <div class="category-flow-page">
    <article-list-header
      :background-color="currentCategoryColor"
      :background-image="currentCategoryImage"
      :icon="currentCategoryIcon"
    >
      <i18n v-if="currentCategory">
        <template #zh>
          <span>{{ currentCategory.name }}</span>
          <divider class="divider" type="vertical" />
          <span>{{ currentCategory.description || '...' }}</span>
        </template>
        <template #en>
          <span>Category</span>
          <divider class="divider" type="vertical" />
          <span>{{ firstUpperCase(currentCategory.slug) }}</span>
        </template>
      </i18n>
    </article-list-header>
    <article-list
      :fetching="articleListStore.list.fetching"
      :articles="articleListStore.list.data"
      :pagination="articleListStore.list.pagination"
      @loadmore="loadmoreArticles"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed, watch, onBeforeMount } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { useUniversalFetch } from '/@/universal'
  import { useArticleListStore } from '/@/stores/article'
  import { useCategoryStore } from '/@/stores/category'
  import { getExtendValue } from '/@/transforms/state'
  import { firstUpperCase } from '/@/transforms/text'
  import { scrollToNextScreen } from '/@/utils/scroller'
  import ArticleListHeader from '/@/components/flow/desktop/header.vue'
  import ArticleList from '/@/components/flow/desktop/list.vue'

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
      const articleListStore = useArticleListStore()
      const categoryStore = useCategoryStore()
      const currentCategory = computed(() => {
        return categoryStore.data.find((category) => category.slug === props.categorySlug)
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

      const loadmoreArticles = async () => {
        await articleListStore.fetchList({
          category_slug: props.categorySlug,
          page: articleListStore.list.pagination.current_page + 1
        })
        scrollToNextScreen()
      }

      meta(() => {
        const enTitle = firstUpperCase(props.categorySlug)
        const zhTitle = i18n.t(props.categorySlug)!
        const titles = isZhLang.value ? [zhTitle, enTitle] : [enTitle, 'Category']
        const description = currentCategory.value?.description || titles.join(',')
        return { pageTitle: titles.join(' | '), description }
      })

      onBeforeMount(() => {
        watch(
          () => props.categorySlug,
          (category_slug) => articleListStore.fetchList({ category_slug }),
          { flush: 'post' }
        )
      })

      useUniversalFetch(() => articleListStore.fetchList({ category_slug: props.categorySlug }))

      return {
        articleListStore,
        currentCategory,
        currentCategoryIcon,
        currentCategoryImage,
        currentCategoryColor,
        loadmoreArticles,
        firstUpperCase
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/variables.scss';
  @import 'src/styles/mixins.scss';

  .category-flow-page {
    .divider {
      border-color: $white !important;
    }
  }
</style>
