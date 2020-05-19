<template>
  <div class="index-page">
    <carrousel :article="article" />
    <announcement :announcement="announcement" />
    <article-list :article="article" @loadmore="loadmoreArticle" />
  </div>
</template>

<script>
  import ArticleList from '~/components/archive/list'
  import Carrousel from '~/components/archive/carrousel'
  import Announcement from '~/components/archive/announcement'
  export default {
    name: 'Index',
    fetch({ store }) {
      return Promise.all([
        store.dispatch('article/fetchList'),
        store.dispatch('announcement/fetchList')
      ])
    },
    components: {
      Carrousel,
      Announcement,
      ArticleList
    },
    computed: {
      article() {
        return this.$store.state.article.list
      },
      announcement() {
        return this.$store.state.announcement
      },
      nextPageParams() {
        return {
          page: this.article.data.pagination.current_page + 1
        }
      }
    },
    methods: {
      loadmoreArticle() {
        this.$store.dispatch('article/fetchList', this.nextPageParams)
      }
    }
  }
</script>
