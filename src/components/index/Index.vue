<template>
  <div class="index">
    <carrousel :articles="articles"></carrousel>
    <article-list :articles="articles" @loadmore="loadmoreArticle"></article-list>
  </div>
</template>

<script>

  // import
  import Carrousel from './Carrousel.vue'
  import ArticleList from '../article/list/List.vue'

  // export
  export default {
    name: 'index',
    components: {
      Carrousel,
      ArticleList
    },
    activated() {
      // console.log('Index activated')
      this.getArticleList()
    },
    deactivated() {
      // console.log('Index deactivated')
      this.$store.commit('CLEAR_ARTICLE_LIST')
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
        this.$store.dispatch('GET_ARTICLE_LIST', { page: this.articles.data.pagination.current_page + 1 })
      }
    }
  }
</script>
