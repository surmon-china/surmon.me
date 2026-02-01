<script lang="ts" setup>
  import { shallowRef } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { useThreadsLatestMediasStore } from '/@/stores/socials'
  import { useUniversalFetch } from '/@/app/universal'
  import { useThreadsMediasRequest } from '../threads'
  import { i18nTitle, useSnippetsPageMeta } from '../shared'
  import { LocalesKey } from '/@/locales'
  import { IDENTITIES } from '/@/configs/app.config'
  import type { ThreadsMedia, ThreadsMediaListResponse } from '/@/server/getters/threads'
  import MasonryWall, { MasonryRef } from '/@/components/common/masonry-wall.vue'
  import MobileBanner from '/@/components/mobile/widgets/page-banner.vue'
  import Loadmore from '/@/components/common/loadmore.vue'
  import ThreadsCard from './card-threads.vue'

  const { goLinks, popup } = useEnhancer()
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
    <mobile-banner background-image="/images/page-snippets/banner-mobile.webp" :background-image-y="80" cdn>
      <template #title>
        <webfont bolder><i18n :k="LocalesKey.PAGE_SNIPPETS" /></webfont>
      </template>
      <template #description>
        <webfont><i18n v-bind="i18nTitle" /></webfont>
      </template>
    </mobile-banner>
    <placeholder
      :loading="threadsLatestMediasStore.fetching"
      :has-data="!!threadsLatestMediasStore.data?.data.length"
    >
      <template #loading>
        <div class="snippets-skeleton">
          <div class="socials">
            <skeleton class="item" :key="i" v-for="i in 3" />
          </div>
          <div class="cards">
            <div class="item" v-for="i in 6" :key="i">
              <skeleton class="title" />
              <skeleton class="line" />
              <skeleton class="line" />
              <skeleton class="line" />
            </div>
          </div>
        </div>
      </template>
      <template #default>
        <div class="snippets-content">
          <div class="socials">
            <ulink class="item" :href="goLinks.threads">
              <p class="label">
                <i class="iconfont icon-threads"></i>
                <span class="text">Threads</span>
              </p>
              <p class="username">@{{ IDENTITIES.THREADS_USERNAME }}</p>
            </ulink>
            <divider type="vertical" />
            <ulink class="item" :href="goLinks.zhihu">
              <p class="label">
                <i class="iconfont icon-zhihu-full"></i>
                <span class="text">回答</span>
              </p>
              <p class="username">@{{ IDENTITIES.ZHIHU_USERNAME }}</p>
            </ulink>
          </div>
          <masonry-wall
            row-gap="1rem"
            col-gap="1rem"
            :columns="2"
            :initial-items="threadsLatestMediasStore.data?.data || []"
            :ssr-initial-render="true"
            @mounted="masonryRef = $event"
          >
            <template #default="{ item }">
              <threads-card :media="item" @click-image="(url) => popup.vImage(url)" />
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
              <loading-indicator width="2rem" height="1rem" gap="lg" />
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
    .snippets-skeleton {
      padding: 0;
      margin-top: $gap;

      .socials {
        margin-bottom: $gap;
        padding: $gap-sm;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: $gap;
        @include mix.common-bg-module();
        @include mix.radius-box($radius-sm);

        .item {
          height: 3rem;
        }
      }

      .cards {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: $gap;

        .item {
          padding: $gap-sm;
          @include mix.common-bg-module();
          @include mix.radius-box($radius-sm);

          .title {
            width: 5rem;
            height: 1.8rem;
          }

          .line {
            width: 100%;
            height: 1rem;
            margin-top: $gap-sm;
            &:nth-child(4) {
              width: 80%;
            }
          }
        }
      }
    }

    .snippets-content {
      margin-top: $gap;

      .socials {
        margin-bottom: $gap;
        padding: 1em $gap-xs;
        border-radius: $radius-sm;
        background-color: $module-bg-translucent;
        display: flex;
        justify-content: space-evenly;
        align-items: center;

        .item {
          flex: 1;
          text-align: center;

          .label {
            margin-bottom: $gap-xs;
            font-size: $font-size-h4;

            .iconfont {
              margin-right: $gap-tiny;
            }
            .text {
              font-weight: bold;
            }
          }

          .username {
            margin: 0;
            font-family: $font-family-monospace;
            font-size: $font-size-tertiary;
            color: $color-text-secondary;
          }
        }
      }

      .loadmore {
        margin-top: $gap-lg;
        margin-bottom: $gap-sm;
        color: $color-text-disabled;

        .normal {
          width: 100%;
          font-size: $font-size-h2;
        }

        .finished {
          color: $color-text-divider;
          font-weight: bold;
        }
      }
    }
  }
</style>
