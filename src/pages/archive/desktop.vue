<script lang="ts" setup>
  import { ref, computed, onMounted } from 'vue'
  import { useUniversalFetch } from '/@/app/universal'
  import { useArchiveStore } from '/@/stores/archive'
  import { LocalesKey } from '/@/locales'
  import { getArticleDetailRoute } from '/@/transforms/route'
  import { numberSplit, numberToChinese } from '/@/transforms/text'
  import { bannerI18ns, useArchivePageMeta, useArchivePageStatistics, getMonthNameI18n } from './shared'
  import PageBanner from '/@/components/desktop/widgets/page-banner.vue'
  import ArchiveTree from './tree.vue'

  const archiveStore = useArchiveStore()
  const statisticState = useArchivePageStatistics()
  const statisticFetching = ref(true)
  const statistics = computed(() => [
    statisticState.statistics.value.articles,
    statisticState.statistics.value.todayViews,
    statisticState.statistics.value.comments,
    statisticState.statistics.value.totalLikes,
    statisticState.statistics.value.averageEmotion
  ])

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
    <page-banner background-image="/images/page-archive/banner.webp" :background-image-y="34" cdn>
      <template #title>
        <webfont><i18n v-bind="bannerI18ns.title" /></webfont>
      </template>
      <template #description>
        <i18n v-bind="bannerI18ns.description" />
      </template>
    </page-banner>
    <div class="statistics-wrapper">
      <div class="container">
        <placeholder :loading="statisticFetching">
          <template #loading>
            <div class="statistics-skeleton">
              <skeleton class="item" :key="s" v-for="s in statistics.length" />
            </div>
          </template>
          <template #default>
            <div class="statistics-content">
              <div class="item" :key="index" v-for="(s, index) in statistics">
                <i class="iconfont" :class="s.icon"></i>
                <div class="content">
                  <p class="label">{{ s.label }}</p>
                  <div class="value">{{ s.value }}</div>
                </div>
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
            <empty class="archive-empty" bold size="large">
              <i18n :k="LocalesKey.ARTICLE_PLACEHOLDER" />
            </empty>
          </template>
          <template #loading>
            <ul class="archive-skeleton">
              <li class="item" v-for="i in 6" :key="i">
                <skeleton class="title" />
                <skeleton class="line" v-for="l in 3" :key="l" />
              </li>
            </ul>
          </template>
          <template #default>
            <archive-tree class="archive-content" :tree="archiveStore.tree">
              <template #title="{ year, month, count }">
                <h1 class="archive-title">
                  <span class="year"><i18n :en="String(year)" :zh="numberToChinese(year)" /></span>
                  <span class="month"><i18n v-bind="getMonthNameI18n(month)" /></span>
                  <span class="count"><i18n :zh="`（${count}）`" :en="` (${count})`" /></span>
                </h1>
              </template>
              <template #article="{ article, day }">
                <div class="archive-article">
                  <div class="left">
                    <h3 class="title">
                      <span class="date">D{{ day }}</span>
                      <a
                        class="link"
                        target="_blank"
                        :title="article.title"
                        :href="getArticleDetailRoute(article.id)"
                      >
                        {{ article.title }}
                      </a>
                    </h3>
                    <p class="summary" v-html="article.summary" />
                  </div>
                  <div class="metas">
                    <div class="item views">
                      <i class="iconfont icon-eye"></i>
                      <span class="text">{{ numberSplit(article.stats.views) }}</span>
                    </div>
                    <divider type="vertical" size="sm" />
                    <div class="item likes">
                      <i class="like-icon iconfont icon-like"></i>
                      <span class="text">{{ article.stats.likes }}</span>
                    </div>
                    <divider type="vertical" size="sm" />
                    <div class="item comments">
                      <i class="iconfont icon-comment"></i>
                      <span class="text">{{ article.stats.comments }}</span>
                    </div>
                  </div>
                </div>
              </template>
            </archive-tree>
          </template>
        </placeholder>
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
      padding: 2.2rem 0;
      background-color: $module-bg-translucent;

      .statistics-skeleton,
      .statistics-content {
        display: flex;
        justify-content: space-around;
        align-items: center;
      }

      .statistics-skeleton {
        .item {
          width: 6.8rem;
          height: 2.6rem;
        }
      }

      .statistics-content {
        .item {
          display: inline-flex;
          align-items: flex-end;

          .iconfont {
            margin-right: $gap-sm;
            display: inline-block;
            font-size: $font-size-h4 * 2;
            color: $color-text-disabled;
            @include mix.text-trim();
            opacity: 0.2;
          }

          .content {
            @include mix.text-trim();

            .label {
              margin-bottom: 0;
              text-transform: uppercase;
              color: $color-text-secondary;
            }

            .value {
              font-weight: bold;
              font-size: $font-size-h1 * 1.1;
            }
          }
        }
      }
    }

    .archive-wrapper {
      padding: 2.8rem 0;
      overflow: hidden;

      .archive-empty {
        min-height: 19rem;
      }

      .archive-skeleton {
        margin: 0;
        padding: 0;
        list-style: none;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 3rem;

        .item {
          padding: $gap;
          background-color: $module-bg-translucent;
          @include mix.radius-box($radius-sm);
          &:last-child {
            margin-bottom: 0;
          }

          .title {
            width: 10rem;
            height: 2rem;
          }

          .line {
            height: 1rem;
            margin-top: $gap;
            &:nth-child(4) {
              width: 70%;
            }
          }
        }
      }

      .archive-content {
        margin-top: -1rem;

        .archive-title {
          margin: 2em 0;
          text-align: center;
          letter-spacing: 0.2em;

          .month {
            margin-left: $gap;
          }

          .count {
            font-weight: normal;
            color: $color-text-secondary;
          }
        }

        .archive-article {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2.4rem;
          padding-left: 3rem;
          padding-right: 2rem;

          .left {
            .title {
              margin-top: 0;
              margin-bottom: $gap-sm;

              .date {
                display: inline-block;
                width: 2rem;
                margin-right: $gap-sm;
                color: $color-text-divider;
                font-size: $font-size-h3;
                font-weight: bold;
              }

              .link {
                @include mix.text-underline(0.4em);
                text-decoration-color: $color-text-secondary;
              }
            }

            .summary {
              padding-left: 2.7rem;
            }
          }

          .metas {
            margin-left: 2em;
            display: inline-flex;
            align-items: center;
            font-size: $font-size-h4;
            color: $color-text-disabled;

            .item {
              width: 4em;
              text-align: center;
              &.views {
                width: 5em;
              }

              .iconfont {
                margin-right: $gap-xs;
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
