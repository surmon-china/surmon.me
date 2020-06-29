<template>
  <div class="index-page">
    <carrousel :article="article" />
    <announcement :announcement="announcement" />
    <!-- <article-list :article="article" @loadmore="loadmoreArticle" /> -->
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, computed } from 'vue'
  import { useStore, Modules, getNamespace } from '/@/store'
  import { ArticleModuleActions } from '/@/store/article'
  import Carrousel from '/@/components/archive/carrousel.vue'
  import Announcement from '/@/components/archive/announcement.vue'
  // import ArticleList from '/@/components/archive/list.vue'
  export default defineComponent({
    name: 'Index',
    components: {
      Carrousel,
      Announcement,
      // ArticleList
    },
    async setup() {
      const store = useStore()
      const article = store.state.article.list
      const announcement = store.state.announcement

      const loadmoreArticle = () => {
        store.dispatch(
          getNamespace(Modules.Article, ArticleModuleActions.FetchList),
          { page: article.data.pagination.current_page + 1 }
        )
      }

      await Promise.all([
        store.dispatch('article/fetchList'),
        store.dispatch('announcement/fetchList')
      ])

      return {
        article,
        announcement,
        loadmoreArticle
      }
    }
  })
</script>
