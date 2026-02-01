<script lang="ts" setup>
  import { shallowRef } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { useThreadsLatestMediasStore } from '/@/stores/socials'
  import { useUniversalFetch } from '/@/app/universal'
  import { useThreadsMediasRequest } from '../threads'
  import { i18nTitle, useSnippetsPageMeta } from '../shared'
  import type { ThreadsMedia, ThreadsMediaListResponse } from '/@/server/getters/threads'
  import MasonryWall, { MasonryRef } from '/@/components/common/masonry-wall.vue'
  import PageBanner from '/@/components/desktop/widgets/page-banner.vue'
  import Loadmore from '/@/components/common/loadmore.vue'
  import ListItemCard from './card.vue'
  import ThreadsBody from './body-threads.vue'
  import { LocalesKey } from '/@/locales'
  import { IDENTITIES } from '/@/configs/app.config'

  const { popup, goLinks } = useEnhancer()
  const threadsLatestMediasStore = useThreadsLatestMediasStore()

  const masonryRef = shallowRef<MasonryRef<ThreadsMedia>>()
  const lastPaging = shallowRef<ThreadsMediaListResponse['paging'] | null>(null)
  const noMoreData = shallowRef(false)

  const { fetchMedias, fetching } = useThreadsMediasRequest()
  const fetchNextPageThreadsMedias = async () => {
    if (threadsLatestMediasStore.fetching || fetching.value || noMoreData.value) return
    const secondPage = threadsLatestMediasStore.data?.paging.cursors.after
    const nextPage = lastPaging.value?.cursors?.after
    const response = await fetchMedias(nextPage ?? secondPage)
    lastPaging.value = response.paging
    noMoreData.value = !response.paging.cursors?.after
    masonryRef.value?.appendItems(response.data)
  }

  useSnippetsPageMeta()
  useUniversalFetch(() => threadsLatestMediasStore.fetch())
</script>

<template>
  <div class="snippets-page">
    <page-banner class="page-banner" background-video="/videos/clips/forest-1.mp4" :background-video-y="72" cdn>
      <template #title>
        <webfont><i18n v-bind="i18nTitle" /></webfont>
      </template>
      <template #description>
        <div class="links">
          <ulink class="item threads" title="Threads" :href="goLinks.threads">
            <span class="username">@{{ IDENTITIES.THREADS_USERNAME }}</span>
          </ulink>
          <divider type="vertical" size="lg" color="#ffffffcc" />
          <ulink class="item zhihu" title="知乎" :href="goLinks.zhihu">
            <i class="iconfont icon-zhihu-full"></i>
          </ulink>
        </div>
      </template>
    </page-banner>
    <div class="page-bridge"></div>
    <div class="page-content">
      <div class="container">
        <placeholder
          :loading="threadsLatestMediasStore.fetching"
          :has-data="!!threadsLatestMediasStore.data?.data.length"
        >
          <template #placeholder>
            <empty class="module-empty" bold size="large">
              <i18n :k="LocalesKey.EMPTY_PLACEHOLDER" />
            </empty>
          </template>
          <template #loading>
            <div class="module-skeleton">
              <div class="item" v-for="item in 6" :key="item">
                <skeleton class="title" />
                <skeleton class="line" v-for="i in 4" :key="i" />
              </div>
            </div>
          </template>
          <template #default>
            <div>
              <masonry-wall
                :columns="3"
                row-gap="2.2rem"
                col-gap="2rem"
                :initial-items="threadsLatestMediasStore.data?.data || []"
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
                    <threads-body
                      :media="item"
                      @click-image="(url) => popup.image(url)"
                      @click-video="(url) => popup.video(url)"
                    />
                  </list-item-card>
                </template>
              </masonry-wall>
              <loadmore
                v-if="!threadsLatestMediasStore.fetching && !noMoreData"
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
                  <loading-indicator class="loading" width="2.2rem" height="1.2rem" gap="lg" />
                </template>
              </loadmore>
            </div>
          </template>
        </placeholder>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @use 'sass:math';
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .snippets-page {
    min-height: $full-page-content-height;

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
      height: 3rem;
      background: linear-gradient(to right, transparent, $module-bg-opaque, transparent);
    }

    .page-content {
      margin: 3rem 0;

      .loadmore {
        margin-top: 4rem;
        color: $color-text-disabled;
        .normal {
          font-size: $font-size-h1;
        }
        .loading {
          margin: $gap-tiny 0;
        }
      }
    }

    .module-skeleton {
      padding: 0;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 3rem;

      .item {
        padding: $gap;
        background-color: $module-bg;
        @include mix.radius-box($radius-sm);

        .title {
          width: 9rem;
          height: 1.8rem;
          margin-bottom: $gap-lg;
        }

        .line {
          height: 1.2rem;
          margin-bottom: $gap;
          &:last-child {
            margin-bottom: 0;
          }
          &:nth-child(5) {
            height: 1rem;
            width: 66%;
          }
        }
      }
    }

    .module-empty {
      min-height: 8rem;
    }
  }
</style>
