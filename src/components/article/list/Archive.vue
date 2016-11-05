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
      // console.log('Archive list beforeMount')
      this.getArticleList()
    },
    deactivated() {
      // console.log('Archive list deactivated')
      this.$store.commit('CLEAR_ARTICLE_LIST')
    },
    computed: {
      articles() {
        return this.$store.state.article.list
      }
    },
    methods: {
      getParams(more) {
        let params = {}
        const route = this.$route.name
        if (Object.is(route, 'tag')) params.tag = this.$route.params.tag
        if (Object.is(route, 'date')) params.date = this.$route.params.date
        if (Object.is(route, 'category')) params.category = this.$route.params.category
        Object.assign(params, more || {})
        return params
      },
      getArticleList() {
        this.$store.commit('CLEAR_ARTICLE_LIST')
        this.$store.dispatch('GET_ARTICLE_LIST', this.getParams())
      },
      loadmoreArticle() {
        this.$store.dispatch('GET_ARTICLE_LIST', this.getParams({ page: this.articles.data.pagination.current_page + 1 }))
      }
    },
    watch: {
      '$route'() {
        // console.log(this.$route, 'Archive route change')
        const isSwitchArchive = ['tag', 'date', 'category'].includes(this.$route.name)
        if (isSwitchArchive) this.getArticleList()
        if (!isSwitchArchive) this.$store.commit('CLEAR_ARTICLE_LIST')
      }
    }
  }
</script>
