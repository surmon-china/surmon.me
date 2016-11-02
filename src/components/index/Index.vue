<template>
  <div class="index">
    <carrousel></carrousel>
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
      this.init()
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
      init() {
        this.$store.dispatch('GET_ARTICLE_LIST')
      },
      loadmoreArticle() {
        console.log('loadmore')
      }
    }
  }
</script>
