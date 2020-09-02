<template>
  <div class="archive-page" :class="{ mobile: isMobile }">
    <div class="archive">
      <div class="module articles">
        <h3 class="title" v-i18n="LANGUAGE_KEYS.ARTICLE_TITLE" />
        <hr>
        <placeholder :data="hasArticle">
          <template #placeholder>
            <p v-i18n="LANGUAGE_KEYS.ARTICLE_PLACEHOLDER"></p>
          </template>
          <template #default>
            <ul class="year-list">
              <li
                v-for="yes in articleTree"
                :key="yes.year"
                class="year"
              >
                <h3 class="title">
                  <i18n
                    :zh="replaceToChineseNumber(yes.year)"
                    :en="yes.year"
                  />
                </h3>
                <ul class="month-list">
                  <li
                    v-for="mos in yes.months"
                    :key="mos.month"
                    class="month"
                  >
                    <h4 class="title">
                      <i18n
                        :zh="toChineseMonth(mos.month)"
                        :en="toEngMonth(mos.month)"
                      />
                    </h4>
                    <ul class="article-list">
                      <li v-for="(article, index) in mos.articles" :key="index" class="item">
                        <p class="item-content">
                          <a
                            class="link"
                            target="_blank"
                            :title="article.title"
                            :href="getArticleDetailRoute(article.id)"
                          >
                            {{ article.title }}
                          </a>
                        </p>
                        <!-- <p v-if="article.description" class="item-description">
                          {{ article.description }}
                        </p> -->
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </template>
        </placeholder>
      </div>
      <div class="module tags">
        <h3 class="title" v-i18n="LANGUAGE_KEYS.TAG_TITLE" />
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
        <h3 class="title" v-i18n="LANGUAGE_KEYS.PAGE_TITLE" />
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
  import { getNamespace, Modules } from '/@/store'
  import { ArchiveModuleActions } from '/@/store/archive'
  import { TagModuleActions } from '/@/store/tag'
  import { CategoryModuleActions } from '/@/store/category'
  import { useEnhancer } from '/@/enhancer'
  import { RouteName } from '/@/router'
  import { getTagArchiveRoute, getCategoryArchiveRoute, getArticleDetailRoute, getPageRoute } from '/@/transforms/route'
  import { LANGUAGE_KEYS } from '/@/language/key'
  import { dateToHuman } from '/@/transforms/moment'
  import { replaceToChineseNumber, toChineseMonth, toEngMonth } from '/@/transforms/text'
  import * as APP_CONFIG from '/@/config/app.config'

  export default defineComponent({
    name: 'Archive',
    // head() {
    //   return {
    //     title: `${this.isEnLang ? '' : this.$i18n.nav.map + ' | '}Archive`
    //   }
    // },
    async setup() {
      const { store, isMobile } = useEnhancer()
      const tags = computed(() => store.state.tag.data)
      const hasArticle = computed(() => store.state.archive.articles.data.length)
      const articleTree = computed(() => {
        const rootTree = [] as Array<{
          year: number
          months: Array<{
            month: number
            articles: Array<any>
          }>
        }>
        store.state.archive.articles.data
          .map(article => ({ ...article, createAt: dateToHuman(new Date(article.create_at)) }))
          .sort((a, b) => Number(`${a.year}${a.month}${a.day}`) - Number(`${b.year}${b.month}${b.day}`))
          .forEach(article => {
            const { createAt } = article
            // year
            const yearTree = rootTree.find(ye => ye.year === createAt.year)
            let targetYear = yearTree
            if (!targetYear) {
              targetYear = { year: createAt.year, months: [] }
              rootTree.push(targetYear)
            }
            // month
            const monthTree = targetYear.months.find(mo => mo.month === createAt.month)
            let targetMonth = monthTree
            if (!targetMonth) {
              targetMonth = { month: createAt.month, articles: [] }
              targetYear.months.push(targetMonth)
            }
            // article
            targetMonth.articles.push(article)
          })
        return rootTree
      })

      await Promise.all([
        store.dispatch(getNamespace(
          Modules.Tag,
          TagModuleActions.FetchAll
        )),
        store.dispatch(getNamespace(
          Modules.Archive,
          ArchiveModuleActions.FetchArticles
        ))
      ])

      return {
        LANGUAGE_KEYS,
        APP_CONFIG,
        RouteName,
        getPageRoute,
        getTagArchiveRoute,
        getCategoryArchiveRoute,
        getArticleDetailRoute,
        replaceToChineseNumber,
        toChineseMonth,
        toEngMonth,
        isMobile,
        tags,
        articleTree,
        hasArticle
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/assets/styles/init.scss';

  $border-guide: 1px solid;

  .archive-page {
    padding: $gap 3rem;
    overflow: hidden;
    @include common-bg-module();
    @include radius-box($lg-radius);

    .archive {
      text-transform: capitalize;

      a {
        border-bottom: $border-guide;
      }

      .module {
        margin-bottom: $lg-gap * 2;
        font-size: 1em;

        .title {
          font-weight: bold;
          text-transform: capitalize;
        }
      }

      .year-list,
      .month-list {
        .title {
          color: $text-secondary;
        }
      }
      .year-list {
        list-style: none;
      }
      .month-list {
        list-style: disc;
      }

      .articles {
        .article-list {
          list-style: square;

          > .item {
            > .item-content {
              margin-bottom: 1.2em;

              > .link {
                border-bottom: 1px solid;
                border-bottom: $border-guide;
                font-size: $font-size-h5;
                font-weight: bold;
              }
            }

            > .item-description {
              font-size: $font-size-h6;
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
            }

            > .item-description {
              margin-top: -$gap;
            }
          }
        }
      }
    }
  }
</style>
