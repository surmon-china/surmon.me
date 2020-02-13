<template>
  <div class="sitemap-page" :class="{ mobile: isMobile }">
    <div class="sitemap">
      <div class="module articles">
        <h4 class="title" v-text="$i18n.text.article.name"></h4>
        <p v-if="!articles.length" v-text="$i18n.text.article.empty"></p>
        <ul v-else class="article-list">
          <li v-for="(article, index) in articles" :key="index" class="item">
            <p class="item-content">
              <a class="link" :href="`/article/${article.id}`" target="_blank" :title="article.title">
                <span class="sign">「</span>
                <span class="title">{{ article.title }}</span>
                <span class="sign">」</span>
              </a>
              <span class="sign">&nbsp;&nbsp;-&nbsp;&nbsp;</span>
              <small>
                <a
                  href
                  class="toggle-link"
                  @click.prevent="$store.commit('sitemap/updateArticleOpenState', index)"
                  v-text="$i18n.text.action[article.open ? 'close' : 'open']"
                ></a>
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
      <div class="module categories">
        <h4 class="title" v-text="$i18n.text.category.name"></h4>
        <p v-if="!categories.length" v-text="$i18n.text.article.empty"></p>
        <ul v-else class="categories-list">
          <li v-for="(category, index) in categories" :key="index" class="item">
            <p class="item-content">
              <a
                class="name"
                target="_blank"
                :href="`/category/${category.slug}`"
                :title="category.name"
              >{{ isEnLang ? category.slug : category.name }}</a>
              <span>（{{ category.count || 0 }}）</span>
              <span>&nbsp;-&nbsp;</span>
              <span>{{ category.description }}</span>
            </p>
          </li>
        </ul>
      </div>
      <div class="module tags">
        <h4 class="title" v-text="$i18n.text.tag.name"></h4>
        <p v-if="!tags.length" v-text="$i18n.text.article.empty"></p>
        <ul v-else class="tag-list">
          <li v-for="(tag, index) in tags" :key="index" class="item">
            <a
              target="_blank"
              :href="`/tag/${tag.slug}`"
              :title="tag.description"
            >{{ isEnLang ? tag.slug : tag.name }}</a>
            <span>（{{ tag.count || 0 }}）</span>
          </li>
        </ul>
      </div>
      <div class="module pages">
        <h4 class="title" v-text="$i18n.text.page.name"></h4>
        <ul class="page-list">
          <li class="item">
            <a href="/" target="_blank" v-text="$i18n.nav.home" />
          </li>
          <li class="item">
            <a href="/about" target="_blank" v-text="$i18n.nav.about" />
          </li>
          <li class="item">
            <a href="/vlog" target="_blank" v-text="$i18n.nav.vlog" />
          </li>
          <li class="item">
            <a
              target="_blank"
              rel="external nofollow noopener"
              :href="appConfig.links.project"
            >{{ $i18n.nav.project }}</a>
          </li>
          <li class="item">
            <a href="/service" target="_blank" v-text="$i18n.nav.service" />
          </li>
          <li class="item">
            <a href="/guestbook" target="_blank" v-text="$i18n.nav.guestbook" />
          </li>
          <li class="item">
            <a href="/sitemap.xml" target="_blank" v-text="$i18n.nav.map" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import appConfig from '~/config/app.config'

  export default {
    name: 'Sitemap',
    head() {
      return {
        title: `${this.isEnLang ? '' : this.$i18n.nav.map + ' | '}Sitemap`
      }
    },
    fetch({ store }) {
      return store.dispatch('sitemap/fetchArticles', { per_page: 666 })
    },
    computed: {
      ...mapState({
        tags: state => state.tag.data,
        categories: state => state.category.data,
        articles: state => state.sitemap.articles.data,
        isMobile: state => state.global.isMobile,
      }),
      isEnLang() {
        return this.$store.getters['global/isEnLang']
      },
      appConfig: () => appConfig
    }
  }
</script>

<style lang="scss" scoped>
  .sitemap-page {
    padding: $gap 3rem;
    background-color: $module-bg;
    overflow: hidden;
    $border-guide: 1px solid;

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
              margin-top: -$gap;
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
        margin-bottom: $lg-gap * 2;
        font-size: 1em;

        .title {
          font-weight: bold;
          text-transform: capitalize;
        }
      }

      .articles {
        .article-list {
          list-style: square;

          > .item {
            > .item-content {
              margin-bottom: 1.2em;

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
              padding-left: 1em;
            }
          }
        }
      }

      .tags,
      .pages {
        margin-bottom: $gap;

        .tag-list,
        .page-list {
          overflow: hidden;
          margin: 0;

          .item {
            float: left;
            display: block;
            margin-right: $lg-gap;
            margin-bottom: $lg-gap;
          }
        }
      }

      .categories {
        .categories-list {
          list-style: square;

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
