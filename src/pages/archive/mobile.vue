<script lang="ts" setup>
  import { ref, onMounted } from 'vue'
  import { useUniversalFetch } from '/@/app/universal'
  import { useArchiveStore } from '/@/stores/archive'
  import { LocalesKey } from '/@/locales'
  import { numberToChinese } from '/@/transforms/text'
  import { getArticleDetailRoute } from '/@/transforms/route'
  import MobileBanner from '/@/components/mobile/widgets/page-banner.vue'
  import ArchiveTree from './tree.vue'
  import { bannerI18ns, getMonthNameI18n, useArchivePageMeta, useArchivePageStatistics } from './shared'

  const archiveStore = useArchiveStore()
  const statisticState = useArchivePageStatistics()
  const statisticFetching = ref(true)

  useArchivePageMeta()
  useUniversalFetch(() => archiveStore.fetch())
  onMounted(() => {
    statisticState.fetch().finally(() => {
      statisticFetching.value = false
    })
  })
</script>

<template>
  <div class="archive-page">
    <mobile-banner background-image="/images/page-archive/banner-mobile.webp" :background-image-y="80" cdn>
      <template #title>
        <webfont bolder><i18n :k="LocalesKey.PAGE_ARCHIVE" /></webfont>
      </template>
      <template #description>
        <webfont><i18n v-bind="bannerI18ns.title" /></webfont>
      </template>
    </mobile-banner>
    <div class="page-content">
      <div class="statistics-wrapper">
        <div class="container">
          <placeholder :loading="statisticFetching">
            <template #loading>
              <div class="statistics-skeleton">
                <skeleton class="item" :key="s" v-for="s in 3" />
              </div>
            </template>
            <template #default>
              <div class="statistics-content">
                <div class="item">
                  <p class="label">{{ statisticState.statistics.value.articles.label }}</p>
                  <div class="value">{{ statisticState.statistics.value.articles.value }}</div>
                </div>
                <divider type="vertical" />
                <div class="item">
                  <p class="label">{{ statisticState.statistics.value.todayViews.label }}</p>
                  <div class="value">{{ statisticState.statistics.value.todayViews.value }}</div>
                </div>
                <divider type="vertical" />
                <div class="item">
                  <p class="label">{{ statisticState.statistics.value.comments.label }}</p>
                  <div class="value">{{ statisticState.statistics.value.comments.value }}</div>
                </div>
              </div>
            </template>
          </placeholder>
        </div>
      </div>
      <div class="archive-wrapper">
        <div class="container">
          <placeholder :loading="archiveStore.fetching" :has-data="!!archiveStore.data?.articles.length">
            <template #placeholder>
              <empty class="archive-empty">
                <i18n :k="LocalesKey.ARTICLE_PLACEHOLDER" />
              </empty>
            </template>
            <template #loading>
              <ul class="archive-skeleton">
                <li class="item" v-for="item in 3" :key="item">
                  <skeleton class="title" />
                  <skeleton class="line" v-for="i in 3" :key="i" />
                </li>
              </ul>
            </template>
            <template #default>
              <archive-tree class="archive-content" :tree="archiveStore.tree">
                <template #title="{ year, month, count }">
                  <h3 class="archive-title">
                    <span class="year"><i18n :en="year" :zh="numberToChinese(year)" /></span>
                    <span class="month"><i18n v-bind="getMonthNameI18n(month)" /></span>
                    <span class="count"><i18n :zh="`（${count}）`" :en="` (${count})`" /></span>
                  </h3>
                </template>
                <template #article="{ article, day }">
                  <div class="archive-article">
                    <h4 class="title">
                      <span class="date">D{{ day }}</span>
                      <a
                        class="link"
                        target="_blank"
                        :title="article.title"
                        :href="getArticleDetailRoute(article.id)"
                      >
                        {{ article.title }}
                      </a>
                    </h4>
                    <p class="summary" v-html="article.summary" />
                  </div>
                </template>
              </archive-tree>
            </template>
          </placeholder>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .archive-page {
    .statistics-wrapper {
      margin-top: $gap;
      border-radius: $radius-sm;
      background-color: $module-bg-translucent;

      .statistics-skeleton {
        padding: $gap-sm;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: $gap;

        .item {
          height: 3rem;
        }
      }

      .statistics-content {
        padding: 1.4em 2em;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;

        .item {
          text-align: center;

          .label {
            margin-bottom: $gap-tiny;
            text-transform: uppercase;
            font-size: $font-size-tertiary;
            color: $color-text-secondary;
          }

          .value {
            font-size: $font-size-h1;
            font-weight: bold;
          }
        }
      }
    }

    .archive-wrapper {
      overflow: hidden;
      margin-top: $gap;

      .archive-empty {
        font-weight: bold;
      }

      .archive-content {
        background-color: $module-bg-translucent;
        @include mix.radius-box($radius-sm);
      }

      .archive-skeleton {
        padding: 0;
        margin: 0;
        list-style: none;

        .item {
          padding: $gap-sm;
          margin-bottom: $gap;
          background-color: $module-bg-translucent;
          @include mix.radius-box($radius-sm);
          &:last-child {
            margin-bottom: 0;
          }

          .title {
            width: 10rem;
            height: 1.8rem;
          }

          .line {
            height: 1rem;
            margin-top: $gap;

            &:nth-child(4) {
              width: 80%;
            }
          }
        }
      }

      .archive-content {
        padding: 0 1.8em;

        .archive-title {
          margin: 2em 0;
          text-align: center;

          .year {
            display: inline-block;
            letter-spacing: 0.1em;
          }

          .month {
            margin-left: $gap-xs;
          }

          .count {
            font-weight: normal;
          }
        }

        .archive-article {
          margin-bottom: 2em;

          .title {
            margin-top: 0;
            margin-bottom: $gap-xs;
            max-width: 75vw;
            @include mix.text-overflow();

            .date {
              display: inline-block;
              width: 2em;
              margin-right: $gap-xs;
              color: $color-text-divider;
            }
          }

          .summary {
            margin-bottom: 0;
            padding-left: 2.5rem;
            color: $color-text-disabled;
          }
        }
      }
    }
  }
</style>
