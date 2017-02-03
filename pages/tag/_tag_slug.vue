<template>
	<div class="tag-article-list">
	  <article-list :articles="articles" @loadmore="loadmoreArticle"></article-list>
	</div>
</template>

<script>
  import ArticleList from '~components/article/archive/list'

  export default {
    name: 'tag-article-list',
    validate ({ params }) {
	    return !!params.tag_slug;
	  },
    components: {
      ArticleList
    },
    activated() {
      // console.log('Index activated')
      // this.getArticleList()
    },
    deactivated() {
      // console.log('Index deactivated')
      // this.$store.commit('CLEAR_ARTICLE_LIST')
    },
    computed: {
      articles() {
        // return this.$store.state.article.list
        return { data: { data: [] } }
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
