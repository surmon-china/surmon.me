<template>
  <div class="tag-archive-page">
    <article-list-header
      :background-color="currentTagColor"
      :background-image="currentTagImage"
      :icon="currentTagIcon"
    >
      <i18n :zh="currentTag.name" :en="currentTag.slug" />
      <span>&nbsp;-&nbsp;</span>
      <span>{{ currentTag.description || '...' }}</span>
    </article-list-header>
    <article-list
      :article="articleData"
      @loadmore="loadmoreArticles"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import { useStore, Modules, getNamespace } from '/@/store'
  import { ArticleModuleActions } from '/@/store/article'
  import { TagModuleActions } from '/@/store/tag'
  import { getExtendsValue } from '/@/transforms/state'
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
    async setup() {
      const store = useStore()
      const route = useRoute()
      const router = useRouter()

      const fetchTags = () => store.dispatch(
        getNamespace(Modules.Tag, TagModuleActions.FetchList)
      )

      const fetchArticles = (params: any) => {
        return store.dispatch(
          getNamespace(Modules.Article, ArticleModuleActions.FetchList),
          params
        )
      }

      const loadmoreArticles = () => {
        return fetchArticles({
          ...route.params,
          tag_slug: route.params.tag_slug,
          page: articleData.value.data.pagination.current_page + 1
        })
      }

      await Promise.all([
        fetchTags(),
        fetchArticles(route.params),
      ])

      const articleData = computed(() => store.state.article.list)
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

      const currentTagIcon = computed(
        () => getExtendsValue(currentTag.value, 'icon') || 'icon-tag'
      )
      const currentTagImage = computed(
        () => getExtendsValue(currentTag.value, 'background')
      )
      const currentTagColor = computed(
        () => getExtendsValue(currentTag.value, 'bgcolor')
      )

      return {
        articleData,
        currentTag,
        currentTagIcon,
        currentTagImage,
        currentTagColor,
        loadmoreArticles,
      }
    }
  })
</script>
