<template>
  <div class="tags">
    <article-list :articles="articles" @loadmore="loadmoreArticle"></article-list>
  </div>
</template>

<script>

  // import
  import ArticleList from '../list/List.vue'

  // export
  export default {
    name: 'tag-article-list',
    components: {
      ArticleList
    },
    beforeMount() {
      this.init()
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
