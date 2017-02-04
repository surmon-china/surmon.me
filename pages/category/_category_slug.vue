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
    validate ({ params }) {
      return (!!params.category_slug && ['think', 'code'].includes(params.category_slug));
    },
    fetch({ store, params }) {
      return store.dispatch('loadArticles', params)
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
        this.$store.dispatch('loadArticles', this.nextPageParams)
      }
    }
  }
</script>
