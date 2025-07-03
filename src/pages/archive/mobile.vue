<script lang="ts" setup>
  import { ref, onMounted } from 'vue'
  import { useUniversalFetch } from '/@/universal'
  import { useArchiveStore } from '/@/stores/archive'
  import { LanguageKey } from '/@/language'
  import { getArticleDetailRoute } from '/@/transforms/route'
  import PageBanner from '/@/components/common/banner.vue'
  import ArchiveTree from './tree.vue'
  import { i18ns, useArchivePageMeta, useArchivePageStatistics } from './shared'

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
    <page-banner :is-mobile="true" image="/images/page-archive/banner-mobile.webp" :image-position="80" cdn>
      <template #title><i18n :k="LanguageKey.PAGE_ARCHIVE" /></template>
      <template #description><i18n v-bind="i18ns.title" /></template>
    </page-banner>
    <div class="page-content">
      <container class="statistic-wrapper">
        <placeholder :loading="statisticFetching">
          <template #loading>
            <div class="skeletons" key="skeletons">
              <skeleton-base class="skeleton" :key="s" v-for="s in 3" />
            </div>
          </template>
          <template #default>
            <div class="statistics" key="statistics">
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
      </container>
      <container class="archive-wrapper">
        <placeholder :data="archiveStore.data?.articles.length" :loading="archiveStore.fetching">
          <template #placeholder>
            <empty class="archive-empty" key="empty">
              <i18n :k="LanguageKey.ARTICLE_PLACEHOLDER" />
            </empty>
          </template>
          <template #loading>
            <ul class="archive-skeleton" key="skeleton">
              <li v-for="item in 3" :key="item" class="item">
                <skeleton-line v-for="i in 2" :key="i" class="line" />
              </li>
            </ul>
          </template>
          <template #default>
            <archive-tree class="archive-content" :tree="archiveStore.tree" key="content">
              <template #title="{ title }">
                <h3 class="archive-title">{{ title }}</h3>
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
                  <p class="description" v-html="article.description" />
                </div>
              </template>
            </archive-tree>
          </template>
        </placeholder>
      </container>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .archive-page {
    .statistic-wrapper {
      margin-top: $gap-lg;
      border-radius: $radius-sm;
      background-color: $module-bg-translucent;

      .skeletons {
        padding: $gap-lg;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: $gap-lg;

        .skeleton {
          height: 4rem;
        }
      }

      .statistics {
        padding: 1.4em 2em;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;

        .item {
          text-align: center;

          .label {
            margin-bottom: $gap-xs;
            text-transform: uppercase;
            font-size: $font-size-small;
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
      margin-top: $gap-lg;

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
          padding: $gap-lg;
          margin-bottom: $gap-lg;
          background-color: $module-bg-translucent;
          @include mix.radius-box($radius-sm);
          &:last-child {
            margin-bottom: 0;
          }

          .line {
            height: 2rem;
            margin-bottom: $gap-lg;
            &:last-child {
              margin-bottom: 0;
            }
          }
        }
      }

      .archive-content {
        padding: 0 2em;
        .archive-title {
          margin: 2em 0;
          text-align: center;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .archive-article {
          margin-bottom: 2em;

          .title {
            margin-top: 0;
            margin-bottom: $gap-sm;
            max-width: 75vw;
            @include mix.text-overflow();

            .date {
              display: inline-block;
              width: 2rem;
              margin-right: 1rem;
              color: $color-text-divider;
            }
          }

          .description {
            margin-bottom: 0;
            padding-left: 3rem;
            color: $color-text-disabled;
          }
        }
      }
    }
  }
</style>
