<template>
  <div
    class="lens-page"
    :class="{
      mobile: isMobile,
      dark: isDarkTheme
    }"
  >
    <div class="banner">
      <div class="content container">
        <p class="title">
          <i18n
            zh="凡心所向，素履以往"
            en="Because it's there"
          />
        </p>
        <p class="description">
          <i18n>
            <template #zh>生如逆旅，一苇以航</template>
            <template #en>"why did you want to climb mount Everest?"</template>
          </i18n>
        </p>
      </div>
    </div>
    <div class="container">
      <div class="header">
        <div class="bilibili">
          <div class="left">
            <i class="iconfont icon-bilibili-full"></i>
            <a
              href="https://space.bilibili.com/27940710"
              target="_blank"
              class="button"
              rel="external nofollow noopener"
            >(゜-゜)つロ 干杯~</a>
          </div>
          <uimage class="image" cdn src="/images/page-lens/bilibili.jpg" />
        </div>
        <div class="global">
          <a
            class="instagram"
            href="https://www.instagram.com/surmon666"
            target="_blank"
            rel="external nofollow noopener"
          >
            <i class="iconfont icon-instagram"></i>
            <span class="text">Follow me on Instagram</span>
          </a>
          <a
            class="youtube"
            href="https://www.youtube.com/channel/UCoL-j6T28PLSJ2U6ZdONS0w"
            target="_blank"
            rel="external nofollow noopener"
          >
            <i class="iconfont icon-youtube"></i>
            <span class="text">Subscription my YouTube Channel</span>
          </a>
        </div>
        <div class="wechat-channel">
          <uimage cdn src="/images/page-lens/wechat-channel.jpg" />
        </div>
        <div class="douyin">
          <uimage cdn src="/images/page-lens/douyin.jpg" />
        </div>
      </div>
      <div class="vlog-title">Vlogs</div>
      <ul class="videos" ref="videoListElement">
        <li
          class="item"
          @click="handlePlay(video)"
          :title="video.title"
          :key="index"
          v-for="(video, index) in videoList"
        >
          <div class="thumb">
            <div class="mask">
              <div class="button">
                <i class="iconfont icon-music-play" />
              </div>
            </div>
            <span class="length">{{ video.length }}</span>
            <div
              class="background lozad"
              :data-background-image="getThumbUrl(video.pic)"
            />
          </div>
          <h5 class="title">
            <span class="text">{{ video.title }}</span>
          </h5>
          <p
            class="description"
            style="-webkit-box-orient: vertical;"
            v-text="video.description || '-'"
          />
          <hr class="separator">
          <p class="meta">
            <span class="item favorites">
              <i class="iconfont icon-like"></i>
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
      <div class="loadmore">
        <a
          href="https://space.bilibili.com/27940710/video"
          target="_blank"
          class="button"
          rel="external nofollow noopener"
        >
          <span class="icon">
            <i class="iconfont icon-bilibili"></i>
          </span>
          <span v-i18n="LANGUAGE_KEYS.ARTICLE_LIST_LOADMORE" />
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, computed, onMounted, onBeforeUnmount } from 'vue'
  import { useStore, getNamespace, Modules } from '/@/store'
  import { VlogModuleActions } from '/@/store/vlog'
  import { LozadObserver, LOZAD_CLASS_NAME, LOADED_CLASS_NAME } from '/@/services/lozad'
  import { useEnhancer } from '/@/enhancer'
  import { LANGUAGE_KEYS } from '/@/language/key'
  import { getFileProxyUrl } from '/@/transforms/url'
  import { timeAgo } from '/@/transforms/moment'

  export default defineComponent({
    name: 'Lens',
    // head() {
    //   return {
    //     title: `${this.isEnLang ? '' : this.$i18n.nav.vlog + ' | '}Lens`
    //   }
    // },
    async setup() {
      const { globalState, i18n, store, isMobile, isDarkTheme } = useEnhancer()

      const lozadObserver = ref<LozadObserver | null>(null)
      const videoListElement = ref<HTMLElement>()
      const isFetching = computed(() => store.state.vlog.fetching)
      const videoData = computed(() => store.state.vlog.data)
      const videoList = computed(() => videoData.value?.vlist)
      const isCanLoadMore = computed(() => {
        const { pages, count } = videoData.value
        return !!count && pages > 1
      })

      const humanlizeDate = (date: number) => {
        return timeAgo(date * 1000, i18n.language.value as any)
      }

      const getThumbUrl = (url: string) => {
        return getFileProxyUrl(`/bilibili/${url.replace('//', '')}@560w_350h.${globalState.imageExt.ext}`)
      }

      const handlePlay = (video: any) => {
        window.open(`https://www.bilibili.com/video/av${video.aid}`)
      }

      onMounted(() => {
        const lozadElements = videoListElement.value?.querySelectorAll(`.${LOZAD_CLASS_NAME}`)
        if (!lozadElements || !lozadElements.length) {
          return false
        }
        lozadObserver.value = window.lozad(lozadElements, {
          loaded: element => element.classList.add(LOADED_CLASS_NAME)
        })
        lozadObserver.value.observe()
      })

      onBeforeUnmount(() => {
        lozadObserver.value = null
      })

      await store.dispatch(getNamespace(Modules.Vlog, VlogModuleActions.FetchVideos))

      return {
        LANGUAGE_KEYS,
        isMobile,
        isDarkTheme,
        isFetching,
        videoListElement,
        videoList,
        isCanLoadMore,
        humanlizeDate,
        getThumbUrl,
        handlePlay,
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/assets/styles/init.scss';

  .lens-page {

    .banner {
      margin-bottom: $lg-gap;
      height: $full-column-page-banner-height;
      background: $module-bg-darker-1 cdn-url('/images/page-lens/banner.jpg');
      background-size: cover;
      background-position: center 40%;

      .content {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: $white;
      }

      .title {
        font-size: 3em;
        font-weight: bold;
        margin-bottom: $lg-gap * 2;
      }
      .description {
        font-size: $font-size-h4;
      }
    }

    .header {
      display: flex;
      width: 100%;
      height: 18rem;
      margin-bottom: $lg-gap;

      .bilibili,
      .instagram,
      .youtube,
      .wechat-channel,
      .douyin {
        @include radius-box($sm-radius);
      }

      .bilibili {
        flex-shrink: 0;
        display: flex;
        width: 40%;
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

        .image {
          flex-shrink: 0;
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
          flex-direction: column;
          justify-content: center;
          align-items: center;
          transition: opacity $transition-time-fast;
          color: $white;
          opacity: 0.9;
          &:hover {
            opacity: 1;
          }

          .iconfont {
            font-size: $font-size-h4 * 2;
            margin-bottom: $xs-gap;
          }

          .text {
            display: inline-block;
            line-height: 1.5em;
            font-size: $font-size-small;
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
        margin-right: $gap;
      }

      .wechat-channel,
      .douyin {
        height: 100%;
        flex-shrink: 0;
        background-color: $module-bg;

        img {
          width: auto;
          height: 100%;
        }
      }
    }

    .vlog-title {
      margin-bottom: $lg-gap;
      line-height: 3.6em;
      border-width: 4px;
      border-style: double;
      border-radius: $lg-radius;
      border-color:
        $bilibili-pink-primary
        $bilibili-blue-primary
        $bilibili-blue-primary
        $bilibili-pink-primary;
      background-color: $module-bg-opaque;
      text-align: center;
      font-size: $font-size-h3;
      font-weight: bold;
      text-transform: uppercase;
      color: $bilibili-blue-primary;
      letter-spacing: 5px;
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
              transform: rotate(2deg) scale(1.1),
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

          .background {
            width: 100%;
            height: 100%;
            background-color: $module-bg-darker-2;
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
      .banner {
        background-blend-mode: difference;
      }
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

      > .videos {
        > .item {
          width: 100%;
          height: auto;
          flex-grow: 1;
          margin-right: 0;
          margin-bottom: $gap;

          > .thumb {
            height: 10rem;
          }

          > .separator {
            border-color: $module-bg-hover;
          }
        }
      }
    }
  }
</style>
