<script lang="ts" setup>
  import { ref, shallowRef, shallowReactive, computed } from 'vue'
  import { useStores } from '/@/stores'
  import { useEnhancer } from '/@/app/enhancer'
  import { usePageSeo } from '/@/composables/head'
  import { useUniversalFetch } from '/@/app/universal'
  import { Language, LanguageKey } from '/@/language'
  import { firstUpperCase } from '/@/transforms/text'
  import { APP_META, IDENTITIES, VALUABLE_LINKS } from '/@/configs/app.config'
  import type { InstagramMediaItem, InstagramMediaListResponse } from '/@/server/getters/instagram'
  import { isClient } from '/@/configs/app.env'
  import { delayPromise } from '/@/utils/delayer'
  import { TunnelModule } from '/@/constants/tunnel'
  import tunnel from '/@/services/tunnel'
  import PageBanner from '/@/components/common/banner.vue'
  import Loadmore from '/@/components/common/loadmore.vue'
  import InstagramGrid from './grid.vue'

  const { instagramLatestMedias } = useStores()
  const { i18n: _i18n, isZhLang } = useEnhancer()

  const loading = ref(false)
  const medias = shallowReactive<Array<InstagramMediaItem>>([])
  const lastPaging = shallowRef<InstagramMediaListResponse['paging'] | null>(null)
  const finished = computed(() => Boolean(lastPaging.value && !lastPaging.value.next))
  const fetchMoreMedias = async () => {
    try {
      loading.value = true
      const request = tunnel.dispatch<InstagramMediaListResponse>(TunnelModule.InstagramMedias, {
        after: lastPaging.value?.cursors.after ?? instagramLatestMedias.data?.paging?.cursors.after
      })
      const response = await (isClient ? delayPromise(360, request) : request)
      medias.push(...response.data)
      lastPaging.value = response.paging
    } finally {
      loading.value = false
    }
  }

  const allMedias = computed(() => {
    const latestMedias = instagramLatestMedias.data?.data ?? []
    return [...latestMedias, ...medias]
  })

  usePageSeo(() => {
    const enTitle = firstUpperCase(_i18n.t(LanguageKey.PAGE_PHOTOGRAPHY, Language.English)!)
    const titles = isZhLang.value ? [_i18n.t(LanguageKey.PAGE_PHOTOGRAPHY)!, enTitle] : [enTitle]
    const description = isZhLang.value ? `${APP_META.author} 的摄影作品` : `${APP_META.author}'s photographs`
    return {
      pageTitles: titles,
      description: description
    }
  })

  useUniversalFetch(() => instagramLatestMedias.fetch())
</script>

<template>
  <div class="photography-page">
    <page-banner class="page-banner" video="/videos/clips/ocean-5.mp4" :video-position="72" cdn>
      <template #title>
        <webfont>
          <i18n zh="大千同在，万象共栖" :en="`${APP_META.author}'s photographs`" />
        </webfont>
      </template>
      <template #description>
        <div class="links">
          <ulink class="item instagram" title="Instagram" :href="VALUABLE_LINKS.INSTAGRAM">
            <span class="username">@{{ IDENTITIES.INSTAGRAM_USERNAME }}</span>
          </ulink>
          <divider type="vertical" size="lg" color="#ffffffcc" />
          <ulink class="item xiaohongshu" title="小红书" :href="VALUABLE_LINKS.XIAOHONGSHU">
            <i class="iconfont icon-xiaohongshu"></i>
          </ulink>
        </div>
      </template>
    </page-banner>
    <container class="page-bridge"></container>
    <container class="page-content">
      <placeholder :data="instagramLatestMedias.data?.data" :loading="instagramLatestMedias.fetching">
        <template #placeholder>
          <empty class="module-empty" key="empty">
            <i18n :k="LanguageKey.EMPTY_PLACEHOLDER" />
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
              v-if="!instagramLatestMedias.fetching && !finished"
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
