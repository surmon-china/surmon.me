<template>
  <div class="lens-page" :class="{ dark: isDarkTheme }">
    <page-banner :blur="false" :position="36" :image="bannerImageURL">
      <template #title>
        <i18n zh="凡心所向，素履以往" en="Because it's there" />
      </template>
      <template #description>
        <i18n>
          <template #zh>生如逆旅，一苇以航</template>
          <template #en>"why did you want to climb mount Everest?"</template>
        </i18n>
      </template>
    </page-banner>
    <div class="container">
      <socials class="header" />
      <div class="module-title plog">Instagram · Plogs</div>
      <placeholder :data="lensStore.plogs.data" :loading="lensStore.plogs.fetching">
        <template #placeholder>
          <empty class="module-empty" key="empty">
            <i18n :lkey="LANGUAGE_KEYS.ARTICLE_PLACEHOLDER" />
          </empty>
        </template>
        <template #loading>
          <lens-skeleton class="module-loading" :count="3" key="loading" />
        </template>
        <template #default>
          <plogs :plogs="lensStore.plogs.data" />
        </template>
      </placeholder>
      <div class="module-title vlog">BiliBili · Vlogs</div>
      <placeholder :data="lensStore.vlogs.data" :loading="lensStore.vlogs.fetching">
        <template #placeholder>
          <empty class="module-empty" key="empty">
            <i18n :lkey="LANGUAGE_KEYS.ARTICLE_PLACEHOLDER" />
          </empty>
        </template>
        <template #loading>
          <lens-skeleton class="module-loading" key="loading" />
        </template>
        <template #default>
          <vlogs :vlogs="lensStore.vlogs.data" />
        </template>
      </placeholder>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { useLensStore } from '/@/store/lens'
  import { useUniversalFetch, universalRef } from '/@/universal'
  import { firstUpperCase } from '/@/transforms/text'
  import { LANGUAGE_KEYS } from '/@/language/key'
  import { Language } from '/@/language/data'
  import { randomNumber } from '/@/utils/random'
  import { META } from '/@/config/app.config'
  import PageBanner from '/@/components/common/banner.vue'
  import LensSkeleton from './skeleton.vue'
  import Socials from './socials.vue'
  import Plogs from './plogs.vue'
  import Vlogs from './vlogs.vue'

  // plogs https://github.com/bertrandom/icloud-shared-album-to-flickr/blob/master/app.js
  export default defineComponent({
    name: 'LensPage',
    components: {
      PageBanner,
      LensSkeleton,
      Socials,
      Plogs,
      Vlogs
    },
    setup() {
      const { i18n, meta, isDarkTheme, isZhLang } = useEnhancer()
      const lensStore = useLensStore()
      const bannerImageURL = universalRef(
        'page-lens-banner',
        () => `/images/page-lens/banner-${randomNumber(2)}.jpg`
      )

      meta(() => {
        const enTitle = firstUpperCase(i18n.t(LANGUAGE_KEYS.PAGE_LENS, Language.En)!)
        const titles = isZhLang.value ? [i18n.t(LANGUAGE_KEYS.PAGE_LENS), enTitle] : [enTitle]
        return { pageTitle: titles.join(' | '), description: `${META.author} 的 Vlog 视频` }
      })

      const fetchAllData = () => {
        return Promise.all([lensStore.fetchPlogs(), lensStore.fetchVlogs()])
      }

      useUniversalFetch(() => fetchAllData())

      return {
        LANGUAGE_KEYS,
        lensStore,
        isDarkTheme,
        bannerImageURL
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/init.scss';

  .lens-page {
    .header {
      margin: $gap * 2 0;
    }

    .module-title {
      margin-bottom: $gap * 2;
      line-height: 3.6em;
      border-width: 4px;
      border-style: double;
      border-radius: $lg-radius;
      background-color: $module-bg-opaque;
      text-align: center;
      font-size: $font-size-h3;
      font-weight: bold;
      text-transform: uppercase;
      letter-spacing: 5px;

      &.plog {
        color: $instagram-primary;
        border-image: $instagram-gradient 30;
      }

      &.vlog {
        color: $bilibili-blue-primary;
        border-color: $bilibili-pink-primary $bilibili-blue-primary $bilibili-blue-primary
          $bilibili-pink-primary;
      }
    }

    .module-empty {
      @include radius-box($sm-radius);
      @include common-bg-module();
      min-height: 18rem;
      margin-bottom: $gap * 2;
      font-size: $font-size-h3;
    }

    .module-loading {
      margin-bottom: $lg-gap;
    }
  }
</style>
