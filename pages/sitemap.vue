<template>
  <div class="page" :class="{ mobile: mobileLayout }">
    <div class="sitemap">
      <div class="module articles">
        <h3 class="title" v-text="$i18n.text.article.name">articles</h3>
        <p v-if="!articles.length" v-text="$i18n.text.article.empty">暂无文章</p>
        <ul class="article-list" v-else>
          <li class="item" :key="index" v-for="(article, index) in articles">
            <p class="item-content">
              <nuxt-link class="link"
                         :to="`/article/${article.id}`"
                         :title="article.title">
                <span class="sign">「 </span>
                <span class="title">{{ article.title }}</span>
                <span class="sign"> 」</span>
              </nuxt-link>
              <span class="sign">&nbsp;&nbsp;-&nbsp;&nbsp;</span>
              <small>
                <a class="toggle-link"
                   href=""
                   @click.prevent="$store.commit('sitemap/TOGGLE_ARTICLE_OPEN', index)"
                   v-text="$i18n.text.action[article.open ? 'close' : 'open']">
                </a>
              </small>
            </p>
            <transition name="module">
              <p v-show="article.open" class="item-description">
                <span v-html="article.description || $i18n.text.article.empty"></span>
              </p>
            </transition>
          </li>
        </ul>
      </div>
      <br>
      <div class="module categories">
        <h3 class="title" v-text="$i18n.text.category.name">categories</h3>
        <p v-if="!categories.length" v-text="$i18n.text.article.empty">暂无分类</p>
        <ul class="categories-list" v-else>
          <li class="item" :key="index" v-for="(category, index) in categories">
            <p class="item-content">
              <nuxt-link class="name"
                         :to="`/category/${category.slug}`"
                         :title="category.name"
                         v-text="$i18n.nav[category.slug]">{{ category.name }}</nuxt-link>
              <span>（{{ category.count || 0 }}）</span>
              <span>&nbsp;-&nbsp;</span>
              <span>{{ category.description }}</span>
            </p>
          </li>
        </ul>
      </div>
      <br>
      <div class="module tags">
        <h3 class="title" v-text="$i18n.text.tag.name">tags</h3>
        <p v-if="!tags.length" v-text="$i18n.text.article.empty">暂无标签</p>
        <ul class="tag-list" v-else>
          <li class="item" :key="index" v-for="(tag, index) in tags">
            <nuxt-link :to="`/tag/${tag.slug}`" :title="tag.description">{{ tag.name }}</nuxt-link>
            <span>（{{ tag.count || 0 }}）</span>
          </li>
        </ul>
      </div>
      <br>
      <div class="module pages">
        <h3 class="title" v-text="$i18n.text.page.name">pages</h3>
        <ul class="page-list">
          <li class="item">
            <nuxt-link to="/" v-text="$i18n.nav['home']">Home</nuxt-link>
          </li>
          <li class="item">
            <nuxt-link to="/project" v-text="$i18n.nav['project']">Project</nuxt-link>
          </li>
          <li class="item">
            <nuxt-link to="/about" v-text="$i18n.nav['about']">About</nuxt-link>
          </li>
          <li class="item">
            <nuxt-link to="/guestbook" v-text="$i18n.nav['guestbook']">Guestbook</nuxt-link>
          </li>
          <li class="item">
            <a href="/sitemap.xml" target="_blank" v-text="$i18n.nav['map']">XML SiteMap</a>
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
    head() {
      return {
        title: `${this.langIsEn ? '' : this.$i18n.nav.map + ' | '}Sitemap`
      }
    },
    fetch({ store }) {
      return store.dispatch('loadSitemapArticles', { per_page: 500 })
    },
    computed: {
      langIsEn() {
        return this.$store.getters['option/langIsEn']
      },
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

    $border-guide: 1px solid;
    $margin-guide: 1.2em;
    
    &.mobile {
      padding: 1.666rem;

      ul {
        padding-left: 1.666rem;

        &.article-list {

          > .item {

            > .item-content {

              > .link {
                display: flex;
                border: none;

                > .sign,
                > .title {
                  display: inline-block;
                }

                > .title {
                  margin: 0;
                  max-width: 88%;
                  border-bottom: $border-guide;
                  @include text-overflow();
                }
              }

              .toggle-link {
                padding-left: 1em;
                display: block;
                margin: 1em 0;
              }

              > .sign {
                display: none;
              }
            }

            > .item-description {
              margin-top: -$margin-guide * 0.7;
            }
          }
        }
      }
    }

    .sitemap {
      text-transform: capitalize;

      a {
        border-bottom: $border-guide;

        &.toggle-link {
          border: none;
        }
      }

      .module {
        font-size: 1em;

        .title {
          font-weight: bold;
          text-transform: capitalize;
          margin: 0em 0 $margin-guide * 0.9;
        }
      }

      .articles {
        .article-list {
          > .item {

            > .item-content {
              margin-bottom: $margin-guide;

              > .link {
                border: none;

                > .title {
                  font-weight: normal;
                  border-bottom: $border-guide;
                }
              }
            }

            > .item-description {
              line-height: 2em;
              padding-left: $margin-guide * 0.7;
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
            display: block;
            margin-right: $margin-guide;
            margin-bottom: $margin-guide;
          }
        }
      }

      .categories {
        .categories-list {
          .item {
            .name {
              text-transform: capitalize;
            }
          }
        }
      }
    }
  }
</style>
