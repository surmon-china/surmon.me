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
    name: 'category-article-list',
    fetch({ env, store, params: { category_slug } }) {
      store.commit('article/CLEAR_LIST')
      return Service.get(`/article`, { params: { category_slug }}).then(({ data }) => {
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
      console.log(this.defaultParams, this.nextPageParams);
    },
    computed: {
      articles() {
        return this.$store.state.article.list
      },
      defaultParams() {
        return {
          category_slug: this.$route.params.category_slug
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
        this.$store.dispatch('loadMoreArticle', this.nextPageParams)
      }
    }
  }
</script>
