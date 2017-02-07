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
              <a href="" @click.prevent="toggleArticleDescriptionOpen(index)">
                <span>{{ article.open ? '收起' : '展开' }}描述</span>
              </a>
            </p>
            <transition name="module">
              <p v-show="article.open">{{ article.description }}</p>
            </transition>
          </li>
        </ul>
      </div>
      <br>
      <div class="categories">
        <h3 class="title">categories</h3>
        <ul class="categories-list" v-if="Object.is(categories.data.code, 1)">
          <li class="item" v-for="(category, index) in categories.data.result.data">
            <p>
              <router-link class="name"
                           :to="`/category/${category.slug}`"
                           :title="category.name">{{ category.name }}</router-link>
              <span>&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;</span>
              <span>{{ category.description }}</span>
            </p>
          </li>
        </ul>
      </div>
      <br>
      <div class="tags">
        <h3 class="title">tags</h3>
        <ul class="tag-list">
          <li class="item" v-for="tag in tags">
            <router-link :to="`/tag/${tag.id}`" :title="tag.description">{{ tag.name }}</router-link>
          </li>
        </ul>
      </div>
      <br>
      <div class="pages">
        <h3 class="title">pages</h3>
        <ul class="page-list">
          <li class="item">
            <router-link to="/">Home</router-link>
          </li>
          <li class="item">
            <router-link to="/project">Project</router-link>
          </li>
          <li class="item">
            <router-link to="/about">About</router-link>
          </li>
          <li class="item">
            <router-link to="/guestbook">Guestbook</router-link>
          </li>
          <li class="item">
            <a href="/sitemap.xml" target="_blank">XML SiteMap</a>
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
        const articles = this.articles.data.result.data
        this.$set(articles[index], 'open', !articles[index].open)
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

      a {
        text-decoration: underline;
      }

      .tags,
      .pages,
      .articles,
      .categories {

        .title {
          margin: 0em 0 1em;
          font-weight: bold;
          text-transform: capitalize;
        }
      }

      .tags,
      .pages {

        .tag-list,
        .page-list {
          overflow: hidden;

          .item {
            float: left;
            display: inline-block;
            margin-right: 1.5em;
            margin-bottom: 1em;
            font-size: 1.1em;
          }
        }
      }

      .categories {

        .categories-list {

          .item {

            .name {
              font-size: 1.1em;
            }
          }
        }
      }
    }
  }
</style>
