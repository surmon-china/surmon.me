<template>
  <div class="index">
    <article-list :articles="articles" @loadmore="loadmoreArticle"></article-list>
  </div>
</template>

<script>
  import Carrousel from '~components/article/archive/carrousel'
  import ArticleList from '~components/article/archive/list'
  import Service from '~plugins/axios'

  export default {
    name: 'data-article-list',
    validate ({ params }) {
      return !!params.date;
    },
    fetch({ env, store, params: { date } }) {
      store.commit('article/CLEAR_LIST')
      return Service.get(`/article`, { params: { date }})
      .then(({ data }) => {
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
    mounted() {
      // console.log(this.defaultParams, this.nextPageParams);
    },
    computed: {
      articles() {
        return this.$store.state.article.list
      },
      defaultParams() {
        return {
          date: this.$route.params.date
        }
      },
      nextPageParams() {
        return Object.assign({
          page: this.articles.data.result.pagination.current_page + 1
        }, this.defaultParams)
      }
    },
    methods: {
      loadmoreArticle() {
        console.log(this.nextPageParams);
        this.$store.dispatch('loadMoreArticles', this.nextPageParams)
      }
    }
  }
</script>
