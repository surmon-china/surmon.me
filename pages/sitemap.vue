<template>
  <div class="page">
    <div class="sitemap">
      <div class="articles">
        <h3>articles</h3>
        <ul class="article-list" v-if="Object.is(articles.data.code, 1)">
          <li v-for="article in articles.data.result.data">
            <router-link :to="`/article/${article.id}`">《{{ article.title }}》</router-link>
          </li>
        </ul>
      </div>
      <div class="tags">
        <h3>tags</h3>
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
        store.dispatch('loadArticles', { per_page: 500 })
      ])
    },
    computed: {
      articles() {
        return this.$store.state.article.list
      },
      tags() {
        return this.$store.state.tag.data.result.data
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

      .content { }
    }
  }
</style>
