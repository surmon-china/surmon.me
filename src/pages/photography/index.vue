<script lang="ts" setup>
  import { ref, shallowRef, shallowReactive, computed } from 'vue'
  import { useStores } from '/@/stores'
  import { useEnhancer } from '/@/app/enhancer'
  import { usePageSeo } from '/@/composables/head'
  import { useUniversalFetch } from '/@/app/universal'
  import { LocalesKey } from '/@/locales'
  import { APP_PROFILE, IDENTITIES } from '/@/configs/app.config'
  import type { InstagramMediaItem, InstagramMediaListResponse } from '/@/server/getters/instagram'
  import { isClient } from '/@/configs/app.env'
  import { delayPromise } from '/@/utils/delayer'
  import { TunnelModule } from '/@/constants/tunnel'
  import tunnel from '/@/services/tunnel'
  import PageBanner from '/@/components/common/banner.vue'
  import Loadmore from '/@/components/common/loadmore.vue'
  import InstagramGrid from './grid.vue'

  const { isZhLang, i18n: _i18n } = useEnhancer()
  const { instagramLatestMediasStore, goLinksStore } = useStores()

  const medias = shallowReactive<Array<InstagramMediaItem>>([])
  const allMedias = computed(() => {
    const latestMedias = instagramLatestMediasStore.data?.data ?? []
    return [...latestMedias, ...medias]
  })

  const lastPaging = shallowRef<InstagramMediaListResponse['paging'] | null>(null)
  const finished = computed(() => Boolean(lastPaging.value && !lastPaging.value.next))
  const isLoadingMore = ref(false)

  const fetchMoreMedias = async () => {
    try {
      isLoadingMore.value = true
      const request = tunnel.fetch<InstagramMediaListResponse>(TunnelModule.InstagramMedias, {
        after: lastPaging.value?.cursors.after ?? instagramLatestMediasStore.data?.paging?.cursors.after
      })
      const response = await (isClient ? delayPromise(360, request) : request)
      medias.push(...response.data)
      lastPaging.value = response.paging
    } finally {
      isLoadingMore.value = false
    }
  }

  usePageSeo(() => {
    const enTitle = 'Photography'
    const titles = isZhLang.value ? [_i18n.t(LocalesKey.PAGE_PHOTOGRAPHY)!, enTitle] : [enTitle]
    const description = isZhLang.value ? `${APP_PROFILE.author} 的摄影作品` : `${APP_PROFILE.author}'s photographs`
    return {
      pageTitles: titles,
      description: description
    }
  })

  useUniversalFetch(() => instagramLatestMediasStore.fetch())
</script>

<template>
  <div class="photography-page">
    <page-banner class="page-banner" video="/videos/clips/ocean-5.mp4" :video-position="72" cdn>
      <template #title>
        <webfont>
          <i18n zh="大千同在，萬象共棲" :en="`${APP_PROFILE.author}'s photographs`" />
        </webfont>
      </template>
      <template #description>
        <div class="links">
          <ulink class="item instagram" title="Instagram" :href="goLinksStore.map.instagram">
            <span class="username">@{{ IDENTITIES.INSTAGRAM_USERNAME }}</span>
          </ulink>
          <divider type="vertical" size="lg" color="#ffffffcc" />
          <ulink class="item xiaohongshu" title="小红书" :href="goLinksStore.map.xiaohongshu">
            <i class="iconfont icon-xiaohongshu"></i>
          </ulink>
        </div>
      </template>
    </page-banner>
    <container class="page-bridge"></container>
    <container class="page-content">
      <placeholder :data="instagramLatestMediasStore.data?.data" :loading="instagramLatestMediasStore.fetching">
        <template #placeholder>
          <empty class="module-empty" key="empty">
            <i18n :k="LocalesKey.EMPTY_PLACEHOLDER" />
          </empty>
        </template>
        <template #loading>
          <div key="loading" class="module-loading">
            <div class="item" v-for="item in 4 * 2" :key="item">
              <skeleton-base />
            </div>
          </div>
        </template>
        <template #default>
          <div>
            <instagram-grid :medias="allMedias" />
            <loadmore
              v-if="!instagramLatestMediasStore.fetching && !finished"
              class="loadmore"
              :loading="isLoadingMore"
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

  .photography-page {
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

          &.instagram {
            .username {
              font-size: $font-size-h3;
              font-family: $font-family-monospace;
            }
          }

          &.xiaohongshu {
            .iconfont {
              font-size: $font-size-base * 2;
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

    .module-loading {
      padding: 0;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-gap: $gap * 5;

      .item {
        padding: $gap-lg;
        height: 21rem;
        @include mix.radius-box($radius-xs);
        @include mix.common-bg-module();
      }
    }

    .module-empty {
      font-weight: bold;
      font-size: $font-size-h3;
    }
  }
</style>
