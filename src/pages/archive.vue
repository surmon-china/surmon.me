<template>
  <div class="archive-page" :class="{ mobile: isMobile }">
    <placeholder
      :data="hasArticle && tags.length"
      :loading="isFetching"
    >
      <template #placeholder>
        <empty class="archive-empty" key="empty">
          <i18n :lkey="LANGUAGE_KEYS.ARTICLE_PLACEHOLDER" />
        </empty>
      </template>
      <template #loading>
        <ul class="archive-skeleton" key="skeleton">
          <li v-for="item in 5" :key="item" class="item">
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
            <li
              v-for="yes in articleTree"
              :key="yes.year"
              class="year"
            >
              <h4 class="title root">
                <i class="iconfont icon-china-symble" />
                <span class="text">
                  <i18n
                    :zh="replaceToChineseNumber(yes.year, true)"
                    :en="yes.year"
                  />
                </span>
              </h4>
              <ul class="month-list">
                <li
                  v-for="mos in yes.months"
                  :key="mos.month"
                  class="month"
                >
                  <h5 class="title">
                    <span class="argyle">
                      <i18n
                        :zh="toChineseMonth(mos.month)"
                        :en="toEngMonth(mos.month)"
                      />
                      <span>&nbsp;~</span>
                    </span>
                  </h5>
                  <ul class="article-list">
                    <li v-for="(article, index) in mos.articles" :key="index" class="article">
                      <p class="title">
                        <span class="date">
                          D{{ article.createAt.day }}
                        </span>
                        <a
                          class="link"
                          target="_blank"
                          :title="article.title"
                          :href="getArticleDetailRoute(article.id)"
                        >
                          {{ article.title }}
                        </a>
                      </p>
                      <p class="description" v-html="article.description" />
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
          <h4 class="title root">
            <i class="iconfont icon-dragon" />
            <span class="text">
              <i18n :lkey="LANGUAGE_KEYS.TAG_TITLE" />
            </span>
          </h4>
          <ul class="tag-list">
            <li v-for="(tag, index) in tags" :key="index" class="tag">
              <p class="content">
                <a
                  target="_blank"
                  class="link"
                  :title="tag.description"
                  :href="getTagArchiveRoute(tag.slug)"
                >
                  <i18n :zh="tag.name" :en="tag.slug" />
                </a>
                <span class="count">({{ tag.count || 0 }})</span>
              </p>
              <p class="description">{{ tag.description }}</p>
            </li>
          </ul>
        </div>
      </template>
    </placeholder>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'
  import { getNamespace, Modules } from '/@/store'
  import { ArchiveModuleActions } from '/@/store/archive'
  import { TagModuleActions } from '/@/store/tag'
  import { CategoryModuleActions } from '/@/store/category'
  import { useEnhancer } from '/@/enhancer'
  import { prefetch } from '/@/universal'
  import { RouteName } from '/@/router'
  import { getTagArchiveRoute, getCategoryArchiveRoute, getArticleDetailRoute, getPageRoute } from '/@/transforms/route'
  import { LANGUAGE_KEYS } from '/@/language/key'
  import { dateToHuman } from '/@/transforms/moment'
  import { replaceToChineseNumber, toChineseMonth, toEngMonth } from '/@/transforms/text'
  import * as APP_CONFIG from '/@/config/app.config'

  export default defineComponent({
    name: 'Archive',
    setup() {
      const { i18n, store, helmet, isMobile, isZhLang } = useEnhancer()
      const tags = computed(() => store.state.tag.data)
      const hasArticle = computed(() => store.state.archive.articles.data.length)
      const isFetching = computed(() => (
        store.state.archive.articles.fetching || store.state.tag.fetching
      ))

      helmet(() => {
        const prefix = isZhLang.value
          ? `${i18n.t(LANGUAGE_KEYS.PAGE_ARCHIVE)} | `
          : ''
        return { title: prefix + 'Archive' }
      })

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

      const fetchAllData = () => Promise.all([
        store.dispatch(getNamespace(
          Modules.Tag,
          TagModuleActions.FetchAll
        )),
        store.dispatch(getNamespace(
          Modules.Archive,
          ArchiveModuleActions.FetchArticles
        ))
      ])

      const resultData = {
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
        hasArticle,
        isFetching
      }

      return prefetch(fetchAllData, resultData)
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/assets/styles/init.scss';

  .archive-page {
    min-height: $normal-page-active-content-height;
    overflow: hidden;
    @include common-bg-module();
    @include radius-box($lg-radius);

    .archive-empty {
      height: $normal-page-active-content-height;
      font-size: $font-size-h1;
      font-weight: bold;
    }

    .archive-skeleton {
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
      padding: $lg-gap 3rem;
      text-transform: capitalize;
      font-size: 1em;

      .link {
        border-bottom: 1px solid;
        font-size: $font-size-h5;
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

      .tag-list {
        display: flex;
        flex-wrap: wrap;
        overflow: hidden;
        list-style: square;
        margin: 0;
        margin-bottom: $xs-gap;

        .tag {
          width: 25%;
          margin-bottom: 2rem;

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

      .year-list {
        padding-left: 0;
        list-style: none;
        margin-bottom: $lg-gap * 2;
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
</style>
