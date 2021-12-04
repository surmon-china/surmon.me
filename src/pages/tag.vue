<template>
  <div class="tag-archive-page">
    <article-list-header
      :background-color="currentTagColor"
      :background-image="currentTagImage"
      :icon="currentTagIcon"
    >
      <template v-if="currentTag">
        <i18n :zh="currentTag.name" :en="currentTag.slug" />
        <span class="delimiter">-</span>
        <span>{{ currentTag.description || '...' }}</span>
      </template>
    </article-list-header>
    <article-list
      :fetching="articleStore.list.fetching"
      :articles="articleStore.list.data"
      :pagination="articleStore.list.pagination"
      @loadmore="loadmoreArticles"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed, watch, onBeforeMount } from 'vue'
  import { useUniversalFetch, onClient } from '/@/universal'
  import { useEnhancer } from '/@/app/enhancer'
  import { useArticleStore } from '/@/store/article'
  import { useTagStore } from '/@/store/tag'
  import { getExtendsValue } from '/@/transforms/state'
  import { firstUpperCase } from '/@/transforms/text'
  import { nextScreen, scrollToTop } from '/@/utils/effects'
  import ArticleListHeader from '/@/components/archive/header.vue'
  import ArticleList from '/@/components/archive/list.vue'

  export default defineComponent({
    name: 'TagPage',
    components: {
      ArticleListHeader,
      ArticleList
    },
    props: {
      tagSlug: {
        type: String,
        required: true
      }
    },
    setup(props) {
      const { meta, isZhLang } = useEnhancer()
      const tagStore = useTagStore()
      const articleStore = useArticleStore()
      const currentTag = computed(() => tagStore.tags.find((tag) => tag.slug === props.tagSlug))

      meta(() => {
        const enTitle = firstUpperCase(props.tagSlug)
        const zhTitle = currentTag.value?.name!
        const titles = isZhLang.value ? [zhTitle, enTitle] : [enTitle, 'Tag']
        const description = currentTag.value?.description || titles.join(',')
        return { pageTitle: titles.join(' | '), description }
      })

      const currentTagIcon = computed(() => getExtendsValue(currentTag.value, 'icon') || 'icon-tag')
      const currentTagImage = computed(() => getExtendsValue(currentTag.value, 'background'))
      const currentTagColor = computed(() => getExtendsValue(currentTag.value, 'bgcolor'))

      const loadmoreArticles = async () => {
        await articleStore.fetchList({
          tag_slug: props.tagSlug,
          page: articleStore.list.pagination.current_page + 1
        })
        onClient(nextScreen)
      }

      const fetchAllData = (tag_slug: string) => {
        onClient(scrollToTop)
        return Promise.all([tagStore.fetchAll(), articleStore.fetchList({ tag_slug })])
      }

      onBeforeMount(() => {
        watch(
          () => props.tagSlug,
          (tagSlug) => fetchAllData(tagSlug),
          { flush: 'post' }
        )
      })

      useUniversalFetch(() => fetchAllData(props.tagSlug))

      return {
        articleStore,
        currentTag,
        currentTagIcon,
        currentTagImage,
        currentTagColor,
        loadmoreArticles
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/init.scss';

  .delimiter {
    margin: 0 $sm-gap;
  }
</style>
