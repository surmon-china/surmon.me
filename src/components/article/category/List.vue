<template>
  <div class="index">
    <article-list :articles="articles" @loadmore="loadmoreArticle"></article-list>
  </div>
</template>

<script>

  // 组件
  import ArticleList from '../list/List.vue'

  // 模块配置
  export default {
    name: 'category-article-list',
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
