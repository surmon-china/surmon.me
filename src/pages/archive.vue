<template>
  <div class="archive-page" :class="{ mobile: isMobile }">
    <div class="archive">
      <div class="module articles">
        <h4 class="title" v-i18n="LANGUAGE_KEYS.ARTICLE_TITLE" />
        <!-- TODO: 按照日期分类 -->
        <placeholder :data="articles.length">
          <template #placeholder>
            <p v-i18n="LANGUAGE_KEYS.ARTICLE_PLACEHOLDER"></p>
          </template>
          <template #default>
            <ul class="article-list">
              <li v-for="(article, index) in articles" :key="index" class="item">
                <p class="item-content">
                  <a
                    class="link"
                    target="_blank"
                    :title="article.title"
                    :href="getArticleDetailRoute(article.id)"
                  >
                    <span class="sign">「</span>
                    <span class="title">{{ article.title }}</span>
                    <span class="sign">」</span>
                  </a>
                  <!-- TODO: css -->
                  <span class="sign">-</span>
                  <button
                    class="toggle-link"
                    @click.prevent="handleToggleArticleDescription(article.id)"
                    v-text="article.open ? 'close' : 'open'"
                  />
                </p>
                <template v-if="article.description">
                  <transition name="module">
                    <p v-show="article.open" class="item-description">
                      {{ article.description }}
                    </p>
                  </transition>
                </template>
              </li>
            </ul>
          </template>
        </placeholder>
      </div>
      <div class="module categories">
        <h4 class="title" v-i18n="LANGUAGE_KEYS.CATEGORY_TITLE" />
        <placeholder :data="categories.length">
          <template #placeholder>
            <p v-i18n="LANGUAGE_KEYS.ARTICLE_PLACEHOLDER"></p>
          </template>
          <template #default>
            <ul class="categories-list">
              <li v-for="(category, index) in categories" :key="index" class="item">
                <p class="item-content">
                  <a
                    class="name"
                    target="_blank"
                    :title="category.name"
                    :href="getCategoryArchiveRoute(category.slug)"
                  >
                    <i18n :zh="category.name" :en="category.slug" />
                  </a>
                  <span>（{{ category.count || 0 }}）</span>
                  <!-- TODO: css -->
                  <span class="sign">-</span>
                  <span>{{ category.description }}</span>
                </p>
              </li>
            </ul>
          </template>
        </placeholder>
      </div>
      <div class="module tags">
        <h4 class="title" v-i18n="LANGUAGE_KEYS.TAG_TITLE" />
        <placeholder :data="tags.length">
          <template #placeholder>
            <p v-i18n="LANGUAGE_KEYS.ARTICLE_PLACEHOLDER"></p>
          </template>
          <template #default>
            <ul vclass="tag-list">
              <li v-for="(tag, index) in tags" :key="index" class="item">
                <a
                  target="_blank"
                  :title="tag.description"
                  :href="getTagArchiveRoute(tag.slug)"
                >
                  <i18n :zh="tag.name" :en="tag.slug" />
                </a>
                <span>（{{ tag.count || 0 }}）</span>
              </li>
            </ul>
          </template>
        </placeholder>
      </div>
      <div class="module pages">
        <h4 class="title" v-i18n="LANGUAGE_KEYS.PAGE_TITLE" />
        <ul class="page-list">
          <li class="item">
            <a
              href="/"
              target="_blank"
              v-i18n="LANGUAGE_KEYS.PAGE_HOME"
            />
          </li>
          <li class="item">
            <a
              href="/about"
              target="_blank"
              v-i18n="LANGUAGE_KEYS.PAGE_ABOUT"
            />
          </li>
          <li class="item">
            <a
              href="/lens"
              target="_blank"
              v-i18n="LANGUAGE_KEYS.PAGE_LENS"
            />
          </li>
          <li class="item">
            <a
              target="_blank"
              rel="external nofollow noopener"
              :href="APP_CONFIG.LINKS.project"
              v-i18n="LANGUAGE_KEYS.PAGE_PROJECT"
            />
          </li>
          <li class="item">
            <a
              href="/service"
              target="_blank"
              v-i18n="LANGUAGE_KEYS.PAGE_SERVICE"
            />
          </li>
          <li class="item">
            <a
              href="/guestbook"
              target="_blank"
              v-i18n="LANGUAGE_KEYS.PAGE_GUESTBOOK"
            />
          </li>
          <li class="item">
            <a
              href="/sitemap.xml"
              target="_blank"
              v-i18n="LANGUAGE_KEYS.PAGE_ARCHIVE"
            />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'
  import { useEnhancer } from '/@/enhancer'
  import { RouteName } from '/@/router'
  import { LANGUAGE_KEYS } from '/@/language/key'
  import { getTagArchiveRoute, getCategoryArchiveRoute, getArticleDetailRoute, getPageRoute } from '/@/transforms/route'
  import * as APP_CONFIG from '/@/config/app.config'

  export default defineComponent({
    name: 'Archive',
    // head() {
    //   return {
    //     title: `${this.isEnLang ? '' : this.$i18n.nav.map + ' | '}Archive`
    //   }
    // },
    // fetch({ store }) {
    //   return store.dispatch('sitemap/fetchArticles', { per_page: 666 })
    // },
    setup() {
      const { store, isMobile } = useEnhancer()
      const tags = computed(() => store.state.tag.data)
      const categories = computed(() => store.state.category.data)
      const articles = computed(() => store.state.sitemap.articles.data)

      const handleToggleArticleDescription = (articleId: number) => {
        // store.commit('sitemap/updateArticleOpenState', index)
      }

      return {
        LANGUAGE_KEYS,
        APP_CONFIG,
        RouteName,
        getPageRoute,
        getTagArchiveRoute,
        getCategoryArchiveRoute,
        getArticleDetailRoute,
        isMobile,
        handleToggleArticleDescription,
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/assets/styles/init.scss';

  .archive-page {
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

    .archive {
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
