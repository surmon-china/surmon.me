<script lang="ts" setup>
  import { computed, watch, onBeforeMount } from 'vue'
  import { useUniversalFetch } from '/@/app/universal'
  import { useEnhancer } from '/@/app/enhancer'
  import { usePageSeo } from '/@/composables/head'
  import { useArticleListStore } from '/@/stores/article-list'
  import { useTagStore, getTagIconName, getTagEnName } from '/@/stores/tag'
  import { getStaticURL, getStaticPath, isOriginalStaticURL } from '/@/transforms/url'
  import { getExtrasMap } from '/@/transforms/extra'
  import { scrollToNextScreen } from '/@/utils/scroller'
  import ArticleListHeader from '/@/components/desktop/listing/header.vue'
  import ArticleListMain from '/@/components/desktop/listing/index.vue'

  const props = defineProps<{
    tagSlug: string
  }>()

  const tagStore = useTagStore()
  const articleListStore = useArticleListStore()
  const { cdnDomain, isZhLang } = useEnhancer()

  const tag = computed(() => tagStore.data.find(({ slug }) => slug === props.tagSlug))
  const tagIconName = computed(() => getTagIconName(tag.value?.extras))
  const tagExtrasMap = computed(() => getExtrasMap(tag.value?.extras))
  const tagBackgroundColor = computed(() => tagExtrasMap.value.get('background-color'))
  const tagBackgroundImage = computed(() => {
    const imageUrl = tagExtrasMap.value.get('background-image')
    return imageUrl && isOriginalStaticURL(imageUrl)
      ? getStaticURL(cdnDomain, getStaticPath(imageUrl))
      : imageUrl
  })

  const loadmoreArticles = async () => {
    await articleListStore.fetchNextPage({ tag_slug: props.tagSlug })
    scrollToNextScreen()
  }

  usePageSeo(() => {
    const _tag = tag.value!
    const zhTitle = _tag.name
    const enTitle = getTagEnName(_tag)
    const titles = isZhLang.value ? [zhTitle, enTitle] : [enTitle, 'Tag']
    const description = _tag.description || titles.join(',')
    return { pageTitles: titles, description }
  })

  onBeforeMount(() => {
    watch(
      () => props.tagSlug,
      (tag_slug) => articleListStore.fetch({ tag_slug }),
      { flush: 'post' }
    )
  })

  useUniversalFetch(() => {
    return articleListStore.fetch({ tag_slug: props.tagSlug })
  })
</script>

<template>
  <div class="tag-flow-page">
    <article-list-header
      class="page-header"
      :icon-name="tagIconName"
      :background-color="tagBackgroundColor"
      :background-image="tagBackgroundImage"
    >
      <span class="header" v-if="tag">
        <i18n>
          <template #zh>
            <span>#{{ tag.name }}</span>
            <divider class="divider" type="vertical" />
            <span>{{ tag.description || '...' }}</span>
          </template>
          <template #en>
            <span>Tag</span>
            <divider class="divider" type="vertical" />
            <span>#{{ getTagEnName(tag) }}</span>
          </template>
        </i18n>
      </span>
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

  .tag-flow-page {
    .page-header {
      margin-bottom: $gap;
    }

    .divider {
      border-color: $white !important;
    }
  }
</style>
