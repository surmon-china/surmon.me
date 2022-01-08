<template>
  <div class="archive-page" :class="{ mobile: isMobile }">
    <page-banner
      :blur="false"
      :position="75"
      :is-mobile="isMobile"
      image="/images/page-archive/banner.jpg"
    >
      <template #title>
        <i18n zh="万物之中，希望至美" en="Hope is a good thing" />
      </template>
      <template #description>
        <i18n zh="至美之物，永不凋零" en="Maybe the best of things and no good thing ever dies" />
      </template>
    </page-banner>
    <div class="container">
      <div class="archive-content">
        <placeholder
          :data="archiveStore.data?.articles.length && archiveStore.data?.tags.length"
          :loading="isFetching"
        >
          <template #placeholder>
            <empty class="archive-empty" key="empty">
              <i18n :lkey="LANGUAGE_KEYS.ARTICLE_PLACEHOLDER" />
            </empty>
          </template>
          <template #loading>
            <ul class="archive-skeleton" key="skeleton">
              <li v-for="item in 4" :key="item" class="item">
                <div class="content">
                  <div class="title">
                    <skeleton-line />
                  </div>
                  <div class="description">
                    <skeleton-paragraph :lines="6" />
                  </div>
                </div>
              </li>
            </ul>
          </template>
          <template #default>
            <div class="content-warpper" key="content">
              <h2 class="root-title">
                <span class="text">
                  <i18n zh="万象星盘" en="Statistic" />
                </span>
              </h2>
              <div class="statistic">
                <span class="item">
                  <span class="count">{{ archiveStore.statistic?.articles }}</span>
                  <divider class="divider" type="vertical" />
                  <span class="kind">
                    <i class="iconfont icon-coffee"></i>
                    <span class="text">Articles</span>
                  </span>
                </span>
                <span class="item">
                  <span class="count">{{ archiveStore.statistic?.tags }}</span>
                  <divider class="divider" type="vertical" />
                  <span class="kind">
                    <i class="iconfont icon-tag"></i>
                    <span class="text">Tags</span>
                  </span>
                </span>
                <span class="item">
                  <span class="count">{{ archiveStore.statistic?.comments }}</span>
                  <divider class="divider" type="vertical" />
                  <span class="kind">
                    <i class="iconfont icon-comment"></i>
                    <span class="text">Comments</span>
                  </span>
                </span>
                <span class="item">
                  <span class="count">{{ archiveStore.statistic?.views }}</span>
                  <divider class="divider" type="vertical" />
                  <span class="kind">
                    <i class="iconfont icon-eye"></i>
                    <span class="text">Today views</span>
                  </span>
                </span>
              </div>
              <ul class="year-list">
                <li v-for="yes in articleTree" :key="yes.year" class="year-item">
                  <h2 class="root-title">
                    <span class="text">
                      <i18n :zh="replaceToChineseNumber(yes.year)" :en="yes.year" />
                    </span>
                  </h2>
                  <ul class="month-list">
                    <li v-for="mos in yes.months" :key="mos.month" class="month">
                      <h4 class="month-title">
                        <span class="text">
                          <i18n :zh="toChineseMonth(mos.month)" :en="toEngMonth(mos.month)" />
                        </span>
                      </h4>
                      <ul class="article-list">
                        <li v-for="(article, index) in mos.articles" :key="index" class="article">
                          <div class="left">
                            <h4 class="article-title">
                              <span class="date"> D{{ article.createAt.day }} </span>
                              <a
                                class="link"
                                target="_blank"
                                :title="article.title"
                                :href="getArticleDetailRoute(article.id)"
                              >
                                {{ article.title }}
                              </a>
                            </h4>
                            <p class="description" v-html="article.description" />
                          </div>
                          <div class="metas" v-if="!isMobile">
                            <span class="item views">
                              <i class="iconfont icon-eye"></i>
                              <span>{{ article.meta.views }}</span>
                            </span>
                            <divider type="vertical" />
                            <span class="item likes">
                              <i class="like-icon iconfont icon-like"></i>
                              <span>{{ article.meta.likes }}</span>
                            </span>
                            <divider type="vertical" />
                            <span class="item comments">
                              <i class="iconfont icon-comment"></i>
                              <span>{{ article.meta.comments }}</span>
                            </span>
                          </div>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </template>
        </placeholder>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'
  import { META } from '/@/config/app.config'
  import { Article } from '/@/store/article'
  import { useArchiveStore } from '/@/store/archive'
  import { useEnhancer } from '/@/app/enhancer'
  import { useUniversalFetch } from '/@/universal'
  import { Language } from '/@/language/data'
  import { LANGUAGE_KEYS } from '/@/language/key'
  import { dateToHuman, HumanDate } from '/@/transforms/moment'
  import { getArticleDetailRoute } from '/@/transforms/route'
  import {
    replaceToChineseNumber,
    toChineseMonth,
    toEngMonth,
    firstUpperCase
  } from '/@/transforms/text'
  import PageBanner from '/@/components/common/banner.vue'

  export default defineComponent({
    name: 'ArchivePage',
    components: {
      PageBanner
    },
    props: {
      isMobile: {
        type: Boolean,
        default: false
      }
    },
    setup() {
      const { i18n, meta, isZhLang } = useEnhancer()
      const archiveStore = useArchiveStore()
      const isFetching = computed(() => archiveStore.fetching)

      meta(() => {
        const enTitle = firstUpperCase(i18n.t(LANGUAGE_KEYS.PAGE_ARCHIVE, Language.En)!)
        const titles = isZhLang.value ? [i18n.t(LANGUAGE_KEYS.PAGE_ARCHIVE), enTitle] : [enTitle]
        return { pageTitle: titles.join(' | '), description: `${META.title} 数据归档` }
      })

      const articleTree = computed(() => {
        const rootTree = [] as Array<{
          year: number
          months: Array<{
            month: number
            articles: Array<Article & { createAt: HumanDate }>
          }>
        }>

        archiveStore.data?.articles
          .map((article) => ({
            ...article,
            createAt: dateToHuman(new Date(article.create_at))
          }))
          .sort(({ create_at: a }, { create_at: b }) => {
            return Date.parse(b) - Date.parse(a)
          })
          .forEach((article) => {
            const { createAt } = article
            // year
            const yearTree = rootTree.find((ye) => ye.year === createAt.year)
            let targetYear = yearTree
            if (!targetYear) {
              targetYear = { year: createAt.year, months: [] }
              rootTree.push(targetYear)
            }
            // month
            const monthTree = targetYear.months.find((mo) => mo.month === createAt.month)
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

      useUniversalFetch(() =>
        Promise.all([archiveStore.fetchArchive(), archiveStore.fetchStatistic()])
      )

      return {
        LANGUAGE_KEYS,
        getArticleDetailRoute,
        replaceToChineseNumber,
        toChineseMonth,
        toEngMonth,
        archiveStore,
        articleTree,
        isFetching
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/init.scss';

  .archive-page {
    &.mobile {
      .statistic {
        flex-wrap: wrap;
        margin-bottom: 2rem !important;

        .item {
          width: 100%;
          margin-bottom: $gap;

          .count {
            font-size: $font-size-h3 * 2 !important;
            width: 46%;
          }
        }
      }
    }

    .archive-content {
      margin-top: $gap * 2;
      min-height: $normal-page-active-content-height / 2;

      .archive-empty {
        @include radius-box($lg-radius);
        height: $normal-page-active-content-height / 2;
        font-size: $font-size-h1;
        font-weight: bold;
      }

      .archive-skeleton {
        @include radius-box($lg-radius);
        list-style: none;
        padding: 3rem;

        .item {
          width: 100%;
          margin-bottom: 2rem;
          &:last-child {
            margin-bottom: 0;
          }

          .content {
            .title {
              width: 8rem;
              height: 2rem;
              margin-bottom: $gap;
            }
          }
        }
      }

      .content-warpper {
        text-transform: capitalize;
        font-size: 1em;

        .statistic {
          display: flex;
          justify-content: space-around;
          align-items: center;
          margin-top: 3rem;
          margin-bottom: 4rem;

          .item {
            display: inline-flex;
            align-items: center;
            $count-size: $font-size-h2 * 2;

            .count {
              min-width: 6rem;
              text-align: right;
              font-weight: bold;
              font-size: $count-size;
            }

            .divider {
              font-size: $count-size;
            }

            .kind {
              display: inline-flex;
              flex-direction: column;
              color: $text-divider;

              .iconfont {
                font-size: $font-size-h3;
              }

              .text {
                text-transform: uppercase;
              }
            }
          }
        }

        .year-item {
          margin-top: 0;
          margin-bottom: $gap * 2;
          overflow: hidden;
        }

        .root-title {
          margin-bottom: $lg-gap * 3;
          text-align: center;
          color: $text-secondary;
          font-weight: bold;

          .text {
            padding-bottom: $xs-gap;
            border-bottom: 1px solid;
          }
        }

        .year-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .month-list {
          padding-left: 2em;
          list-style: tibetan;

          .month-title {
            .text {
              color: $text-disabled;
            }
          }
        }

        .article-list {
          list-style: none;
          padding-left: $gap;

          .article {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: $gap;
            padding-left: $gap * 2;
            margin-bottom: $xs-gap;
            border-left: 4px dotted $text-divider;

            .left {
              .article-title {
                margin: $gap 0;

                .date {
                  display: inline-block;
                  width: 2rem;
                  margin-right: $sm-gap;
                  font-size: $font-size-h5;
                  color: $text-disabled;
                }

                .link {
                  padding-bottom: $xs-gap;
                  border-bottom: 1px solid $text-secondary;
                }
              }

              .description {
                margin-bottom: $gap;
                padding-left: 2.2em;
              }
            }

            .metas {
              z-index: 1;
              margin-left: 2rem;
              display: inline-flex;
              flex-shrink: 0;
              align-items: center;
              font-size: $font-size-h4;
              color: $text-disabled;

              .item {
                width: 6rem;
                text-align: center;

                .iconfont {
                  margin-right: $sm-gap;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
