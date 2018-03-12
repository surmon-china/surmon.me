<template>
  <div class="page" :class="{ mobile: mobileLayout }">
    <div class="sitemap">
      <div class="articles">
        <h3 class="title">articles</h3>
        <p v-if="!articles.length">暂无文章</p>
        <ul class="article-list" v-else>
          <li class="item" v-for="(article, index) in articles">
            <p class="item-content">
              <router-link class="link"
                           :to="`/article/${article.id}`"
                           :title="article.title">《{{ article.title }}》</router-link>
              <span class="sign">&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;</span>
              <a class="toggle" href="" @click.prevent="$store.commit('sitemap/TOGGLE_ARTICLE_OPEN', index)">
                <span>{{ article.open ? '收起' : '展开' }}描述</span>
              </a>
            </p>
            <transition name="module">
              <p v-show="article.open" class="item-description">
                <span>{{ article.description || '空空如也' }}</span>
              </p>
            </transition>
          </li>
        </ul>
      </div>
      <br>
      <div class="categories">
        <h3 class="title">categories</h3>
        <p v-if="!categories.length">暂无分类</p>
        <ul class="categories-list" v-else>
          <li class="item" v-for="(category, index) in categories">
            <p>
              <router-link class="name"
                           :to="`/category/${category.slug}`"
                           :title="category.name">{{ category.name }}</router-link>
              <span>&nbsp;</span>
              <span>（{{ category.count || 0 }}）</span>
              <span>&nbsp;-&nbsp;&nbsp;</span>
              <span>{{ category.description }}</span>
            </p>
          </li>
        </ul>
      </div>
      <br>
      <div class="tags">
        <h3 class="title">tags</h3>
        <p v-if="!tags.length">暂无标签</p>
        <ul class="tag-list" v-else>
          <li class="item" v-for="tag in tags">
            <router-link :to="`/tag/${tag.slug}`" :title="tag.description">{{ tag.name }}</router-link>
            <span>&nbsp;</span>
            <span>（{{ tag.count || 0 }}）</span>
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
  import { mapState } from 'vuex'
  export default {
    name: 'sitemap',
    head: {
      title: 'Sitemap'
    },
    fetch ({ store }) {
      return store.dispatch('loadSitemapArticles', { per_page: 500 })
    },
    computed: {
      ...mapState({
        tags: state => state.tag.data.data,
        categories: state => state.category.data.data,
        articles: state => state.sitemap.articles.data.data,
        mobileLayout: state => state.option.mobileLayout,
      })
    }
  }
</script>

<style lang="scss" scoped>
  .page {
    padding: 2em 3em;
    background-color: $module-bg;
    overflow: hidden;
    
    &.mobile {
      padding: 1.666rem;

      ul {
        padding-left: 1.666rem;

        &.article-list {

          > .item {

            > .item-content {

              > .link {
                display: block;
                margin-bottom: 1rem;
              }

              > .sign {
                display: none;
              }

              > .toggle {

              }
            }
          }
        }
      }
    }

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

      .articles {

        .article-list {

          > .item {

            > .item-description {
              line-height: 2.16rem;
            }
          }
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
