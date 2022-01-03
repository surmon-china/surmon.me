<template>
  <div class="lens-page" :class="{ dark: isDarkTheme }">
    <page-banner :position="38" :image="bannerImageURL">
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
      <div class="header">
        <div class="bilibili">
          <div class="left">
            <i class="iconfont icon-bilibili-full"></i>
            <ulink
              class="button"
              :href="VALUABLE_LINKS.BILIBILI"
              @mousedown="handleGTagEvent('bilibili_homepage')"
            >
              (゜-゜)つロ 干杯~
            </ulink>
          </div>
          <div class="qrcode">
            <uimage cdn class="image" src="/images/page-lens/bilibili.jpg" />
          </div>
        </div>
        <div class="global">
          <ulink
            class="instagram"
            :href="VALUABLE_LINKS.INSTAGRAM"
            @mousedown="handleGTagEvent('instagram_link')"
          >
            <i class="iconfont icon-instagram"></i>
            <span class="text">Follow me on Instagram</span>
          </ulink>
          <ulink
            class="youtube"
            :href="VALUABLE_LINKS.YOUTUBE"
            @mousedown="handleGTagEvent('youtube_link')"
          >
            <i class="iconfont icon-youtube"></i>
            <span class="text">Subscribe my YouTube</span>
          </ulink>
        </div>
        <div class="wechat-channel">
          <uimage cdn src="/images/page-lens/wechat-channel.jpg" />
        </div>
      </div>
      <div class="module-title plog">Plogs</div>
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
      <div class="module-title vlog">Vlogs</div>
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
  import { GAEventCategories } from '/@/constants/gtag'
  import { firstUpperCase } from '/@/transforms/text'
  import { LANGUAGE_KEYS } from '/@/language/key'
  import { Language } from '/@/language/data'
  import { randomNumber } from '/@/utils/random'
  import { META, VALUABLE_LINKS } from '/@/config/app.config'
  import PageBanner from '/@/components/common/banner.vue'
  import LensSkeleton from './skeleton.vue'
  import Plogs from './plogs.vue'
  import Vlogs from './vlogs.vue'

  // plogs https://github.com/bertrandom/icloud-shared-album-to-flickr/blob/master/app.js
  export default defineComponent({
    name: 'LensPage',
    components: {
      PageBanner,
      LensSkeleton,
      Plogs,
      Vlogs
    },
    setup() {
      const { i18n, meta, gtag, isDarkTheme, isZhLang } = useEnhancer()
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

      const handleGTagEvent = (event: string) => {
        gtag?.event(event, {
          event_category: GAEventCategories.Lens
        })
      }

      const fetchAllData = () => {
        return Promise.all([lensStore.fetchPlogs(), lensStore.fetchVlogs()])
      }

      useUniversalFetch(() => fetchAllData())

      return {
        VALUABLE_LINKS,
        LANGUAGE_KEYS,
        lensStore,
        isDarkTheme,
        handleGTagEvent,
        bannerImageURL
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/init.scss';

  .lens-page {
    .header {
      display: flex;
      width: 100%;
      height: 18rem;
      margin: $gap * 2 0;

      .bilibili,
      .instagram,
      .youtube,
      .wechat-channel {
        @include radius-box($sm-radius);
      }

      .bilibili {
        flex-shrink: 0;
        display: flex;
        width: 52%;
        height: 100%;
        margin-right: $gap * 2;
        border: 2px solid $bilibili-pink-primary;

        .left {
          flex-grow: 1;
          height: 100%;
          text-align: center;
          background-color: $bilibili-pink-primary;
          color: $white;

          .iconfont {
            display: block;
            margin-top: $gap * 2;
            font-size: 5em;
          }

          .button {
            display: inline-flex;
            justify-content: center;
            align-items: center;
            width: 50%;
            height: 3rem;
            margin-top: $gap * 2;
            border: 2px solid $white;
            border-radius: $xs-radius;
            font-weight: bold;
            color: inherit;
            &:hover {
              color: $bilibili-pink-primary;
              background-color: $white;
            }
          }
        }

        .qrcode {
          flex-shrink: 0;
          height: 100%;
          width: 18rem;
          text-align: center;
          background-color: #fbfbfd;
        }

        .image {
          height: 100%;
          width: auto;
        }
      }

      .global {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        margin-right: $gap * 2;

        .instagram,
        .youtube {
          flex-grow: 1;
          display: flex;
          flex-direction: row;
          justify-content: start;
          align-items: center;
          transition: opacity $transition-time-fast;
          color: $white;
          opacity: 0.9;
          &:hover {
            opacity: 1;
          }

          .iconfont {
            font-size: $font-size-h2 * 2;
            margin-left: $gap * 2;
            margin-right: $gap;
          }

          .text {
            font-weight: bold;
            font-size: $font-size-h4;
          }
        }

        .instagram {
          margin-bottom: $lg-gap;
          background: $instagram-primary;
          background: $instagram-gradient;
          @include visibility-transition();
        }

        .youtube {
          background-color: $youtube-primary;
        }
      }

      .wechat-channel {
        width: 184px;
        height: 100%;
        background-color: $module-bg;
        border: 2px solid #fa9d3b;

        img {
          width: auto;
          height: 100%;
        }
      }
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
