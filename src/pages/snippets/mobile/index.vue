<script lang="ts" setup>
  import { shallowRef } from 'vue'
  import type { ThreadsMedia, ThreadsMediaListResponse } from '/@/server/getters/threads'
  import { IDENTITIES } from '/@/configs/app.config'
  import { LanguageKey } from '/@/language'
  import { useStores } from '/@/stores'
  import { useEnhancer } from '/@/app/enhancer'
  import { useUniversalFetch } from '/@/app/universal'
  import { useThreadsLatestMediasStore } from '/@/stores/media'
  import { useThreadsMediasRequest } from '../threads'
  import { i18nTitle, useSnippetsPageMeta } from '../shared'
  import MasonryWall, { MasonryRef } from '/@/components/common/masonry-wall.vue'
  import PageBanner from '/@/components/common/banner.vue'
  import Loadmore from '/@/components/common/loadmore.vue'
  import ThreadsCard from './card-threads.vue'

  const { goLink } = useStores()
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
    <page-banner :is-mobile="true" image="/images/page-snippets/banner-mobile.webp" :image-position="80" cdn>
      <template #title><i18n :k="LanguageKey.PAGE_SNIPPETS" /></template>
      <template #description><i18n v-bind="i18nTitle" /></template>
    </page-banner>
    <placeholder :data="latestThreadsStore.data?.data" :loading="latestThreadsStore.fetching">
      <template #loading>
        <div class="snippets-loading" key="loading">
          <div class="socials">
            <skeleton-base class="item" :key="s" v-for="s in 3" />
          </div>
          <div class="cards">
            <div class="item" v-for="i in 4" :key="i">
              <skeleton-paragraph :lines="4" line-height="1.2rem" />
            </div>
          </div>
        </div>
      </template>
      <template #default>
        <div class="snippets-content">
          <div class="socials">
            <ulink class="item" :href="goLink.map.threads">
              <p class="label">
                <i class="iconfont icon-threads"></i>
                <span class="text">Threads</span>
              </p>
              <p class="username">@{{ IDENTITIES.INSTAGRAM_USERNAME }}</p>
            </ulink>
            <divider type="vertical" />
            <ulink class="item" :href="goLink.map.zhihu">
              <p class="label">
                <i class="iconfont icon-zhihu-full"></i>
                <span class="text">回答</span>
              </p>
              <p class="username">@{{ IDENTITIES.ZHIHU_USERNAME }}</p>
            </ulink>
          </div>
          <masonry-wall
            row-gap="1.2rem"
            col-gap="1.4rem"
            :columns="2"
            :initial-items="latestThreadsStore.data?.data || []"
            :ssr-initial-render="true"
            @mounted="masonryRef = $event"
          >
            <template #default="{ item }">
              <threads-card :media="item" @click-image="(url) => popup.vImage(url)" />
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
              <loading-indicator class="loading" width="2rem" height="1.2rem" gap="0.68rem" />
            </template>
          </loadmore>
        </div>
      </template>
    </placeholder>
  </div>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .snippets-page {
    $item-gap: 1.4rem;

    .snippets-loading {
      padding: 0;
      margin-top: $item-gap;

      .socials {
        margin-bottom: $item-gap;
        padding: $gap-lg;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: $gap-lg;
        @include mix.common-bg-module();
        @include mix.radius-box($radius-sm);

        .item {
          height: 4rem;
        }
      }

      .cards {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: $gap-lg;

        .item {
          height: 10rem;
          padding: $gap-lg;
          @include mix.common-bg-module();
          @include mix.radius-box($radius-sm);
        }
      }
    }

    .snippets-content {
      margin-top: $item-gap;

      .socials {
        margin: $item-gap 0;
        padding: $gap-lg;
        border-radius: $radius-lg;
        background-color: $module-bg-translucent;
        display: flex;
        justify-content: space-evenly;
        align-items: center;

        .item {
          flex: 1;
          text-align: center;

          .label {
            margin-bottom: $gap-sm;
            font-size: $font-size-h4;

            .iconfont {
              margin-right: $gap-xs;
            }
            .text {
              font-weight: bold;
            }
          }

          .username {
            margin: 0;
            font-family: $font-family-monospace;
            font-size: $font-size-small;
            color: $color-text-secondary;
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
