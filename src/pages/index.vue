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
  import { prefetch, onClient } from '/@/universal'
  import { useArticleStore } from '/@/store/article'
  import { useAnnouncementStore } from '/@/store/announcement'
  import { nextScreen } from '/@/utils/effects'
  import Carrousel from '/@/components/archive/carrousel.vue'
  import Announcement from '/@/components/archive/announcement.vue'
  import ArticleList from '/@/components/archive/list.vue'

  export default defineComponent({
    name: 'IndexPage',
    components: {
      Carrousel,
      Announcement,
      ArticleList
    },
    setup() {
      const articleStore = useArticleStore()
      const announcementStore = useAnnouncementStore()

      const loadmoreArticles = async () => {
        const targetPage = articleStore.list.pagination?.current_page + 1
        await articleStore.fetchList({ page: targetPage })
        if (targetPage > 1) {
          onClient(nextScreen)
        }
      }

      const fetchAllData = () => {
        return Promise.all([articleStore.fetchList(), announcementStore.fetchList()])
      }

      const resultData = {
        articleStore,
        announcementStore,
        loadmoreArticles
      }

      return prefetch(fetchAllData, resultData)
    }
  })
</script>
