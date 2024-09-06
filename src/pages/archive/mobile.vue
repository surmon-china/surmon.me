<script lang="ts" setup>
  import { ref, computed, onMounted } from 'vue'
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
        <transition name="module" mode="out-in">
          <div class="skeletons" v-if="statisticFetching">
            <skeleton-base class="skeleton" :key="s" v-for="s in 3" />
          </div>
          <div class="statistics" v-else>
            <div class="item">
              <p class="title">{{ statisticState.statistics.value.articles.title }}</p>
              <div class="content">{{ statisticState.statistics.value.articles.content }}</div>
            </div>
            <divider type="vertical" />
            <div class="item">
              <p class="title">{{ statisticState.statistics.value.todayViews.title }}</p>
              <div class="content">{{ statisticState.statistics.value.todayViews.content }}</div>
            </div>
            <divider type="vertical" />
            <div class="item">
              <p class="title">{{ statisticState.statistics.value.comments.title }}</p>
              <div class="content">{{ statisticState.statistics.value.comments.content }}</div>
            </div>
          </div>
        </transition>
      </container>
      <container class="archive-wrapper">
        <placeholder :data="archiveStore.data?.articles.length" :loading="archiveStore.fetching">
          <template #placeholder>
            <empty class="archive-empty" key="empty">
              <i18n :k="LanguageKey.ARTICLE_PLACEHOLDER" />
            </empty>
          </template>
          <template #loading>
            <div class="archive-skeleton" key="skeleton">
              <skeleton-line class="item" :key="s" v-for="s in 6" />
            </div>
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
  @import '/src/styles/variables.scss';
  @import '/src/styles/mixins.scss';

  .archive-page {
    .statistic-wrapper {
      margin-top: $gap-lg;
      padding: 1.8rem 2rem;
      border-radius: $radius-lg;
      background-color: $module-bg-translucent;

      .skeletons,
      .statistics {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 100%;
      }

      .skeleton {
        width: 5rem;
        height: 2.6rem;
      }

      .statistics {
        flex-wrap: wrap;
        justify-content: space-between;

        .item {
          display: inline-flex;
          flex-direction: column;
          text-align: center;

          .title {
            margin-bottom: $gap-xs;
            text-transform: uppercase;
            font-size: $font-size-small;
            color: $color-text-secondary;
          }

          .content {
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

      .archive-skeleton,
      .archive-content {
        background-color: $module-bg-translucent;
        @include radius-box($radius-lg);
      }

      .archive-skeleton {
        padding: 2rem;
        .item {
          height: 2rem;
          margin-bottom: 2rem;
          &:last-child {
            margin-bottom: 0;
          }
        }
      }

      .archive-content {
        padding: 0 3rem;
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
            @include text-overflow();

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
