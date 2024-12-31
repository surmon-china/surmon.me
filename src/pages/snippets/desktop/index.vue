<script lang="ts" setup>
  import { LanguageKey } from '/@/language'
  import { VALUABLE_LINKS } from '/@/config/app.config'
  import PageBanner from '/@/components/common/banner.vue'
  import Loadmore from '/@/components/common/loadmore.vue'
  import { useUniversalFetch } from '/@/universal'
  import { i18nTitle, useSnippetsPageMeta } from '../shared'
  import { useThreadsMediasData } from '../threads/shared'
  import ThreadsCard from '../threads/card.vue'
  import MasonryList from './masonry.vue'

  const { latestThreadsStore, loading, finished, allMedias, fetchMoreMedias } = useThreadsMediasData()

  const openImagePopup = (url: string) => {
    window.$popup.vImage(url)
  }

  useSnippetsPageMeta()
  useUniversalFetch(() => latestThreadsStore.fetch())
</script>

<template>
  <div class="snippets-page">
    <page-banner class="page-banner" video="/videos/clips/forest-1.mp4" :video-position="72" cdn>
      <template #title>
        <webfont><i18n v-bind="i18nTitle" /></webfont>
      </template>
      <template #description>
        <ulink :href="VALUABLE_LINKS.THREADS" class="link"><i class="iconfont icon-threads"></i> Threads</ulink>
        <divider type="vertical" size="lg" color="#ffffffcc" />
        <ulink :href="VALUABLE_LINKS.ZHIHU" class="link">
          <i class="iconfont icon-zhihu-full"></i> zhihu.com
        </ulink>
      </template>
    </page-banner>
    <container class="page-bridge"></container>
    <container class="page-content">
      <placeholder :data="latestThreadsStore.data?.data" :loading="latestThreadsStore.fetching">
        <template #placeholder>
          <empty class="data-empty" key="empty">
            <i18n :k="LanguageKey.EMPTY_PLACEHOLDER" />
          </empty>
        </template>
        <template #loading>
          <div key="loading" class="data-loading">
            <div class="item" v-for="item in 3 * 3" :key="item">
              <div class="item-skeleton" v-for="i in 3" :key="i">
                <skeleton-line />
              </div>
            </div>
          </div>
        </template>
        <template #default>
          <div>
            <masonry-list :data="allMedias" :cols="3">
              <template #item="{ data }">
                <threads-card :media="data" @click-image="openImagePopup" />
              </template>
            </masonry-list>
            <loadmore
              v-if="!latestThreadsStore.fetching && !finished"
              class="loadmore"
              :loading="loading"
              @loadmore="fetchMoreMedias"
            >
              <template #normal>
                <button class="normal" @click="fetchMoreMedias">
                  <i class="iconfont icon-loadmore"></i>
                </button>
              </template>
              <template #loading>
                <loading-indicator class="loading" width="2.4rem" height="1.4rem" gap="1rem" />
              </template>
            </loadmore>
          </div>
        </template>
      </placeholder>
    </container>
  </div>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .snippets-page {
    min-height: $full-page-active-content-height;

    .page-banner {
      .link {
        color: $white;
        text-decoration: underline;
        text-decoration-color: rgba($white, 0.6);
        text-underline-offset: 6px;

        .iconfont {
          font-weight: normal;
        }
      }
    }

    .page-bridge {
      position: relative;
      height: 4rem;
      background: linear-gradient(to right, transparent, $module-bg-opaque, transparent);
    }

    .page-content {
      margin: 4rem 0;

      .loadmore {
        margin-top: 4rem;
        color: $color-text-disabled;
        .normal {
          font-size: $font-size-h1;
        }
        .loading {
          margin: $gap-sm 0;
        }
      }
    }

    .data-loading {
      padding: 0;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: $gap * 4;

      .item {
        padding: $gap * 2;
        @include mix.common-bg-module();
        @include mix.radius-box($radius-sm);

        .item-skeleton {
          height: 2rem;
          margin-bottom: 2rem;
          &:last-child {
            margin-bottom: 0;
          }
        }
      }
    }

    .data-empty {
      font-weight: bold;
      font-size: $font-size-h3;
    }
  }
</style>
