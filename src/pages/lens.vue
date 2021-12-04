<template>
  <div
    class="lens-page"
    :class="{
      mobile: isMobile,
      dark: isDarkTheme
    }"
  >
    <page-banner :position="38" :image="bannerImageUrl">
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
            <ulink class="button" :href="VALUABLE_LINKS.BILIBILI"> (゜-゜)つロ 干杯~ </ulink>
          </div>
          <div class="qrcode">
            <uimage class="image" cdn src="/images/page-lens/bilibili.jpg" />
          </div>
        </div>
        <div class="global">
          <ulink class="instagram" :href="VALUABLE_LINKS.INSTAGRAM">
            <i class="iconfont icon-instagram"></i>
            <span class="text">Follow me on Instagram</span>
          </ulink>
          <ulink class="youtube" :href="VALUABLE_LINKS.YOUTUBE">
            <i class="iconfont icon-youtube"></i>
            <span class="text">Subscribe my YouTube Channel</span>
          </ulink>
        </div>
        <div class="wechat-channel">
          <uimage cdn src="/images/page-lens/wechat-channel.jpg" />
        </div>
      </div>
      <div class="module-title plog">Plogs</div>
      <div class="module-title vlog">Vlogs</div>
      <placeholder
        :data="lensStore.vlogs.data.length"
        :loading="lensStore.vlogs.fetching"
        @after-enter="observeLozad"
      >
        <template #placeholder>
          <empty class="vlog-empty" key="empty">
            <i18n :lkey="LANGUAGE_KEYS.ARTICLE_PLACEHOLDER" />
          </empty>
        </template>
        <template #loading>
          <div class="vlog-loading" key="loading">Loading...</div>
        </template>
        <template #default>
          <ul class="videos" ref="videoListElement">
            <li
              class="item"
              @click="handlePlay(video)"
              :title="video.title"
              :key="index"
              v-for="(video, index) in lensStore.vlogs.data"
            >
              <div class="thumb">
                <div class="mask">
                  <div class="button">
                    <i class="iconfont icon-music-play" />
                  </div>
                </div>
                <span class="length">{{ video.length }}</span>
                <div class="background lozad" :data-background-image="getThumbUrl(video.pic)" />
              </div>
              <h5 class="title">
                <span class="text">{{ video.title }}</span>
              </h5>
              <p
                class="description"
                style="-webkit-box-orient: vertical"
                v-text="video.description || '-'"
              />
              <hr class="separator" />
              <p class="meta">
                <span class="item favorites">
                  <i class="iconfont icon-heart"></i>
                  <span>{{ video.favorites }}</span>
                </span>
                <span class="item play">
                  <i class="iconfont icon-video-play"></i>
                  <span>{{ video.play }}</span>
                </span>
                <span class="item comment">
                  <i class="iconfont icon-comment"></i>
                  <span>{{ video.comment }}</span>
                </span>
                <span class="item created">
                  <i class="iconfont icon-clock"></i>
                  <span>{{ humanlizeDate(video.created) }}</span>
                </span>
              </p>
            </li>
          </ul>
        </template>
      </placeholder>
      <div class="loadmore">
        <ulink class="button" :href="VALUABLE_LINKS.BILIBILI">
          <span class="icon">
            <i class="iconfont icon-bilibili"></i>
          </span>
          <i18n :lkey="LANGUAGE_KEYS.ARTICLE_LIST_LOADMORE" />
        </ulink>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { useUniversalFetch } from '/@/universal'
  import { useLensStore } from '/@/store/lens'
  import { LozadObserver, LOZAD_CLASS_NAME, LOADED_CLASS_NAME } from '/@/services/lozad'
  import { getFileProxyUrl, getFileCDNUrl } from '/@/transforms/url'
  import { timeAgo } from '/@/transforms/moment'
  import { firstUpperCase } from '/@/transforms/text'
  import { LANGUAGE_KEYS } from '/@/language/key'
  import { Language } from '/@/language/data'
  import { randomNumber } from '/@/utils/random'
  import { META, VALUABLE_LINKS } from '/@/config/app.config'
  import PageBanner from '/@/components/common/banner.vue'

  export default defineComponent({
    name: 'LensPage',
    components: {
      PageBanner
    },
    setup() {
      const { globalState, i18n, meta, isMobile, isDarkTheme, isZhLang } = useEnhancer()
      const lensStore = useLensStore()
      const lozadObserver = ref<LozadObserver | null>(null)
      const videoListElement = ref<HTMLElement>()
      const bannerImageUrl = getFileCDNUrl(`/images/page-lens/banner-${randomNumber(3)}.jpg`)

      meta(() => {
        const enTitle = firstUpperCase(i18n.t(LANGUAGE_KEYS.PAGE_LENS, Language.En)!)
        const titles = isZhLang.value ? [i18n.t(LANGUAGE_KEYS.PAGE_LENS), enTitle] : [enTitle]
        return { pageTitle: titles.join(' | '), description: `${META.author} 的 Vlog 视频` }
      })

      const humanlizeDate = (date: number) => {
        return timeAgo(date * 1000, i18n.language.value as any)
      }

      const getThumbUrl = (url: string) => {
        return getFileProxyUrl(
          `/bilibili/${url.replace('//', '')}@560w_350h.${globalState.imageExt.value.ext}`
        )
      }

      const handlePlay = (video: any) => {
        window.open(`https://www.bilibili.com/video/av${video.aid}`)
      }

      const fetchAllData = () => {
        return lensStore.fetchVlogs()
      }

      const observeLozad = () => {
        const lozadElements = videoListElement.value?.querySelectorAll(`.${LOZAD_CLASS_NAME}`)
        if (lozadElements?.length) {
          lozadObserver.value = window.$lozad(lozadElements, {
            loaded: (element) => element.classList.add(LOADED_CLASS_NAME)
          })
          lozadObserver.value.observe()
        }
      }

      onMounted(() => {
        observeLozad()
      })

      onBeforeUnmount(() => {
        lozadObserver.value?.observer.disconnect()
        lozadObserver.value = null
      })

      useUniversalFetch(() => fetchAllData())

      return {
        VALUABLE_LINKS,
        LANGUAGE_KEYS,
        lensStore,
        isMobile,
        isDarkTheme,
        videoListElement,
        humanlizeDate,
        getThumbUrl,
        getFileCDNUrl,
        handlePlay,
        observeLozad,
        bannerImageUrl
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
      margin: $lg-gap 0;

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
        margin-right: $gap;
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
            display: inline-block;
            margin-top: $gap * 2;
            color: inherit;
            height: 2em;
            line-height: 2em;
            padding: 0 $gap;
            border: 1px solid $white;
            border-radius: $xs-radius;
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
        margin-right: $gap;

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
            font-size: $font-size-h5;
            font-weight: bold;
          }
        }

        .instagram {
          margin-bottom: $gap;
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
      margin-bottom: $lg-gap;
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

    .videos {
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      list-style: none;
      justify-content: flex-start;

      > .item {
        display: block;
        margin-right: $lg-gap;
        margin-bottom: $lg-gap;
        width: calc((100% - #{$lg-gap * 2}) / 3);
        cursor: pointer;
        @include radius-box($sm-radius);
        @include common-bg-module();

        &:hover {
          .thumb {
            .background {
              transform: rotate(2deg) scale(1.1);
            }

            .mask {
              @include visible();
              .button {
                transform: scale(1);
              }
            }
          }

          .title .text {
            text-decoration: none;
            border-color: initial;
          }
        }

        &:nth-child(3n + 0) {
          margin-right: 0;
        }

        .thumb {
          width: 100%;
          height: 14rem;
          position: relative;
          overflow: hidden;
          background-color: $module-bg-darker-3;

          .background {
            width: 100%;
            height: 100%;
            background-size: cover;
            background-position: center;
            transform: rotate(0deg) scale(1);
            @include transform-transition($transition-time-normal);
          }

          .length {
            display: inline-block;
            position: absolute;
            bottom: 0;
            right: 0;
            z-index: $z-index-normal + 1;
            background-color: rgba($black, 0.6);
            height: $font-size-h2;
            line-height: $font-size-h2;
            padding: 0 $sm-gap;
            color: $white;
            font-size: $font-size-small;
          }

          .mask {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: $z-index-normal + 1;
            @include hidden();
            @include visibility-transition();

            .button {
              width: 5rem;
              height: 5rem;
              line-height: 5rem;
              text-align: center;
              background: $module-bg;
              border-radius: 100%;
              color: $text-reversal;
              opacity: 0.88;
              font-size: 3em;
              transform: scale(1.2);
              @include transform-transition($transition-time-normal);
            }
          }
        }

        > .title {
          padding: 0 $gap;
          margin-top: $gap;
          margin-bottom: $sm-gap;
          font-weight: bold;
          text-transform: capitalize;
          .text {
            border-bottom: 1px solid transparent;
          }
        }

        > .description {
          padding: 0 $gap;
          margin-bottom: $sm-gap;
          line-height: 2rem;
          height: 2rem;
          font-size: $font-size-h6;
        }

        > .separator {
          border-top: 1px dotted $module-bg-darker-1;
          margin: 0;
        }

        > .meta {
          margin: 0;
          height: 3rem;
          display: flex;
          justify-content: space-around;
          align-items: center;
          font-size: $font-size-small;

          > .item {
            font-weight: 400;
            color: $text-secondary;

            .iconfont {
              margin-right: $xs-gap;
            }
          }
        }
      }
    }

    .vlog-empty,
    .vlog-loading {
      @include radius-box($sm-radius);
      @include common-bg-module();
      min-height: 10rem;
      margin-bottom: $gap;
    }

    .vlog-loading {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: $font-size-h3;
    }

    .loadmore {
      margin-bottom: $lg-gap;

      .button {
        display: block;
        width: 100%;
        height: $button-block-height;
        line-height: $button-block-height;
        text-align: center;
        @include common-bg-module();
        @include radius-box($xs-radius);

        > .icon {
          margin-right: $gap;
        }
      }
    }

    &.dark {
      .videos {
        .item {
          .thumb {
            .button {
              color: $text-disabled !important;
            }
          }
        }
      }
    }

    &.mobile {
      min-height: auto;

      .loadmore {
        margin: 0;
      }

      .banner {
        height: 12rem;
        margin-bottom: $gap;
        @include radius-box($sm-radius);

        .title {
          font-size: $font-size-h1;
          margin-bottom: $gap;
        }
        .description {
          margin: 0;
        }
      }

      .container {
        width: 100%;

        .header {
          height: auto;
          flex-wrap: wrap;

          .bilibili,
          .global {
            height: 16rem;
            margin: 0;
            margin-bottom: $gap;
          }
          .bilibili,
          .global,
          .wechat-channel {
            width: 100%;
          }
        }

        .videos {
          > .item {
            width: 100%;
            height: auto;
            margin-right: 0;
            margin-bottom: $gap;

            > .thumb {
              height: 10rem;
            }
          }
        }
      }
    }
  }
</style>
