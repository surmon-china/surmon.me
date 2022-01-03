<template>
  <ul class="videos" ref="videoListElement">
    <li
      class="item"
      @click="handlePlay(video)"
      :title="video.title"
      :key="index"
      v-for="(video, index) in vlogs"
    >
      <div class="thumb">
        <div class="mask">
          <div class="button">
            <i class="iconfont icon-music-play" />
          </div>
        </div>
        <span class="length">{{ video.length }}</span>
        <div class="background lozad" :data-background-image="getThumbURL(video.pic)" />
      </div>
      <h5 class="title">
        <span class="text">{{ video.title }}</span>
      </h5>
      <hr class="divider" />
      <p class="meta">
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
        <span class="item">
          <i class="iconfont icon-list"></i>
          <span>{{ video.aid }}</span>
        </span>
      </p>
    </li>
  </ul>
</template>

<script lang="ts">
  import { defineComponent, ref, onMounted, onBeforeUnmount, PropType } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { GAEventCategories } from '/@/constants/gtag'
  import { ProxyModule } from '/@/constants/proxy'
  import { getTargetProxyURL } from '/@/transforms/url'
  import { timeAgo } from '/@/transforms/moment'
  import { LozadObserver, LOZAD_CLASS_NAME, LOADED_CLASS_NAME } from '/@/services/lozad'

  export default defineComponent({
    name: 'LensVlogs',
    props: {
      vlogs: {
        type: Array as PropType<Array<any>>,
        required: true
      }
    },
    setup() {
      const { globalState, i18n, gtag } = useEnhancer()
      const lozadObserver = ref<LozadObserver | null>(null)
      const videoListElement = ref<HTMLElement>()

      const humanlizeDate = (date: number) => {
        return timeAgo(date * 1000, i18n.language.value as any)
      }

      const getThumbURL = (url: string) => {
        return getTargetProxyURL(
          `${url}@560w_350h.${globalState.imageExt.value.ext}`,
          ProxyModule.BiliBili
        )
      }

      const handlePlay = (video: any) => {
        gtag?.event('bilibili_video_play', {
          event_category: GAEventCategories.Lens
        })
        window.open(`https://www.bilibili.com/video/av${video.aid}`)
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

      return {
        videoListElement,
        humanlizeDate,
        getThumbURL,
        handlePlay
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/init.scss';

  .videos {
    padding: 0;
    margin: 0;
    margin-bottom: $gap * 2;
    list-style: none;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: $gap * 2;

    > .item {
      display: block;
      cursor: pointer;
      @include radius-box($sm-radius);
      @include common-bg-module();
      &:hover {
        .thumb {
          .background {
            transform: scale(1.1);
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

      .thumb {
        width: 100%;
        height: 16rem;
        position: relative;
        overflow: hidden;
        background-color: $module-bg-darker-3;

        .background {
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          transform: scale(1);
          @include transform-transition($transition-time-normal);
        }

        .length {
          position: absolute;
          bottom: 0;
          right: 0;
          z-index: $z-index-normal + 1;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          width: 4rem;
          height: 2rem;
          border-top-left-radius: $xs-radius;
          background-color: $text-dividers;
          color: $white;
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
          background-color: rgba(#000, 0.4);
          @include hidden();
          @include visibility-transition();

          .button {
            width: 5rem;
            height: 5rem;
            border-radius: 100%;
            opacity: 0.88;
            font-size: 3em;
            line-height: 5rem;
            text-align: center;
            background: rgba($white, 0.4);
            color: rgba($white, 0.8);
            transform: scale(1.2);
            @include transform-transition($transition-time-normal);
          }
        }
      }

      .title {
        padding: 0 $gap;
        margin: $gap 0;
        font-weight: bold;
        text-transform: capitalize;
        @include text-overflow();

        .text {
          border-bottom: 1px solid transparent;
        }
      }

      .divider {
        border-top: 1px dotted $module-bg-darker-1;
        margin: 0;
      }

      .meta {
        margin: 0;
        height: 3rem;
        display: flex;
        justify-content: space-around;
        align-items: center;
        font-size: $font-size-small;

        .item {
          font-weight: 400;
          color: $text-secondary;

          .iconfont {
            margin-right: $sm-gap;
          }
        }
      }
    }
  }
</style>
