<template>
  <div class="index">
    <carrousel :article="article"></carrousel>
    <announcement :announcement="announcement"></announcement>
    <article-list :article="article" @loadmore="loadmoreArticle"></article-list>
  </div>
</template>

<script>
  import Carrousel from '~components/article/archive/carrousel'
  import Announcement from '~components/article/archive/announcement'
  import ArticleList from '~components/article/archive/list'
  import Service from '~plugins/axios'

  export default {
    name: 'index',
    head: {
      title: 'Home',
    },
    fetch ({ store }) {
      return Promise.all([
        store.dispatch('loadArticles'),
        store.dispatch('loadAnnouncements')
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
          page: this.article.data.result.pagination.current_page + 1
        }
      }
    },
    methods: {
      loadmoreArticle() {
        this.$store.dispatch('loadArticles', this.nextPageParams)
      }
    }
  }
</script>
