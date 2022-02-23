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
          :data="archiveStore.archive?.articles.length && archiveStore.archive?.tags.length"
          :loading="isFetching"
        >
          <template #placeholder>
            <empty class="archive-empty" key="empty">
              <i18n :k="LanguageKey.ARTICLE_PLACEHOLDER" />
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
              <page-title class="root-title" :level="1" v-if="archiveStore.statistic">
                <span class="text">
                  <i18n zh="万象星盘" en="Statistic" />
                </span>
              </page-title>
              <div class="statistic" v-if="archiveStore.statistic">
                <div class="item" :key="index" v-for="(s, index) in statistics">
                  <p class="title">
                    <i class="iconfont" :class="s.icon" v-if="!isMobile"></i>
                    <span class="text">{{ s.title }}</span>
                  </p>
                  <span class="content">{{ s.content }}</span>
                </div>
              </div>
              <ul class="year-list">
                <li v-for="node in articleTree" :key="node.year" class="year-item">
                  <page-title class="root-title" :level="1">
                    <span class="text">
                      <i18n :zh="numberToChinese(node.year)" :en="node.year" />
                    </span>
                  </page-title>
                  <ul class="month-list">
                    <li v-for="mn in node.months" :key="mn.month" class="month">
                      <h4 class="month-title">
                        <span class="text">
                          <i18n v-bind="getMonthNameI18n(mn.month)" />
                        </span>
                      </h4>
                      <ul class="article-list">
                        <li v-for="(article, index) in mn.articles" :key="index" class="article">
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
  import { Language, LanguageKey } from '/@/language'
  import { useUniversalFetch } from '/@/universal'
  import { useEnhancer } from '/@/app/enhancer'
  import { useArchiveStore } from '/@/stores/archive'
  import { I18nLanguageMap } from '/@/services/i18n'
  import { getArticleDetailRoute } from '/@/transforms/route'
  import { numberToChinese, firstUpperCase, numberToKilo, numberSplit } from '/@/transforms/text'
  import PageBanner from '/@/components/common/fullpage/banner.vue'
  import PageTitle from '/@/components/common/fullpage/title.vue'

  export default defineComponent({
    name: 'ArchivePage',
    components: {
      PageBanner,
      PageTitle
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
      const articleTree = computed(() => archiveStore.tree)
      const isFetching = computed(() => archiveStore.fetching)
      const statistics = computed(() => [
        {
          title: 'Articles',
          content: numberSplit(archiveStore.statistic?.articles || 0),
          icon: 'icon-quill'
        },
        {
          title: 'Total upvotes',
          content: numberSplit(archiveStore.statistic?.totalLikes || 0),
          icon: 'icon-heart'
        },
        {
          title: 'Today Views · Total',
          content: `${archiveStore.statistic?.todayViews} · ${numberToKilo(
            archiveStore.statistic?.totalViews || 0
          )}`,
          icon: 'icon-eye'
        },
        {
          title: 'Comments',
          content: numberSplit(archiveStore.statistic?.comments || 0),
          icon: 'icon-comment'
        },
        {
          title: 'Tags',
          content: archiveStore.statistic?.tags,
          icon: 'icon-tag'
        }
      ])

      const monthNameI18ns: Array<I18nLanguageMap<Language>> = [
        {
          [Language.Chinese]: '首阳',
          [Language.English]: 'January'
        },
        {
          [Language.Chinese]: '绀香',
          [Language.English]: 'February'
        },
        {
          [Language.Chinese]: '莺时',
          [Language.English]: 'March'
        },
        {
          [Language.Chinese]: '槐序',
          [Language.English]: 'April'
        },
        {
          [Language.Chinese]: '鸣蜩',
          [Language.English]: 'May'
        },
        {
          [Language.Chinese]: '季夏',
          [Language.English]: 'June'
        },
        {
          [Language.Chinese]: '兰秋',
          [Language.English]: 'July'
        },
        {
          [Language.Chinese]: '南宫',
          [Language.English]: 'August'
        },
        {
          [Language.Chinese]: '菊月',
          [Language.English]: 'September'
        },
        {
          [Language.Chinese]: '子春',
          [Language.English]: 'October'
        },
        {
          [Language.Chinese]: '葭月',
          [Language.English]: 'November'
        },
        {
          [Language.Chinese]: '季冬',
          [Language.English]: 'December'
        }
      ]

      const getMonthNameI18n = (number: number) => {
        return monthNameI18ns[number - 1]
      }

      meta(() => {
        const enTitle = firstUpperCase(i18n.t(LanguageKey.PAGE_ARCHIVE, Language.English)!)
        const titles = isZhLang.value ? [i18n.t(LanguageKey.PAGE_ARCHIVE), enTitle] : [enTitle]
        return { pageTitle: titles.join(' | '), description: `${META.title} 数据归档` }
      })

      useUniversalFetch(() =>
        Promise.all([archiveStore.fetchArchive(), archiveStore.fetchStatistic()])
      )

      return {
        LanguageKey,
        numberToChinese,
        getArticleDetailRoute,
        getMonthNameI18n,
        statistics,
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
          align-items: center;
        }
      }
    }

    .archive-content {
      margin-top: 2rem;
      margin-bottom: 3rem;
      min-height: $normal-page-active-content-height;

      .archive-empty {
        @include radius-box($lg-radius);
        height: $normal-page-active-content-height;
        font-size: $font-size-h1;
        font-weight: bold;
      }

      .archive-skeleton {
        list-style: none;
        padding: 3rem;
        background-color: $module-bg;
        @include radius-box($lg-radius);

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
        font-size: 1em;

        .statistic {
          display: flex;
          justify-content: space-around;
          align-items: center;
          margin-top: 3rem;
          margin-bottom: 4rem;

          .item {
            display: inline-flex;
            flex-direction: column;

            .title {
              text-transform: uppercase;
              margin-bottom: 0;
              color: $text-disabled;

              .iconfont {
                margin-right: $xs-gap;
                color: $text-divider;
              }
            }

            .content {
              font-size: $font-size-h1 * 1.4;
              font-weight: bold;
            }
          }
        }

        .year-item {
          margin: 0;
          overflow: hidden;
        }

        .root-title {
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
          list-style: circle;

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
