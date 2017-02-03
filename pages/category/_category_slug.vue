<template>
	<div class="category-article-list">
	  <article-list :articles="articles" @loadmore="loadmoreArticle"></article-list>
	</div>
</template>

<script>
  import ArticleList from '~components/article/archive/List'

  export default {
    name: 'category-article-list',
    validate ({ params }) {
	    return !!params.category_slug;
	  },
    components: {
      ArticleList
    },
    computed: {
      articles() {
        return this.$store.state.article.list
      }
    },
    methods: {
      getArticleList() {
        // this.$store.commit('CLEAR_ARTICLE_LIST')
        // this.$store.dispatch('GET_ARTICLE_LIST')
      },
      loadmoreArticle() {
        // this.$store.dispatch('GET_ARTICLE_LIST', { page: this.articles.data.pagination.current_page + 1 })
      }
    }
  }
</script>
