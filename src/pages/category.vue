<script lang="ts" setup>
  import { computed, watch, onBeforeMount } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { usePageSeo } from '/@/composables/head'
  import { useUniversalFetch } from '/@/app/universal'
  import { useArticleListStore } from '/@/stores/article-list'
  import { useCategoryStore } from '/@/stores/category'
  import { getExtrasMap } from '/@/transforms/extra'
  import { firstUpperCase } from '/@/transforms/text'
  import { getStaticURL, getStaticPath, isOriginalStaticURL } from '/@/transforms/url'
  import { scrollToNextScreen } from '/@/utils/scroller'
  import ArticleListHeader from '/@/components/desktop/listing/header.vue'
  import ArticleListMain from '/@/components/desktop/listing/index.vue'

  const props = defineProps<{
    categorySlug: string
  }>()

  const { cdnDomain, isZhLang, i18n: _i18n } = useEnhancer()
  const articleListStore = useArticleListStore()
  const categoryStore = useCategoryStore()

  const category = computed(() => categoryStore.data.find(({ slug }) => slug === props.categorySlug))
  const categoryExtrasMap = computed(() => getExtrasMap(category.value?.extras))
  const categoryIconName = computed(() => categoryExtrasMap.value.get('icon-name') ?? 'icon-category')
  const categoryBackgroundColor = computed(() => categoryExtrasMap.value.get('background-color'))
  const categoryBackgroundImage = computed(() => {
    const imageUrl = categoryExtrasMap.value.get('background-image')
    return imageUrl && isOriginalStaticURL(imageUrl) ? getStaticURL(cdnDomain, getStaticPath(imageUrl)) : imageUrl
  })

  const loadmoreArticles = async () => {
    await articleListStore.fetchNextPage({ category_slug: props.categorySlug })
    scrollToNextScreen()
  }

  usePageSeo(() => {
    const enTitle = firstUpperCase(props.categorySlug)
    const zhTitle = _i18n.t(props.categorySlug)!
    const titles = isZhLang.value ? [zhTitle, enTitle] : [enTitle]
    const description = category.value?.description || titles.join(',')
    return {
      pageTitles: titles,
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
      class="page-header"
      :icon-name="categoryIconName"
      :background-color="categoryBackgroundColor"
      :background-image="categoryBackgroundImage"
    >
      <i18n v-if="category">
        <template #zh>
          <span>{{ category.name }}</span>
          <divider class="divider" type="vertical" />
          <span>{{ category.description || '...' }}</span>
        </template>
        <template #en>
          <span>Category</span>
          <divider class="divider" type="vertical" />
          <span>{{ firstUpperCase(category.slug) }}</span>
        </template>
      </i18n>
    </article-list-header>
    <article-list-main
      :articles="articleListStore.data"
      :pagination="articleListStore.pagination"
      :fetching="articleListStore.fetching"
      :has-more="articleListStore.hasMore"
      @loadmore="loadmoreArticles"
    />
  </div>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .category-flow-page {
    .page-header {
      margin-bottom: $gap;
    }

    .divider {
      border-color: $white !important;
    }
  }
</style>
