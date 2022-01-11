<template>
  <placeholder :data="videos" :loading="isFetching">
    <template #placeholder>
      <slot name="empty"></slot>
    </template>
    <template #loading>
      <slot name="loading"></slot>
    </template>
    <template #default>
      <list-swiper :data="videos">
        <template #item="{ item }">
          <div class="video" @click="handleView(item)">
            <div class="thumb">
              <div class="mask">
                <div class="button">
                  <i class="iconfont icon-music-play" />
                </div>
              </div>
              <span class="published-at">
                <i class="iconfont icon-clock"></i>
                <span class="text">{{ humanlizeDate(item.snippet.publishedAt) }}</span>
              </span>
              <div
                class="background lozad"
                :data-background-image="getThumbURL(item.snippet.thumbnails)"
              />
            </div>
            <h5 class="title">{{ item.snippet.title }}</h5>
            <div class="description">{{ item.snippet.description || '-' }}</div>
          </div>
        </template>
      </list-swiper>
    </template>
  </placeholder>
</template>

<script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { useLensStore } from '/@/store/lens'
  import { LANGUAGE_KEYS } from '/@/language/key'
  import { GAEventCategories } from '/@/constants/gtag'
  import { ProxyModule } from '/@/constants/proxy'
  import { getTargetProxyURL } from '/@/transforms/url'
  import { timeAgo } from '/@/transforms/moment'
  import ListSwiper from '../swiper.vue'

  export enum YoutubeVideoListEvents {
    View = 'view'
  }

  export default defineComponent({
    name: 'LensYoutubeVideoList',
    components: { ListSwiper },
    props: {
      playlistId: {
        type: String,
        required: true
      }
    },
    emits: [YoutubeVideoListEvents.View],
    setup(props, context) {
      const { i18n, gtag } = useEnhancer()
      const lensStore = useLensStore()
      const isFetching = ref(true)
      const videos = ref<Array<any>>([])
      const fetchVideos = async () => {
        try {
          isFetching.value = true
          videos.value = await lensStore.fetchYouTubeVideoList(props.playlistId)
        } catch (error) {
          videos.value = []
        } finally {
          isFetching.value = false
        }
      }

      const getThumbURL = (thumbnails: any) => {
        const url = thumbnails.high?.url || thumbnails.medium?.url || thumbnails.defult?.url
        return url ? getTargetProxyURL(url, ProxyModule.YouTube) : ''
      }

      const humanlizeDate = (date: number) => {
        return timeAgo(date, i18n.language.value as any)
      }

      const handleView = (video: any) => {
        context.emit(YoutubeVideoListEvents.View, video)
        gtag?.event('youtube_view', {
          event_category: GAEventCategories.Lens
        })
      }

      onMounted(() => {
        fetchVideos()
      })

      return {
        LANGUAGE_KEYS,
        isFetching,
        videos,
        humanlizeDate,
        getThumbURL,
        handleView
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/init.scss';

  .video {
    display: block;
    height: 170px;
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

      .title {
        color: $link-color;
      }
    }

    .thumb {
      width: 100%;
      height: 106px;
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

      .published-at {
        position: absolute;
        bottom: $sm-gap;
        right: 1rem;
        z-index: $z-index-normal + 1;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        height: 2rem;
        padding: 0 $sm-gap;
        border-radius: $sm-radius;
        background-color: rgba(#000, 0.3);
        font-size: $font-size-small;
        color: $white;

        .iconfont {
          margin-right: $xs-gap;
        }

        .text {
          font-weight: bold;
        }
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
          opacity: 0.88;
          font-size: 3em;
          text-align: center;
          color: rgba($white, 0.8);
          transform: scale(1.2);
          @include transform-transition($transition-time-normal);
        }
      }
    }

    .title,
    .description {
      padding: 0 $gap;
    }

    .title {
      margin: $sm-gap 0;
      font-weight: bold;
      text-transform: capitalize;
      color: $text;
      max-width: 90%;
      @include text-overflow();
    }

    .description {
      margin-bottom: $gap;
      color: $text-secondary;
      max-width: 95%;
      @include text-overflow();
    }
  }
</style>
