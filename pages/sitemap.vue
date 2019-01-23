<template>
  <div class="page" :class="{ mobile: isMobile }">
    <div class="sitemap">
      <div class="module articles">
        <h3 class="title" v-text="$i18n.text.article.name"></h3>
        <p v-if="!articles.length" v-text="$i18n.text.article.empty"></p>
        <ul class="article-list" v-else>
          <li class="item" :key="index" v-for="(article, index) in articles">
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
      <br>
      <div class="module categories">
        <h3 class="title" v-text="$i18n.text.category.name"></h3>
        <p v-if="!categories.length" v-text="$i18n.text.article.empty"></p>
        <ul class="categories-list" v-else>
          <li class="item" :key="index" v-for="(category, index) in categories">
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
      <br>
      <div class="module tags">
        <h3 class="title" v-text="$i18n.text.tag.name">tags</h3>
        <p v-if="!tags.length" v-text="$i18n.text.article.empty">暂无标签</p>
        <ul class="tag-list" v-else>
          <li class="item" :key="index" v-for="(tag, index) in tags">
            <a
              target="_blank"
              :href="`/tag/${tag.slug}`"
              :title="tag.description"
            >{{ isEnLang ? tag.slug : tag.name }}</a>
            <span>（{{ tag.count || 0 }}）</span>
          </li>
        </ul>
      </div>
      <br>
      <div class="module pages">
        <h3 class="title" v-text="$i18n.text.page.name">pages</h3>
        <ul class="page-list">
          <li class="item">
            <a href="/" target="_blank" v-text="$i18n.nav['home']" />
          </li>
          <li class="item">
            <a href="/project" target="_blank" v-text="$i18n.nav['project']" />
          </li>
          <li class="item">
            <a href="/about" target="_blank" v-text="$i18n.nav['about']" />
          </li>
          <li class="item">
            <a href="/vlog" target="_blank" v-text="$i18n.nav['vlog']" />
          </li>
          <li class="item">
            <a href="/guestbook" target="_blank" v-text="$i18n.nav['guestbook']" />
          </li>
          <li class="item">
            <a href="/sitemap.xml" target="_blank" v-text="$i18n.nav['map']" />
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
        title: `${this.isEnLang ? '' : this.$i18n.nav.map + ' | '}Sitemap`
      }
    },
    fetch({ store }) {
      return store.dispatch('sitemap/fetchArticles', { per_page: 666 })
    },
    computed: {
      isEnLang() {
        return this.$store.getters['global/isEnLang']
      },
      ...mapState({
        tags: state => state.tag.data,
        categories: state => state.category.data,
        articles: state => state.sitemap.articles.data,
        isMobile: state => state.global.isMobile,
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
