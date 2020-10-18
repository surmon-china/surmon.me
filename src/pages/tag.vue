<template>
  <div class="tag-archive-page">
    <article-list-header
      :background-color="currentTagColor"
      :background-image="currentTagImage"
      :icon="currentTagIcon"
    >
      <i18n :zh="currentTag.name" :en="currentTag.slug" />
      <span class="delimiter">-</span>
      <span>{{ currentTag.description || '...' }}</span>
    </article-list-header>
    <article-list
      :fetching="article.fetching"
      :articles="article.data.data"
      :pagination="article.data.pagination"
      @loadmore="loadmoreArticles"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed, watch } from 'vue'
  import { useEnhancer } from '/@/enhancer'
  import { Modules, getNamespace } from '/@/store'
  import { ArticleModuleActions } from '/@/store/article'
  import { TagModuleActions } from '/@/store/tag'
  import { getExtendsValue } from '/@/transforms/state'
  import { nextScreen, scrollToTop } from '/@/utils/effects'
  import ArticleListHeader from '/@/components/archive/header.vue'
  import ArticleList from '/@/components/archive/list.vue'

  export default defineComponent({
    name: 'TagPage',
    components: {
      ArticleListHeader,
      ArticleList
    },
    // head() {
    //   const slug = this.defaultParams.tag_slug || ''
    //   const title = slug.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase())
    //   return { title: `${title} | Tag` }
    // },
    setup() {
      const { store, route, router } = useEnhancer()
      const tagSlug = computed(() => route.params.tag_slug as string)

      const fetchTags = () => store.dispatch(
        getNamespace(Modules.Tag, TagModuleActions.FetchAll)
      )

      const fetchArticles = (params: any) => {
        return store.dispatch(
          getNamespace(Modules.Article, ArticleModuleActions.FetchList),
          params
        )
      }

      const loadmoreArticles = () => {
        fetchArticles({
          ...route.params,
          tag_slug: tagSlug.value,
          page: article.value.data.pagination.current_page + 1
        }).then(nextScreen)
      }

      const fetchAllData = (tag_slug: string) => {
        scrollToTop()
        return Promise.all([
          fetchTags(),
          fetchArticles({ tag_slug })
        ])
      }

      watch(
        () => route.params,
        params => fetchAllData(params.tag_slug as string),
        { flush: 'post' }
      )

      // TODO: SSR
      fetchAllData(tagSlug.value)

      const article = computed(() => store.state.article.list)
      const currentTag = computed(() => {
        return store.state.tag.data.find(tag => {
          return tag.slug === route.params.tag_slug
        })
      })

      if (!currentTag.value) {
        router.back()
        // throw error?
        return
      }

      const currentTagIcon = computed(() => getExtendsValue(currentTag.value, 'icon') || 'icon-tag')
      const currentTagImage = computed(() => getExtendsValue(currentTag.value, 'background'))
      const currentTagColor = computed(() => getExtendsValue(currentTag.value, 'bgcolor'))

      return {
        article,
        currentTag,
        currentTagIcon,
        currentTagImage,
        currentTagColor,
        loadmoreArticles,
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/assets/styles/init.scss';

  .delimiter {
    margin: 0 $sm-gap;
  }
</style>
