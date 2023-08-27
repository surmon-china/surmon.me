<script lang="ts" setup>
  import { computed, watch, onBeforeMount } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { useUniversalFetch } from '/@/universal'
  import { useStores } from '/@/stores'
  import { getExtendValue } from '/@/transforms/state'
  import { firstUpperCase } from '/@/transforms/text'
  import { getStaticURL, getStaticPath, isOriginalStaticURL } from '/@/transforms/url'
  import { scrollToNextScreen } from '/@/utils/scroller'
  import ArticleListHeader from '/@/components/flow/desktop/header.vue'
  import ArticleList from '/@/components/flow/desktop/list.vue'

  const props = defineProps<{
    categorySlug: string
  }>()

  const { i18n: _i18n, seoMeta, cdnDomain, isZhLang } = useEnhancer()
  const { articleList: articleListStore, category: categoryStore } = useStores()
  const currentCategory = computed(() => {
    return categoryStore.data.find((category) => category.slug === props.categorySlug)
  })
  const currentCategoryIcon = computed(() => {
    return getExtendValue(currentCategory.value?.extends || [], 'icon') || 'icon-category'
  })
  const currentCategoryColor = computed(() => {
    return getExtendValue(currentCategory.value?.extends || [], 'bgcolor')
  })
  const currentCategoryImage = computed(() => {
    const value = getExtendValue(currentCategory.value?.extends || [], 'background')
    if (isOriginalStaticURL(value)) {
      return getStaticURL(cdnDomain, getStaticPath(value!))
    } else {
      return value
    }
  })

  const loadmoreArticles = async () => {
    await articleListStore.fetch({
      category_slug: props.categorySlug,
      page: articleListStore.pagination!.current_page + 1
    })
    scrollToNextScreen()
  }

  seoMeta(() => {
    const enTitle = firstUpperCase(props.categorySlug)
    const zhTitle = _i18n.t(props.categorySlug)!
    const titles = isZhLang.value ? [zhTitle, enTitle] : [enTitle]
    const description = currentCategory.value?.description || titles.join(',')
    return {
      pageTitle: titles.join(' | '),
      description,
      ogType: 'website'
    }
  })

  onBeforeMount(() => {
    watch(
      () => props.categorySlug,
      (category_slug) => articleListStore.fetch({ category_slug }),
      { flush: 'post' }
    )
  })

  useUniversalFetch(() => {
    return articleListStore.fetch({ category_slug: props.categorySlug })
  })
</script>

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
      :fetching="articleListStore.fetching"
      :articles="articleListStore.data"
      :pagination="articleListStore.pagination"
      @loadmore="loadmoreArticles"
    />
  </div>
</template>

<style lang="scss" scoped>
  @import 'src/styles/variables.scss';
  @import 'src/styles/mixins.scss';

  .category-flow-page {
    .divider {
      border-color: $white !important;
    }
  }
</style>
