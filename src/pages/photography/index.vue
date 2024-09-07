<script lang="ts" setup>
  import { ref, shallowRef, shallowReactive, computed } from 'vue'
  import { useStores } from '/@/stores'
  import { useEnhancer } from '/@/app/enhancer'
  import { useUniversalFetch } from '/@/universal'
  import { Language, LanguageKey } from '/@/language'
  import { firstUpperCase } from '/@/transforms/text'
  import { META, VALUABLE_LINKS } from '/@/config/app.config'
  import type { InstagramMediaItem, InstagramMediaListResponse } from '/@/server/getters/instagram'
  import { isClient } from '/@/app/environment'
  import { delayPromise } from '/@/utils/delayer'
  import { TunnelModule } from '/@/constants/tunnel'
  import tunnel from '/@/services/tunnel'
  import PageBanner from '/@/components/common/banner.vue'
  import Loadmore from '/@/components/common/loadmore.vue'
  import InstagramGrid from './grid.vue'

  const { instagramProfile, instagramLatestMedias } = useStores()
  const { i18n: _i18n, seoMeta, isZhLang } = useEnhancer()

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

  seoMeta(() => {
    const enTitle = firstUpperCase(_i18n.t(LanguageKey.PAGE_PHOTOGRAPHY, Language.English)!)
    const titles = isZhLang.value ? [_i18n.t(LanguageKey.PAGE_PHOTOGRAPHY), enTitle] : [enTitle]
    const description = isZhLang.value ? `${META.author} 的摄影作品` : `${META.author}'s photographs`
    return {
      pageTitle: titles.join(' | '),
      description: description
    }
  })

  useUniversalFetch(() => Promise.all([instagramProfile.fetch(), instagramLatestMedias.fetch()]))
</script>

<template>
  <div class="photography-page">
    <page-banner class="page-banner" video="/videos/clips/ocean-5.mp4" :video-position="72" cdn>
      <template #title>
        <webfont>
          <i18n zh="大千同在，万象共栖" :en="`${META.author}'s photographs`" />
        </webfont>
      </template>
      <template #description>
        <client-only>
          <ulink class="link" :href="VALUABLE_LINKS.INSTAGRAM">
            <i class="iconfont icon-instagram"></i>
            {{ instagramProfile.data?.name ?? '-' }}
          </ulink>
          <divider type="vertical" size="lg" color="#ffffffcc" />
          {{ instagramProfile.data?.mediaCount ?? '-' }} <i18n zh="帖子" en="posts" />
          <divider type="vertical" size="lg" color="#ffffffcc" />
          {{ instagramProfile.data?.followerCount ?? '-' }} <i18n zh="粉丝" en="followers" />
        </client-only>
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
  @import '/src/styles/variables.scss';
  @import '/src/styles/mixins.scss';

  .photography-page {
    min-height: $full-page-active-content-height;

    .page-banner {
      .link {
        color: $white;
        text-decoration: underline;
        text-underline-offset: 6px;
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
        @include radius-box($radius-xs);
        @include common-bg-module();
      }
    }

    .module-empty {
      font-weight: bold;
      font-size: $font-size-h3;
    }
  }
</style>
