<template>
  <div class="index">
    <carrousel :articles="articles"></carrousel>
    <article-list :articles="articles" @loadmore="loadmoreArticle"></article-list>
  </div>
</template>

<script>
  import Carrousel from '~components/article/archive/carrousel'
  import ArticleList from '~components/article/archive/list'
  import Service from '~plugins/axios'

  export default {
    name: 'index',
    fetch ({ store }) {
      store.commit('article/CLEAR_LIST')
      return Service.get(`/article`).then(({ data }) => {
        if (Object.is(data.code, 1)) {
          store.commit('article/GET_LIST_SUCCESS', data)
        } else {
          store.commit('article/GET_LIST_FAILURE')
        }
      }).catch(err => {
        store.commit('article/GET_LIST_FAILURE')
      })
    },
    components: {
      Carrousel,
      ArticleList
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
        this.$store.dispatch('loadMoreArticles', this.nextPageParams)
      }
    }
  }
</script>
