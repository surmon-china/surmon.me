<template>
  <div
    class="lens-page"
    :class="{
      mobile: isMobile,
      dark: isDarkTheme
    }"
  >
    <div class="header">
      <div class="bilibili">
        <div class="left">
          <i class="iconfont icon-bilibili"></i>
          <a
            href="https://space.bilibili.com/27940710"
            target="_blank"
            class="button"
            rel="external nofollow noopenter"
          >(゜-゜)つロ 干杯~</a>
        </div>
        <uimage class="image" cdn src="/images/bilibili.jpg" />
      </div>
      <div class="global">
        <a
          class="instagram"
          href="https://www.instagram.com/surmon666"
          target="_blank"
          rel="external nofollow noopenter"
        >
          <i class="iconfont icon-instagram"></i>
          <span class="button">Instagram</span>
        </a>
        <a
          class="youtube"
          href="https://www.youtube.com/channel/UCoL-j6T28PLSJ2U6ZdONS0w"
          target="_blank"
          rel="external nofollow noopenter"
        >
          <i class="iconfont icon-youtube"></i>
          <span class="button">YouTube</span>
        </a>
      </div>
      <div class="wechat-channel" data-placeholder="Scan QR code on Wechat">
        <uimage cdn src="/images/wechat-channel.jpg" />
      </div>
      <div class="douyin" data-placeholder="Scan TikCode on Douyin">
        <uimage cdn src="/images/douyin.jpg" />
      </div>
    </div>
    <div class="title-split">Vlogs</div>
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
        <h5 class="title" v-text="video.title" />
        <p
          class="description"
          style="-webkit-box-orient: vertical;"
          v-text="video.description || '-'"
        />
        <hr class="split">
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
        rel="external nofollow noopenter"
      >
        <span class="icon">
          <i class="iconfont icon-bilibili"></i>
        </span>
        <span v-i18n="LANGUAGE_KEYS.ARTICLE_LIST_LOADMORE" />
      </a>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, computed, onMounted, onBeforeUnmount } from 'vue'
  import { useStore, getNamespace, Modules } from '/@/store'
  import { VlogModuleActions } from '/@/store/vlog'
  import { LozadObserver } from '/@/services/lozad'
  import { useEnhancer } from '/@/enhancer'
  import { LANGUAGE_KEYS } from '/@/language/key'
  import { timeAgo } from '/@/transforms/moment'
  import { getFileProxyUrl } from '/@/transforms/url'

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
        return getFileProxyUrl(`/bilibili/${url.replace('//', '')}@560w_350h.${globalState.imageExt.ext.value}`)
      }

      const handlePlay = (video: any) => {
        window.open(`https://www.bilibili.com/video/av${video.aid}`)
      }

      onMounted(() => {
        const lozadElements = videoListElement.value?.querySelectorAll('.lozad')
        if (!lozadElements || !lozadElements.length) {
          return false
        }
        lozadObserver.value = window.lozad(lozadElements, {
          loaded: element => element.classList.add('loaded')
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
    min-height: 40rem;
    $bilibili-blue-primary: #00a1d6;
    $bilibili-red-primary: #fb7299;

    .header {
      display: flex;
      width: 100%;
      height: 200px;
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
        border: 2px solid $bilibili-blue-primary;

        .left {
          flex-grow: 1;
          height: 100%;
          text-align: center;
          background-color: $bilibili-blue-primary;
          color: $white;

          .iconfont {
            display: block;
            margin-top: $sm-gap;
            font-size: 6em;
          }

          .button {
            display: inline-block;
            margin-top: $sm-gap;
            color: inherit;
            height: 2em;
            line-height: 2em;
            padding: 0 $gap;
            border: 1px solid $white;
            border-radius: $xs-radius;
            opacity: .8;
            &:hover {
              opacity: 1;
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
          color: $white;
          opacity: 0.9;
          &:hover {
            opacity: 1;
          }

          .iconfont {
            font-size: $font-size-h1;
            margin-bottom: $gap;
          }

          .button {
            display: inline-block;
            height: 1.6em;
            line-height: 1.5em;
            padding: 0 $sm-gap;
            border: 1px solid $white;
            border-radius: $xs-radius;
            font-size: $font-size-small;
          }
        }

        .instagram {
          margin-bottom: $gap;
          background: #f09433;
          background: linear-gradient(
            45deg,
            #f09433 0%,
            #e6683c 25%,
            #dc2743 50%,
            #cc2366 75%,
            #bc1888 100%
          );
          @include visibility-transition();
        }

        .youtube {
          background-color: #ec3323;
        }
      }

      .wechat-channel {
        margin-right: $gap;
      }

      .wechat-channel,
      .douyin {
        position: relative;
        flex-shrink: 0;
        height: 100%;
        background-color: $module-bg;
        opacity: 0.9;
        &:hover {
          opacity: 1;
        }

        img {
          width: auto;
          height: 100%;
        }

        &::before {
          $height: 4rem;
          content: attr(data-placeholder);
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: $height;
          line-height: $height;
          text-align: center;
          font-size: $font-size-small;
          font-weight: bold;
          background-color: $module-bg-opaque;
          @include hidden();
          @include visibility-transition();
        }

        &:hover {
          &::before {
            @include visible();
          }
        }
      }
    }

    .title-split {
      margin-bottom: $lg-gap;
      line-height: 3.6em;
      border-width: 4px;
      border-style: dashed;
      border-color:
        $bilibili-blue-primary
        $bilibili-red-primary
        $bilibili-red-primary
        $bilibili-blue-primary;
      background-color: $module-bg-opaque;
      text-align: center;
      font-size: $font-size-h3;
      font-weight: bold;
      text-transform: uppercase;
      color: $bilibili-blue-primary;
      letter-spacing: 5px;
      user-select: none;
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

          .title {
            text-decoration: underline;
          }
        }

        &:nth-child(3n + 0) {
          margin-right: 0;
        }

        .thumb {
          width: 100%;
          height: 13rem;
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
        }

        > .description {
          padding: 0 $gap;
          margin-bottom: $sm-gap;
          line-height: 2rem;
          height: 2rem;
          font-size: $font-size-h6;
        }

        > .split {
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
      > .button {
        display: block;
        width: 100%;
        height: $block-button-height;
        line-height: $block-button-height;
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

          > .split {
            border-color: $module-bg-hover;
          }
        }
      }
    }

  }
</style>
