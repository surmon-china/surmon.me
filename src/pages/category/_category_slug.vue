<template>
  <div class="category-archive-page">
    <article-list :article="article" @loadmore="loadmoreArticles" />
  </div>
</template>

<script>
  import ArticleList from '~/components/archive/list'

  export default {
    name: 'CategoryArticleList',
    components: {
      ArticleList
    },
    validate({ params, store }) {
      return params.category_slug && store.state.category.data.some(
        category => category.slug === params.category_slug
      )
    },
    fetch({ store, params }) {
      return store.dispatch('article/fetchList', params)
    },
    head() {
      const slug = this.defaultParams.category_slug || ''
      const title = slug.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase())
      const isEnLang = this.$store.getters['global/isEnLang']
      const zhTitle = isEnLang ? '' : `${this.$i18n.nav[slug]} | `
      return { 
        title: `${zhTitle}${title} | Category` 
      }
    },
    computed: {
      article() {
        return this.$store.state.article.list
      },
      currentCategory() {
        return this.$store.state.category.data.find(
          category => category.slug === this.$route.params.category_slug
        )
      },
      defaultParams() {
        return {
          category_slug: this.$route.params.category_slug
        }
      },
      nextPageParams() {
        return Object.assign({
          page: this.article.data.pagination.current_page + 1
        }, this.defaultParams)
      }
    },
    methods: {
      loadmoreArticles() {
        this.$store.dispatch('article/fetchList', this.nextPageParams)
      }
    },
    created() {
      if (!this.currentCategory) {
        this.$router.back()
      }
    }
  }
</script>
