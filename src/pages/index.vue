<template>
  <div class="index-page">
    <carrousel :articles="articleListStore.list.data" :fetching="articleListStore.list.fetching" />
    <announcement
      :announcements="announcementStore.announcements"
      :fetching="announcementStore.fetching || articleListStore.list.fetching"
    />
    <article-list
      :mammon="false"
      :fetching="articleListStore.list.fetching"
      :articles="articleListStore.list.data"
      :pagination="articleListStore.list.pagination"
      @loadmore="loadmoreArticles"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { useUniversalFetch, onClient } from '/@/universal'
  import { useAnnouncementStore } from '/@/store/announcement'
  import { useArticleListStore } from '/@/store/article'
  import { useMetaStore } from '/@/store/meta'
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
      const metaStore = useMetaStore()
      const articleListStore = useArticleListStore()
      const announcementStore = useAnnouncementStore()

      meta(() => ({
        title: `${META.title} - ${META.sub_title}`,
        description: metaStore.appOptions.data?.description,
        keywords: metaStore.appOptions.data?.keywords.join(',')
      }))

      const loadmoreArticles = async () => {
        const targetPage = articleListStore.list.pagination?.current_page + 1
        await articleListStore.fetchList({ page: targetPage })
        if (targetPage > 1) {
          onClient(nextScreen)
        }
      }

      useUniversalFetch(() =>
        Promise.all([articleListStore.fetchList(), announcementStore.fetchList()])
      )

      return {
        articleListStore,
        announcementStore,
        loadmoreArticles
      }
    }
  })
</script>
