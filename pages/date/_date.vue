<template>
  <div class="index">
    <article-list :article="article" @loadmore="loadmoreArticle" />
  </div>
</template>

<script>
  import Carrousel from '~/components/archive/carrousel'
  import ArticleList from '~/components/archive/list'

  export default {
    name: 'data-article-list',
    validate ({ params }) {
      return new Date(params.date).toString() !== 'Invalid Date'
    },
    fetch({ store, params }) {
      return store.dispatch('article/fetchList', params)
    },
    head() {
      return { title: `${this.defaultParams.date} | Date` }
    },
    components: {
      Carrousel,
      ArticleList
    },
    computed: {
      article() {
        return this.$store.state.article.list
      },
      defaultParams() {
        return {
          date: this.$route.params.date
        }
      },
      nextPageParams() {
        return Object.assign({
          page: this.article.data.pagination.current_page + 1
        }, this.defaultParams)
      }
    },
    methods: {
      loadmoreArticle() {
        this.$store.dispatch('article/fetchList', this.nextPageParams)
      }
    }
  }
</script>
