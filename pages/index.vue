<template>
  <div class="index">
    <carrousel :articles="articles" @click.native="showLoginError"></carrousel>
    <article-list :articles="articles" @loadmore="loadmoreArticle"></article-list>
  </div>
</template>

<script>
  import Carrousel from '~components/article/archive/carrousel'
  import ArticleList from '~components/article/archive/list'
  import Service from '~plugins/axios'

  let miniToastr
  if (process.BROWSER_BUILD) {
    miniToastr = require('mini-toastr')
  }

  export default {
    name: 'index',
    head: {
      title: 'Surmon.me',
    },
    fetch ({ store }) {
      return store.dispatch('loadArticles')
    },
    components: {
      Carrousel,
      ArticleList
    },
    mounted() {
      console.log('index mounted')
      miniToastr.init()
    },
    notifications: {
      showLoginError: {
        title: 'Welcome!',
        message: 'Hello from nuxt.js',
        type: 'info'
      }
    },
    computed: {
      articles() {
        return this.$store.state.article.list
      },
      nextPageParams() {
        return {
          page: this.articles.data.result.pagination.current_page + 1
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
