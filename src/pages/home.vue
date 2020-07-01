<template>
  <div class="index-page">
    <carrousel :article="article" />
    <announcement :announcement="announcement" />
    <article-list :article="article" @loadmore="loadmoreArticles" />
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, computed } from 'vue'
  import { useStore, Modules, getNamespace } from '/@/store'
  import { ArticleModuleActions } from '/@/store/article'
  import { AnnouncementModuleActions } from '/@/store/announcement'
  import Carrousel from '/@/components/archive/carrousel.vue'
  import Announcement from '/@/components/archive/announcement.vue'
  import ArticleList from '/@/components/archive/list.vue'

  export default defineComponent({
    name: 'Index',
    components: {
      Carrousel,
      Announcement,
      ArticleList
    },
    async setup() {
      const store = useStore()
      const article = computed(() => store.state.article.list)
      const announcement = computed(() => store.state.announcement)

      const fetchAnnouncements = () => store.dispatch(
        getNamespace(Modules.Article, AnnouncementModuleActions.FetchList),
      )

      const fetchArticles = (params?: any) => {
        return store.dispatch(
          getNamespace(Modules.Article, ArticleModuleActions.FetchList),
          params
        )
      }

      const loadmoreArticles = () => {
        fetchArticles({ page: article.value.data.pagination?.current_page + 1 })
      }

      await Promise.all([
        fetchArticles(),
        fetchAnnouncements()
      ])

      return {
        article,
        announcement,
        loadmoreArticles
      }
    }
  })
</script>
