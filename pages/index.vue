<template>
  <div class="index">
    <carrousel :articles="articles"></carrousel>
    <article-list :articles="articles" @loadmore="loadmoreArticle"></article-list>
  </div>
</template>

<script>
  import Carrousel from '~components/article/archive/carrousel.vue'
  import ArticleList from '~components/article/archive/list.vue'
  import Service from '~plugins/axios'

  export default {
    name: 'index',
    async fetch ({ env, store }) {
      let { data } = await Service.get(`${env.baseUrl}article`)
      store.commit('article/GET_LIST_SUCCESS', data)
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
        this.$store.dispatch('loadMoreArticle', this.nextPageParams)
      }
    }
  }
</script>
