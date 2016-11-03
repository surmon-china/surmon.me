<template>
  <div class="index">
    <article-list :articles="articles" @loadmore="loadmoreArticle"></article-list>
  </div>
</template>

<script>

  // import
  import ArticleList from '../list/List.vue'

  // export
  export default {
    name: 'date-article-list',
    components: {
      ArticleList
    },
    beforeMount() {
      this.getArticleList()
    },
    computed: {
      articles() {
        return this.$store.state.article.list
      }
    },
    methods: {
      getArticleList() {
        this.$store.commit('CLEAR_ARTICLE_LIST')
        this.$store.dispatch('GET_ARTICLE_LIST')
      },
      loadmoreArticle() {
        this.$store.dispatch('GET_ARTICLE_LIST')
      }
    },
    watch: {
      '$route'() {
        this.getArticleList()
      }
    }
  }
</script>
