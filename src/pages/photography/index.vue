<script lang="ts" setup>
  import { ref, shallowRef, shallowReactive, computed } from 'vue'
  import { useStores } from '/@/stores'
  import { useEnhancer } from '/@/app/enhancer'
  import { useUniversalFetch } from '/@/universal'
  import { Language, LanguageKey } from '/@/language'
  import { firstUpperCase } from '/@/transforms/text'
  import { META } from '/@/config/app.config'
  import type { InstagramMediaItem, InstagramMediaListResponse } from '/@/server/getters/instagram'
  import { TunnelModule } from '/@/constants/tunnel'
  import tunnel from '/@/services/tunnel'
  import InstagramBanner from './banner.vue'
  import InstagramGrid from './grid.vue'
  import InstagramLoadmore from './loadmore.vue'

  const { instagramTimeline } = useStores()
  const { i18n: _i18n, seoMeta, isZhLang } = useEnhancer()

  const loading = ref(false)
  const medias = shallowReactive<Array<InstagramMediaItem>>([])
  const lastPaging = shallowRef<InstagramMediaListResponse['paging'] | null>(null)
  const finished = computed(() => Boolean(lastPaging.value && !lastPaging.value.next))
  const fetchMoreMedias = async () => {
    try {
      loading.value = true
      const response = await tunnel.dispatch<InstagramMediaListResponse>(TunnelModule.InstagramMedias, {
        after: lastPaging.value?.cursors.after ?? instagramTimeline.data?.paging?.cursors.after
      })
      medias.push(...response.data)
      lastPaging.value = response.paging
    } finally {
      loading.value = false
    }
  }

  const allMedias = computed(() => {
    const timeline = instagramTimeline.data?.data ?? []
    return [...timeline, ...medias]
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

  // Page errors are not considered even if the request fails
  useUniversalFetch(() => instagramTimeline.fetch().catch(() => {}))
</script>

<template>
  <div class="photography-page">
    <instagram-banner />
    <container class="page-bridge"></container>
    <container class="page-content">
      <placeholder :data="instagramTimeline.data?.data" :loading="instagramTimeline.fetching">
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
            <instagram-loadmore
              v-if="!instagramTimeline.fetching && !finished"
              class="loadmore"
              :loading="loading"
              @loadmore="fetchMoreMedias"
            />
          </div>
        </template>
      </placeholder>
    </container>
  </div>
</template>

<style lang="scss" scoped>
  @import 'src/styles/variables.scss';
  @import 'src/styles/mixins.scss';

  .photography-page {
    min-height: $full-page-active-content-height;

    .page-bridge {
      position: relative;
      height: 4rem;
      background: linear-gradient(to right, transparent, $module-bg-opaque, transparent);
    }

    .page-content {
      margin: 4rem 0;

      .loadmore {
        margin-top: 4rem;
      }
    }

    .module-loading {
      padding: 0;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-gap: $gap * 5;

      .item {
        padding: $gap;
        height: 20rem;
        @include radius-box($xs-radius);
        @include common-bg-module();
      }
    }

    .module-empty {
      font-weight: bold;
      font-size: $font-size-h3;
    }
  }
</style>
