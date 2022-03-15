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
              <span>#{{ tagEnName(currentTag) }}</span>
            </template>
          </i18n>
        </span>
      </template>
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
  import { useUniversalFetch, onClient } from '/@/universal'
  import { useEnhancer } from '/@/app/enhancer'
  import { useArticleListStore } from '/@/stores/article'
  import { useTagStore, tagEnName } from '/@/stores/tag'
  import { getExtendValue } from '/@/transforms/state'
  import { firstUpperCase } from '/@/transforms/text'
  import { scrollToNextScreen } from '/@/utils/scroller'
  import ArticleListHeader from '/@/components/flow/desktop/header.vue'
  import ArticleList from '/@/components/flow/desktop/list.vue'

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
      const articleListStore = useArticleListStore()
      const currentTag = computed(() => tagStore.tags.find((tag) => tag.slug === props.tagSlug))
      const currentTagIcon = computed(
        () => getExtendValue(currentTag.value?.extends || [], 'icon') || 'icon-tag'
      )
      const currentTagImage = computed(() =>
        getExtendValue(currentTag.value?.extends || [], 'background')
      )
      const currentTagColor = computed(() =>
        getExtendValue(currentTag.value?.extends || [], 'bgcolor')
      )

      meta(() => {
        const enTitle = firstUpperCase(props.tagSlug)
        const zhTitle = currentTag.value?.name!
        const titles = isZhLang.value ? [zhTitle, enTitle] : [enTitle, 'Tag']
        const description = currentTag.value?.description || titles.join(',')
        return { pageTitle: titles.join(' | '), description }
      })

      const loadmoreArticles = async () => {
        await articleListStore.fetchList({
          tag_slug: props.tagSlug,
          page: articleListStore.list.pagination.current_page + 1
        })
        onClient(scrollToNextScreen)
      }

      const fetchAllData = (tag_slug: string) => {
        return Promise.all([tagStore.fetchAll(), articleListStore.fetchList({ tag_slug })])
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
        articleListStore,
        tagEnName,
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
  @import 'src/styles/variables.scss';
  @import 'src/styles/mixins.scss';

  .tag-flow-page {
    .divider {
      border-color: $white !important;
    }
  }
</style>
