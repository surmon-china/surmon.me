<template>
  <div class="index">
    <article-list :article="article" @loadmore="loadmoreArticle"></article-list>
  </div>
</template>

<script>
  import Carrousel from '~/components/archive/carrousel'
  import ArticleList from '~/components/archive/list'

  export default {
    name: 'category-article-list',
    components: {
      Carrousel,
      ArticleList
    },
    validate({ params, store }) {
      return !!params.category_slug && store.state.category.data.data.find(category => {
        return Object.is(category.slug, params.category_slug)
      })
    },
    fetch({ store, params }) {
      return store.dispatch('loadArticles', params)
    },
    head() {
      const slug = this.defaultParams.category_slug || ''
      const title = slug.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase())
      const isEn = this.$store.getters['option/langIsEn']
      const zhTitle = isEn ? '' : `${this.$i18n.nav[slug]} | `
      return { 
        title: `${zhTitle}${title} | Category` 
      }
    },
    created() {
      if (!this.currentCategory) {
        this.$router.back()
      }
    },
    computed: {
      article() {
        return this.$store.state.article.list
      },
      currentCategory() {
        return this.$store.state.category.data.data.find(category => {
          return Object.is(category.slug, this.$route.params.category_slug)
        })
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
      loadmoreArticle() {
        this.$store.dispatch('loadArticles', this.nextPageParams)
      }
    }
  }
</script>
