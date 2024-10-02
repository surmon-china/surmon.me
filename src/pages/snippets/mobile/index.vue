<script lang="ts" setup>
  import { useUniversalFetch } from '/@/universal'
  import { LanguageKey } from '/@/language'
  import { VALUABLE_LINKS } from '/@/config/app.config'
  import PageBanner from '/@/components/common/banner.vue'
  import Loadmore from '/@/components/common/loadmore.vue'
  import { scrollToNextScreen } from '/@/utils/scroller'
  import { i18nTitle, useSnippetsPageMeta } from '../shared'
  import { useThreadsMediasData } from '../threads/shared'
  import ThreadsCard from '../threads/card.vue'

  const { latestThreadsStore, loading, finished, allMedias, fetchMoreMedias } = useThreadsMediasData()

  const fetchMoreMediasAndNextScreen = () => {
    fetchMoreMedias().then(() => {
      scrollToNextScreen()
    })
  }

  useSnippetsPageMeta()
  useUniversalFetch(() => latestThreadsStore.fetch())
</script>

<template>
  <div class="snippets-page">
    <page-banner :is-mobile="true" image="/images/page-snippets/banner-mobile.webp" :image-position="80" cdn>
      <template #title><i18n :k="LanguageKey.PAGE_SNIPPETS" /></template>
      <template #description><i18n v-bind="i18nTitle" /></template>
    </page-banner>
    <placeholder :data="latestThreadsStore.data?.data" :loading="latestThreadsStore.fetching">
      <template #loading>
        <div class="snippets-loading" key="loading">
          <div class="statistics">
            <skeleton-base class="item" :key="s" v-for="s in 3" />
          </div>
          <div class="cards" v-for="item in 3" :key="item">
            <div class="item" v-for="i in 2" :key="i">
              <skeleton-line />
            </div>
          </div>
        </div>
      </template>
      <template #default>
        <div class="snippets-content">
          <div class="statistics">
            <ulink class="item" :href="VALUABLE_LINKS.THREADS_FOLLOW">
              <i class="iconfont icon-threads"></i> Threads
            </ulink>
            <divider type="vertical" />
            <ulink class="item" :href="VALUABLE_LINKS.ZHIHU">
              <i class="iconfont icon-zhihu-full"></i>
            </ulink>
          </div>
          <ul class="cards">
            <li class="item" v-for="(media, index) in allMedias" :key="index" data-allow-mismatch>
              <ulink :href="media.permalink">
                <threads-card :media="media" />
              </ulink>
            </li>
          </ul>
          <loadmore
            v-if="!latestThreadsStore.fetching && !finished"
            class="loadmore"
            :loading="loading"
            @loadmore="fetchMoreMediasAndNextScreen"
          >
            <template #normal>
              <button class="normal" @click="fetchMoreMediasAndNextScreen">
                <i class="iconfont icon-loadmore"></i>
              </button>
            </template>
            <template #loading>
              <loading-indicator class="loading" width="2rem" height="1.2rem" gap="0.68rem" />
            </template>
          </loadmore>
        </div>
      </template>
    </placeholder>
  </div>
</template>

<style lang="scss" scoped>
  @import '/src/styles/variables.scss';
  @import '/src/styles/mixins.scss';

  .snippets-page {
    $item-gap: 1.4rem;

    .snippets-loading {
      padding: 0;
      margin-top: $item-gap;

      .statistics,
      .cards {
        padding: $gap-lg;
        margin-bottom: $item-gap;
        @include common-bg-module();
        @include radius-box($radius-sm);
      }

      .statistics {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .item {
          width: 6rem;
          height: 3rem;
        }
      }

      .cards {
        &:last-child {
          margin-bottom: 0;
        }

        .item {
          height: 2rem;
          margin-bottom: 2rem;
          &:last-child {
            margin-bottom: 0;
          }
        }
      }
    }

    .snippets-content {
      margin-top: $item-gap;

      .statistics {
        margin: $item-gap 0;
        padding: 1.8rem $gap-lg;
        border-radius: $radius-lg;
        background-color: $module-bg-translucent;
        display: flex;
        justify-content: space-evenly;
        align-items: center;

        .item {
          text-align: center;
          font-size: $font-size-h3;
        }
      }

      .cards {
        margin: 0;
        padding: 0;
        list-style: none;

        .item {
          @include radius-box($radius-sm);
          margin-bottom: 1.4rem;
          &:last-child {
            margin-bottom: 0;
          }
        }
      }

      .loadmore {
        margin-top: $gap-lg;
        color: $color-text-disabled;

        .normal {
          width: 100%;
          font-size: $font-size-h2;
        }

        .loading {
          margin: $gap-sm 0;
        }

        .finished {
          margin: $gap-xs 0;
          color: $color-text-divider;
          font-weight: bold;
        }
      }
    }
  }
</style>
