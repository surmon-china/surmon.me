<template>
  <div class="lens-page" :class="{ mobile: isMobile }">
    <div class="header">
      <div class="item">ins</div>
      <div class="item">douyin</div>
      <div class="item">bilibili</div>
      <div class="item">Wechat Channels</div>
    </div>
    <ul ref="videoListElement" class="video-list">
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
          <i class="iconfont icon-lens"></i>
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
  import { useI18n } from '/@/services/i18n'
  import { LozadObserver } from '/@/services/lozad'
  import { useGlobalState } from '/@/state'
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
      const i18n = useI18n()
      const store = useStore()
      const globalState = useGlobalState()
      const isMobile = computed(() => globalState.userAgent.isMobile)

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

    &.mobile {
      min-height: auto;

      > .video-list {
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
            border-color: $module-hover-bg;
          }
        }
      }
    }

    > .video-list {
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
        background-color: $module-bg;
        cursor: pointer;
        @include background-transition();

        &:hover {
          background-color: $module-hover-bg;

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

          > .split {
            border-color: $module-hover-bg-darken-10;
          }
        }

        &:nth-child(3n + 0) {
          margin-right: 0;
        }

        > .thumb {
          width: 100%;
          height: 13rem;
          position: relative;
          overflow: hidden;

          .background {
            width: 100%;
            height: 100%;
            background-color: $module-hover-bg-darken-10;
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
            background-color: $module-hover-bg-darken-40;
            height: $font-size-h2;
            line-height: $font-size-h2;
            padding: 0 $sm-gap;
            opacity: 0.9;
            font-size: $font-size-small;
            @include title-shadow();
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
              background: $module-bg-opacity-5;
              border-radius: 100%;
              color: $module-bg;
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
          @include text-overflow();
        }

        > .description {
          padding: 0 $gap;
          margin-bottom: $sm-gap;
          line-height: 2rem;
          height: 2rem;
          font-size: $font-size-h6;
          @include text-overflow();
        }

        > .split {
          border-color: $body-bg;
          border-top-style: dashed;
          margin: 0;
        }

        > .meta {
          margin: 0;
          height: 3rem;
          display: flex;
          justify-content: space-around;
          align-items: center;
          font-size: $font-size-h6;

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

    > .loadmore {
      > .button {
        display: block;
        width: 100%;
        height: $block-button-height;
        line-height: $block-button-height;
        background-color: $module-bg;
        text-align: center;
        @include background-transition();

        &:hover {
          background-color: $module-hover-bg;
        }

        > .icon {
          margin-right: $gap;
        }
      }
    }
  }
</style>
