<template>
  <div class="archive-page" :class="{ mobile: isMobile }">
    <responsive>
      <template #desktop>
        <page-banner :blur="false" :position="75" image="/images/page-archive/banner.jpg">
          <template #title><i18n v-bind="i18ns.title" /></template>
          <template #description><i18n v-bind="i18ns.description" /></template>
        </page-banner>
      </template>
      <template #mobile>
        <page-banner
          :position="70"
          :blur="false"
          :is-mobile="true"
          image="/images/page-archive/banner.jpg"
        >
          <template #title><i18n :k="LanguageKey.PAGE_ARCHIVE" /></template>
          <template #description><i18n v-bind="i18ns.title" /></template>
        </page-banner>
      </template>
    </responsive>
    <div class="page-content">
      <div class="statistic-warpper">
        <div class="container">
          <transition name="module" mode="out-in">
            <div class="skeletons" v-if="statisticFetching">
              <responsive>
                <template #desktop>
                  <skeleton-base class="skeleton" :key="s" v-for="s in statistics.length" />
                </template>
                <template #mobile>
                  <skeleton-base class="skeleton" />
                </template>
              </responsive>
            </div>
            <div class="statistics" v-else>
              <div class="item" :key="index" v-for="(s, index) in statistics">
                <p class="title">
                  <span class="text">{{ s.title }}</span>
                  <i class="iconfont" :class="s.icon"></i>
                </p>
                <div class="content">{{ s.content }}</div>
              </div>
            </div>
          </transition>
        </div>
      </div>
      <div class="archive-warpper">
        <div class="container">
          <placeholder
            :data="archiveStore.archive?.articles.length"
            :loading="archiveStore.fetching"
          >
            <template #placeholder>
              <empty class="archive-empty" key="empty">
                <i18n :k="LanguageKey.ARTICLE_PLACEHOLDER" />
              </empty>
            </template>
            <template #loading>
              <ul class="archive-skeleton" key="skeleton">
                <li v-for="item in 3" :key="item" class="item">
                  <skeleton-line v-for="i in 3" :key="i" class="line" />
                </li>
              </ul>
            </template>
            <template #default>
              <div class="archive-content" key="content">
                <ul class="month-list" v-for="node in archiveStore.tree" :key="node.year">
                  <li v-for="mn in node.months" :key="mn.month" class="month">
                    <h1 class="archive-title" :level="1">
                      <i18n>
                        <template #zh>
                          {{ numberToChinese(node.year) }}<span class="dot">•</span
                          >{{ getMonthNameI18n(mn.month).zh }}（{{ mn.articles.length }}）
                        </template>
                        <template #en>
                          {{ node.year }} #{{ getMonthNameI18n(mn.month).en }} ({{
                            mn.articles.length
                          }})
                        </template>
                      </i18n>
                    </h1>
                    <ul class="article-list">
                      <li v-for="(article, index) in mn.articles" :key="index" class="article">
                        <div class="left">
                          <h3 class="article-title">
                            <span class="date"
                              >D{{ String(article.createAt.day).padStart(2, '0') }}</span
                            >
                            <a
                              class="link"
                              target="_blank"
                              :title="article.title"
                              :href="getArticleDetailRoute(article.id)"
                            >
                              {{ article.title }}
                            </a>
                          </h3>
                          <p class="description" v-html="article.description" />
                        </div>
                        <responsive desktop>
                          <div class="metas">
                            <span class="item views">
                              <i class="iconfont icon-eye"></i>
                              <span class="text">{{ article.meta.views }}</span>
                            </span>
                            <divider type="vertical" />
                            <span class="item likes">
                              <i class="like-icon iconfont icon-like"></i>
                              <span class="text">{{ article.meta.likes }}</span>
                            </span>
                            <divider type="vertical" />
                            <span class="item comments">
                              <i class="iconfont icon-comment"></i>
                              <span class="text">{{ article.meta.comments }}</span>
                            </span>
                          </div>
                        </responsive>
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
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, computed, onMounted } from 'vue'
  import { META } from '/@/config/app.config'
  import { Language, LanguageKey } from '/@/language'
  import { useEnhancer } from '/@/app/enhancer'
  import { useUniversalFetch } from '/@/universal'
  import { useArchiveStore } from '/@/stores/archive'
  import { useStatisticStore } from '/@/stores/statistic'
  import { getArticleDetailRoute } from '/@/transforms/route'
  import { numberToChinese, firstUpperCase, numberSplit } from '/@/transforms/text'
  import { I18nLanguageMap } from '/@/composables/i18n'
  import PageBanner from '/@/components/common/fullpage/banner.vue'

  const ms = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const monthNameI18ns: Array<I18nLanguageMap<Language>> = ms.map((month, index) => ({
    [Language.English]: month,
    [Language.Chinese]:
      index === 9
        ? '十月'
        : index == 10
        ? '十一'
        : index == 11
        ? '十二'
        : numberToChinese(index + 1) + '月'
  }))
  const getMonthNameI18n = (number: number) => {
    return monthNameI18ns[number - 1]
  }

  const i18ns = {
    title: {
      [Language.Chinese]: '万物之中，希望至美',
      [Language.English]: 'Hope is a good thing'
    },
    description: {
      [Language.Chinese]: '至美之物，永不凋零',
      [Language.English]: 'Maybe the best of things and no good thing ever dies'
    }
  }

  export default defineComponent({
    name: 'ArchivePage',
    components: { PageBanner },
    props: { isMobile: Boolean },
    setup() {
      const { i18n, meta, isZhLang } = useEnhancer()
      const archiveStore = useArchiveStore()
      const statisticStore = useStatisticStore()
      const statistics = computed<Array<Record<'icon' | 'title' | 'content', string>>>(() => [
        {
          icon: 'icon-quill',
          title: i18n.t(LanguageKey.STATISTIC_ARTICLES)!,
          content: numberSplit(statisticStore.statistic?.articles || 0)
        },
        {
          icon: 'icon-eye',
          title: i18n.t(LanguageKey.STATISTIC_TODAY_VIEWS)!,
          content: numberSplit(statisticStore.statistic?.todayViews || 0)
        },
        {
          icon: 'icon-comment',
          title: i18n.t(LanguageKey.STATISTIC_COMMENTS)!,
          content: numberSplit(statisticStore.statistic?.comments || 0)
        },
        {
          icon: 'icon-like',
          title: i18n.t(LanguageKey.STATISTIC_TOTAL_UPVOTES)!,
          content: numberSplit(statisticStore.statistic?.totalLikes || 0)
        },
        {
          icon: 'icon-emoji',
          title: i18n.t(LanguageKey.STATISTIC_AVERAGE_EMOTION)!,
          content: String(statisticStore.statistic?.averageEmotion ?? '-')
        }
      ])

      meta(() => {
        const enTitle = firstUpperCase(i18n.t(LanguageKey.PAGE_ARCHIVE, Language.English)!)
        const titles = isZhLang.value ? [i18n.t(LanguageKey.PAGE_ARCHIVE), enTitle] : [enTitle]
        return { pageTitle: titles.join(' | '), description: `${META.title} 数据归档` }
      })

      const statisticFetching = ref(true)
      onMounted(() => {
        statisticStore.fetchStatistic().finally(() => {
          statisticFetching.value = false
        })
      })

      useUniversalFetch(() => archiveStore.fetchArchive())

      return {
        LanguageKey,
        numberToChinese,
        getArticleDetailRoute,
        getMonthNameI18n,
        i18ns,
        archiveStore,
        statisticFetching,
        statistics
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/variables.scss';
  @import 'src/styles/mixins.scss';

  .archive-page {
    &.mobile {
      .statistic-warpper {
        padding: 2rem;
        .skeletons {
          .skeleton {
            width: 100%;
          }
        }
        .statistics {
          flex-wrap: wrap;
          justify-content: space-between;
          margin-bottom: -2rem;
          .item {
            width: 50%;
            margin-bottom: 2rem;
          }
        }
      }
      .archive-warpper {
        margin-top: $lg-gap;
        padding-top: 2rem;
        padding-bottom: 1rem;
        border: none;
        border-radius: $lg-radius;

        .archive-title {
          font-size: $font-size-h2;
        }
        .article-list {
          .article {
            margin-bottom: 2rem;
            padding: 0 3rem;
            .article-title {
              font-size: $font-size-h4;
              max-width: 75vw;
              @include text-overflow();
            }
          }
        }
      }
    }

    .statistic-warpper {
      padding: 3rem 0;
      background-color: $module-bg-lighter;

      .skeletons,
      .statistics {
        display: flex;
        justify-content: space-around;
        align-items: center;
      }

      .skeleton {
        width: 5em;
        height: 2em;
      }

      .item {
        display: inline-flex;
        flex-direction: column;

        .title {
          display: flex;
          align-items: center;
          margin-bottom: 0;

          .text {
            text-transform: uppercase;
            color: $text-secondary;
          }

          .iconfont {
            margin-left: $sm-gap;
            font-size: $font-size-h2;
            color: $text-divider;
            opacity: 0.5;
          }
        }

        .content {
          font-size: $font-size-h1 * 1.3;
          font-weight: bold;
        }
      }
    }

    .archive-warpper {
      padding: 3rem 0;
      border-bottom: 1px solid $module-bg-darker-1;
      background-color: $module-bg;
      overflow: hidden;

      .archive-empty {
        @include radius-box($lg-radius);
        height: $normal-page-active-content-height;
        font-size: $font-size-h1;
        font-weight: bold;
      }

      .archive-skeleton {
        list-style: none;
        margin: 0;
        padding: 0;

        .item {
          width: 100%;
          padding: 2rem;
          margin-bottom: 2rem;
          @include radius-box($lg-radius);
          &:last-child {
            margin-bottom: 0;
          }

          .line {
            height: 2rem;
            margin-bottom: 2rem;
            &:last-child {
              margin-bottom: 0;
            }
          }
        }
      }

      .archive-content {
        margin-top: -2rem;
      }

      .archive-title {
        margin: 2em 0;
        text-align: center;
        text-transform: uppercase;
        letter-spacing: 4px;

        .dot {
          color: $text-divider;
          margin: 0 $sm-gap;
        }
      }

      .month-list,
      .article-list {
        list-style: none;
        margin: 0;
        padding: 0;
      }

      .article-list {
        .article {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: $gap * 3;
          padding-left: $gap * 4;
          padding-right: $gap * 3;

          .left {
            .article-title {
              margin: $gap 0;

              .date {
                display: inline-block;
                width: 2rem;
                margin-right: $gap;
                font-size: $font-size-h4;
                font-weight: normal;
                color: $text-divider;
              }

              .link {
                padding-bottom: $xs-gap;
                border-bottom: 1px solid $text-secondary;
              }
            }

            .description {
              margin-bottom: $gap;
              padding-left: 3rem;
            }
          }

          .metas {
            z-index: 1;
            margin-left: 2rem;
            display: inline-flex;
            align-items: center;
            font-size: $font-size-h4;
            color: $text-disabled;

            .item {
              width: 6rem;
              text-align: center;

              .iconfont {
                margin-right: $sm-gap;
              }
              .text {
                font-weight: bold;
              }
            }
          }
        }
      }
    }
  }
</style>
