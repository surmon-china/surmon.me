<template>
  <div class="page">
    <div class="sitemap">
      <div class="articles">
        <h3 class="title">articles</h3>
        <ul class="article-list" v-if="Object.is(articles.data.code, 1)">
          <li v-for="(article, index) in articles.data.result.data">
            <p>
              <router-link :to="`/article/${article.id}`"
                           :title="article.title">《{{ article.title }}》</router-link>
              <span>&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;</span>
              <a href="" @click.prevent="toggleArticleDescriptionOpen(index)">展开描述</a>
            </p>
            123 {{ article.open }}
            <p :class="[(article.open ? 'open' : '')]">{{ article.description }}</p>
          </li>
        </ul>
      </div>
      <div class="tags">
        <h3 class="title">tags</h3>
        <ul class="tag-list">
          <li v-for="tag in tags">
            <router-link :to="`/tag/${tag.id}`">{{ tag.name }}</router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'sitemap',
    head: {
      title: 'Sitemap'
    },
    fetch ({ store }) {
      return Promise.all([
        store.dispatch('loadSitemapArticles', { per_page: 500 }),
        store.dispatch('loadSitemapCategories', { per_page: 100 })
      ])
    },
    computed: {
      articles() {
        return this.$store.state.sitemap.articles
      },
      categories() {
        return this.$store.state.sitemap.categories
      },
      tags() {
        return this.$store.state.tag.data.result.data
      }
    },
    methods: {
      toggleArticleDescriptionOpen(index) {
        this.$store.commit('sitemap/SET_ARTICLE_DESCRIPTION_OPEN', { index })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/sass/mixins';
  @import '~assets/sass/variables';
  .page {
    padding: 2em 3em;
    background-color: $module-bg;
    overflow: hidden;
    
    .sitemap {

      .tags,
      .articles {

        .title {
          margin: 0em 0 1em;
          font-weight: bold;
          text-transform: capitalize;
        }
      }

      .articles {

        .article-list {

          li {
            margin-bottom: 1em;
          }
        }
      }
      .tags {}
    }
  }
</style>
