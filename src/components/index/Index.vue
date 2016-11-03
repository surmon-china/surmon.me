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
    beforeMount() {
      this.$store.commit('CLEAR_ARTICLE_LIST')
      this.$store.dispatch('GET_ARTICLE_LIST')
    },
    components: {
      Carrousel,
      ArticleList
    },
    computed: {
      articles() {
        return this.$store.state.article.list
      }
    },
    methods: {
      loadmoreArticle() {
        this.$store.dispatch('GET_ARTICLE_LIST')
      }
    }
  }
</script>
