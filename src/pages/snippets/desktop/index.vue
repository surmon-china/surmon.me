<script lang="ts" setup>
  import { shallowRef } from 'vue'
  import { IDENTITIES, VALUABLE_LINKS } from '/@/configs/app.config'
  import MasonryWall, { MasonryRef } from '/@/components/common/masonry-wall.vue'
  import PageBanner from '/@/components/common/banner.vue'
  import Loadmore from '/@/components/common/loadmore.vue'
  import { LanguageKey } from '/@/language'
  import { useEnhancer } from '/@/app/enhancer'
  import { useUniversalFetch } from '/@/universal'
  import { useThreadsLatestMediasStore } from '/@/stores/media'
  import { useThreadsMediasRequest } from '../threads'
  import { i18nTitle, useSnippetsPageMeta } from '../shared'
  import type { ThreadsMedia, ThreadsMediaListResponse } from '/@/server/getters/threads'
  import ListItemCard from './card.vue'
  import ThreadsBody from './body-threads.vue'

  const { popup } = useEnhancer()
  const { fetching, fetchMedias } = useThreadsMediasRequest()
  const latestThreadsStore = useThreadsLatestMediasStore()

  const masonryRef = shallowRef<MasonryRef<ThreadsMedia>>()
  const lastPaging = shallowRef<ThreadsMediaListResponse['paging'] | null>(null)
  const noMoreData = shallowRef(false)

  const fetchNextPageThreadsMedias = async () => {
    if (latestThreadsStore.fetching || fetching.value || noMoreData.value) return
    const secondPage = latestThreadsStore.data?.paging.cursors.after
    const nextPage = lastPaging.value?.cursors?.after
    const response = await fetchMedias(nextPage ?? secondPage)
    lastPaging.value = response.paging
    noMoreData.value = !response.paging.cursors?.after
    masonryRef.value?.appendItems(response.data)
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
        <div class="links">
          <ulink class="item threads" title="Threads" :href="VALUABLE_LINKS.THREADS">
            <span class="username">@{{ IDENTITIES.INSTAGRAM_USERNAME }}</span>
          </ulink>
          <divider type="vertical" size="lg" color="#ffffffcc" />
          <ulink class="item zhihu" title="知乎" :href="VALUABLE_LINKS.ZHIHU">
            <i class="iconfont icon-zhihu-full"></i>
          </ulink>
        </div>
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
            <masonry-wall
              :columns="3"
              row-gap="2.8rem"
              col-gap="2.4rem"
              :initial-items="latestThreadsStore.data?.data || []"
              :ssr-initial-render="true"
              @mounted="masonryRef = $event"
            >
              <template #default="{ item }">
                <list-item-card
                  icon="icon-threads"
                  :username="item.username"
                  :permalink="item.permalink"
                  :timestamp="item.timestamp"
                >
                  <threads-body :media="item" @click-image="(url) => popup.vImage(url)" />
                </list-item-card>
              </template>
            </masonry-wall>
            <loadmore
              v-if="!latestThreadsStore.fetching && !noMoreData"
              class="loadmore"
              :loading="fetching"
              @loadmore="fetchNextPageThreadsMedias"
            >
              <template #normal>
                <button class="normal" @click="fetchNextPageThreadsMedias">
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
  @use 'sass:math';
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .snippets-page {
    min-height: $full-page-active-content-height;

    .page-banner {
      .links {
        display: inline-flex;
        align-items: center;

        .item {
          color: $white;
          opacity: 0.8;
          &:hover {
            opacity: 1;
          }

          &.threads {
            .username {
              font-family: $font-family-monospace;
              font-size: $font-size-h3;
            }
          }

          &.zhihu {
            .iconfont {
              font-size: $font-size-h3;
              font-weight: normal;
            }
          }
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
