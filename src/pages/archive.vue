<template>
  <div class="archive-page" :class="{ mobile: isMobile }">
    <page-banner :position="75" image="/images/page-archive/banner.jpg">
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
              <ul class="year-list">
                <li v-for="yes in articleTree" :key="yes.year" class="year-item">
                  <h3 class="title root">
                    <i class="iconfont icon-peachblossom" />
                    <span class="text">
                      <i18n :zh="replaceToChineseNumber(yes.year)" :en="yes.year" />
                    </span>
                  </h3>
                  <ul class="month-list">
                    <li v-for="mos in yes.months" :key="mos.month" class="month">
                      <h4 class="title">
                        <span class="argyle">
                          <i18n :zh="toChineseMonth(mos.month)" :en="toEngMonth(mos.month)" />
                          <span>&nbsp;~</span>
                        </span>
                      </h4>
                      <ul class="article-list">
                        <li v-for="(article, index) in mos.articles" :key="index" class="article">
                          <h5 class="title">
                            <span class="date"> D{{ article.createAt.day }} </span>
                            <a
                              class="link"
                              target="_blank"
                              :title="article.title"
                              :href="getArticleDetailRoute(article.id)"
                            >
                              {{ article.title }}
                            </a>
                          </h5>
                          <p class="description" v-html="article.description" />
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
              <div class="tag-content">
                <h3 class="title root">
                  <i class="iconfont icon-dragon" />
                  <span class="text">
                    <i18n zh="分门别类" en="Tags" />
                  </span>
                </h3>
                <ul class="tag-list">
                  <li v-for="(tag, index) in archiveStore.data?.tags" :key="index" class="tag">
                    <h5 class="content">
                      <a
                        target="_blank"
                        class="link"
                        :title="tag.description"
                        :href="getTagArchiveRoute(tag.slug)"
                      >
                        <i18n :zh="tag.name" :en="tag.slug" />
                      </a>
                      <span class="count">({{ tag.count || 0 }})</span>
                    </h5>
                    <p class="description">{{ tag.description }}</p>
                  </li>
                </ul>
              </div>
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
  import { useArchiveStore } from '/@/store/archive'
  import { useEnhancer } from '/@/app/enhancer'
  import { useUniversalFetch } from '/@/universal'
  import { Language } from '/@/language/data'
  import { LANGUAGE_KEYS } from '/@/language/key'
  import { dateToHuman } from '/@/transforms/moment'
  import { getTagArchiveRoute, getArticleDetailRoute } from '/@/transforms/route'
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
    setup() {
      const { i18n, meta, isMobile, isZhLang } = useEnhancer()
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
            articles: Array<any>
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

      useUniversalFetch(() => archiveStore.fetchArchive())

      return {
        LANGUAGE_KEYS,
        getTagArchiveRoute,
        getArticleDetailRoute,
        replaceToChineseNumber,
        toChineseMonth,
        toEngMonth,
        isMobile,
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
    .archive-content {
      margin-top: $gap * 2;
      min-height: $normal-page-active-content-height / 2;

      .archive-empty {
        @include common-bg-module();
        @include radius-box($lg-radius);
        height: $normal-page-active-content-height / 2;
        font-size: $font-size-h1;
        font-weight: bold;
      }

      .archive-skeleton {
        @include common-bg-module();
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

        .year-item,
        .tag-content {
          margin-top: 0;
          margin-bottom: $gap * 2;
          padding: $lg-gap 3rem;
          overflow: hidden;
          @include common-bg-module();
          @include radius-box($lg-radius);
        }

        .link {
          border-bottom: 1px solid;
          font-weight: bold;
        }

        .title {
          color: $text-secondary;
          &.root {
            font-weight: bold;
            margin-bottom: $lg-gap * 2;
          }

          > .text {
            margin-left: $xs-gap;
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
          list-style: tibetan;
        }

        .article-list {
          list-style: none;
          padding-left: $gap;

          .article {
            padding: $gap;
            border-radius: $xs-radius;
            &:hover {
              background-color: $module-bg-darker-1;
            }

            .title {
              margin-bottom: $gap;

              .date {
                display: inline-block;
                color: $text-disabled;
                font-size: $font-size-h5;
                width: 2rem;
                margin-right: $sm-gap;
              }
            }

            .description {
              margin-bottom: 0;
              color: $text-secondary;
              font-size: $font-size-small;
              padding-left: 2.6em;
            }
          }
        }

        .tag-list {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-row-gap: $gap * 2;
          overflow: hidden;
          list-style: square;
          margin: 0;
          margin-bottom: $lg-gap;

          .tag {
            .content {
              margin-bottom: $gap;
              .count {
                color: $text-disabled;
                font-size: $font-size-h5;
                margin-left: $sm-gap;
              }
            }

            .description {
              display: inline-block;
              width: 80%;
              margin-bottom: 0;
              color: $text-secondary;
              font-size: $font-size-small;
              @include text-overflow();
            }
          }
        }
      }

      &.mobile {
        padding: $lg-gap;

        .content-warpper {
          padding: 0;
        }

        .tag-list {
          .tag {
            width: 50%;
          }
        }

        .month-list {
          padding-left: 2rem;

          .article-list {
            padding-left: 0;

            .article {
              .title {
                @include text-overflow();
              }
            }
          }
        }
      }
    }
  }
</style>
