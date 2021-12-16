<template>
  <div class="index-page">
    <carrousel :articles="articleStore.list.data" :fetching="articleStore.list.fetching" />
    <announcement
      :announcements="announcementStore.announcements"
      :fetching="announcementStore.fetching || articleStore.list.fetching"
    />
    <article-list
      :mammon="false"
      :fetching="articleStore.list.fetching"
      :articles="articleStore.list.data"
      :pagination="articleStore.list.pagination"
      @loadmore="loadmoreArticles"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { useUniversalFetch, onClient } from '/@/universal'
  import { useArticleStore } from '/@/store/article'
  import { useAnnouncementStore } from '/@/store/announcement'
  import { nextScreen } from '/@/utils/effects'
  import { META } from '/@/config/app.config'
  import Carrousel from '/@/components/flow-desktop/carrousel.vue'
  import Announcement from '/@/components/flow-desktop/announcement.vue'
  import ArticleList from '/@/components/flow-desktop/list.vue'

  export default defineComponent({
    name: 'IndexPage',
    components: {
      Carrousel,
      Announcement,
      ArticleList
    },
    setup() {
      const { meta } = useEnhancer()
      const articleStore = useArticleStore()
      const announcementStore = useAnnouncementStore()

      meta({
        title: `${META.title} - ${META.description}`,
        keywords: META.keywords,
        description: META.description
      })

      const loadmoreArticles = async () => {
        const targetPage = articleStore.list.pagination?.current_page + 1
        await articleStore.fetchList({ page: targetPage })
        if (targetPage > 1) {
          onClient(nextScreen)
        }
      }

      useUniversalFetch(() =>
        Promise.all([articleStore.fetchList(), announcementStore.fetchList()])
      )

      return {
        articleStore,
        announcementStore,
        loadmoreArticles
      }
    }
  })
</script>
