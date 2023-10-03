<script lang="ts" setup>
  import { computed, watch, onBeforeMount } from 'vue'
  import { useUniversalFetch } from '/@/universal'
  import { useEnhancer } from '/@/app/enhancer'
  import { useArticleListStore } from '/@/stores/article'
  import { useTagStore, getTagEnName } from '/@/stores/tag'
  import { getExtendValue } from '/@/transforms/state'
  import { firstUpperCase } from '/@/transforms/text'
  import { getStaticURL, getStaticPath, isOriginalStaticURL } from '/@/transforms/url'
  import { scrollToNextScreen } from '/@/utils/scroller'
  import ArticleListHeader from '/@/components/flow/desktop/header.vue'
  import ArticleList from '/@/components/flow/desktop/list.vue'

  const props = defineProps<{
    tagSlug: string
  }>()

  const { seoMeta, cdnDomain, isZhLang } = useEnhancer()

  const tagStore = useTagStore()
  const articleListStore = useArticleListStore()
  const currentTag = computed(() => tagStore.data.find((tag) => tag.slug === props.tagSlug))
  const currentTagIcon = computed(() => getExtendValue(currentTag.value?.extends || [], 'icon') || 'icon-tag')
  const currentTagColor = computed(() => getExtendValue(currentTag.value?.extends || [], 'bgcolor'))
  const currentTagImage = computed(() => {
    const value = getExtendValue(currentTag.value?.extends || [], 'background')
    if (isOriginalStaticURL(value)) {
      return getStaticURL(cdnDomain, getStaticPath(value!))
    } else {
      return value
    }
  })

  const loadmoreArticles = async () => {
    await articleListStore.fetch({
      tag_slug: props.tagSlug,
      page: articleListStore.pagination!.current_page + 1
    })
    scrollToNextScreen()
  }

  seoMeta(() => {
    const enTitle = firstUpperCase(props.tagSlug)
    const zhTitle = currentTag.value?.name!
    const titles = isZhLang.value ? [zhTitle, enTitle] : [enTitle, 'Tag']
    const description = currentTag.value?.description || titles.join(',')
    return {
      pageTitle: titles.join(' | '),
      description
    }
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
      :background-color="currentTagColor"
      :background-image="currentTagImage"
      :icon="currentTagIcon"
    >
      <template v-if="currentTag">
        <span class="header">
          <i18n>
            <template #zh>
              <span>#{{ currentTag.name }}</span>
              <divider class="divider" type="vertical" />
              <span>{{ currentTag.description || '...' }}</span>
            </template>
            <template #en>
              <span>Tag</span>
              <divider class="divider" type="vertical" />
              <span>#{{ getTagEnName(currentTag) }}</span>
            </template>
          </i18n>
        </span>
      </template>
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

  .tag-flow-page {
    .divider {
      border-color: $white !important;
    }
  }
</style>
