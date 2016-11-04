<template>
  <div class="archive">
    <article-list :articles="articles" @loadmore="loadmoreArticle"></article-list>
  </div>
</template>

<script>

  // 组件
  import ArticleList from './List.vue'

  // 模块配置
  export default {
    name: 'Article-Archive',
    components: {
      ArticleList
    },
    beforeMount() {
      // console.log('index Archive')
      // if (this.$route.name === 'index') this.getArticleList()
    },
    activated() {
      console.log('Archive list activated')
      this.getArticleList()
    },
    computed: {
      articles() {
        return this.$store.state.article.list
      }
    },
    methods: {
      getArticleList() {
        const isFetching = this.articles.fetching
        console.log('我被请求了', this.articles.fetching)
        // 如果正在由之前的请求发生，应该取消之前的请求，然后继续请求
        if (isFetching) {
          // console.log('应该取消之前的请求，然后继续请求')
          // this.$store.dispatch('CANCEL_GET_ARTICLE_LIST')
        }
        this.$store.commit('CLEAR_ARTICLE_LIST')
        this.$store.dispatch('GET_ARTICLE_LIST')
      },
      loadmoreArticle() {
        this.$store.dispatch('GET_ARTICLE_LIST')
      }
    },
    watch: {
      '$route'() {
        // console.log(this, 'Archive route change')
        const isSwitchArchive = ['index', 'tag', 'date', 'category'].includes(this.$route.name)
        if (isSwitchArchive) this.getArticleList()
        if (!isSwitchArchive) this.$store.commit('CLEAR_ARTICLE_LIST')
      }
    }
  }
</script>
