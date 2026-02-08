<script lang="ts" setup>
  import { ref, shallowRef, shallowReactive, computed } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { usePageSeo } from '/@/composables/head'
  import { useUniversalFetch } from '/@/app/universal'
  import { useInstagramLatestMediasStore } from '/@/stores/socials'
  import type { InstagramMediaItem, InstagramMediaListResponse } from '/@/server/getters/instagram'
  import { isClient } from '/@/configs/app.env'
  import { delayPromise } from '/@/utils/delayer'
  import { TunnelModule } from '/@/constants/tunnel'
  import tunnel from '/@/services/tunnel'
  import PageBanner from '/@/components/desktop/widgets/page-banner.vue'
  import Loadmore from '/@/components/common/loadmore.vue'
  import InstagramGrid from './grid.vue'
  import { LocalesKey } from '/@/locales'
  import { APP_PROFILE, IDENTITIES } from '/@/configs/app.config'

  const { goLinks, isZhLang, i18n: _i18n } = useEnhancer()
  const instagramLatestMediasStore = useInstagramLatestMediasStore()

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
    <page-banner class="page-banner" background-video="/videos/clips/ocean-5.mp4" :background-video-y="72" cdn>
      <template #title>
        <webfont>
          <i18n zh="大千同在，萬象共棲" :en="`${APP_PROFILE.author}'s photographs`" />
        </webfont>
      </template>
      <template #description>
        <div class="links">
          <ulink class="item instagram" title="Instagram" :href="goLinks.instagram">
            <span class="username">@{{ IDENTITIES.INSTAGRAM_USERNAME }}</span>
          </ulink>
          <divider type="vertical" size="lg" color="#ffffffcc" />
          <ulink class="item xiaohongshu" title="小红书" :href="goLinks.xiaohongshu">
            <i class="iconfont icon-xiaohongshu"></i>
          </ulink>
        </div>
      </template>
    </page-banner>
    <div class="page-bridge"></div>
    <div class="page-content">
      <div class="container">
        <placeholder
          :loading="instagramLatestMediasStore.fetching"
          :has-data="!!instagramLatestMediasStore.data?.data.length"
        >
          <template #placeholder>
            <empty class="module-empty" bold size="large">
              <i18n :k="LocalesKey.EMPTY_PLACEHOLDER" />
            </empty>
          </template>
          <template #loading>
            <div class="module-skeleton">
              <skeleton class="item" v-for="i in 8" :key="i" />
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
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .photography-page {
    min-height: $full-page-content-height;
    overflow: hidden;

    .page-banner {
      .links {
        display: inline-flex;
        align-items: center;

        .item {
          line-height: 1;
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
      height: 3rem;
      background: linear-gradient(to right, transparent, $module-bg-opaque, transparent);
    }

    .page-content {
      margin: 3rem 0;

      .loadmore {
        margin-top: 3rem;

        .normal {
          color: $color-text-disabled;
          font-size: $font-size-h1;
        }

        .loading {
          margin: 0;
        }
      }
    }

    .module-skeleton {
      padding: 0;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-gap: 4rem;

      .item {
        height: 17.6rem;
        border: $gap solid $module-bg;
        @include mix.radius-box($radius-sm);
      }
    }

    .module-empty {
      min-height: 10rem;
    }
  }
</style>
