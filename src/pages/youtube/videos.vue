<script lang="ts" setup>
  import { ref, onMounted } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { isClient } from '/@/app/environment'
  import { GAEventCategories } from '/@/constants/gtag'
  import { TunnelModule } from '/@/constants/tunnel'
  import { getProxyURL } from '/@/transforms/url'
  import { delayPromise } from '/@/utils/delayer'
  import tunnel from '/@/services/tunnel'
  import ListSwiper from './swiper.vue'

  enum YoutubeVideoListEvents {
    View = 'view'
  }

  const props = defineProps<{
    playlistId: string
  }>()

  const emit = defineEmits<{
    (e: YoutubeVideoListEvents.View, v: any): void
  }>()

  const { gtag, cdnDomain } = useEnhancer()
  const videos = ref<Array<any>>([])
  const fetching = ref(true)
  const fetchVideos = async () => {
    try {
      fetching.value = true
      const request = tunnel.dispatch<Array<any>>(TunnelModule.YouTubeVideoList, { id: props.playlistId })
      videos.value = await (isClient ? delayPromise(480, request) : request)
    } catch (error) {
      videos.value = []
    } finally {
      fetching.value = false
    }
  }

  const getThumbnailURL = (thumbnails: any) => {
    const url = thumbnails.high?.url || thumbnails.medium?.url || thumbnails.defult?.url
    return url ? getProxyURL(cdnDomain, url) : ''
  }

  const handleView = (video: any) => {
    emit(YoutubeVideoListEvents.View, video)
    gtag?.event('youtube_view', {
      event_category: GAEventCategories.YouTube
    })
  }

  onMounted(() => fetchVideos())
</script>

<template>
  <placeholder :data="videos" :loading="fetching">
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
            <div class="thumbnail">
              <div class="mask">
                <div class="button">
                  <i class="iconfont icon-music-play" />
                </div>
              </div>
              <span class="published-at">
                <i class="iconfont icon-clock"></i>
                <span class="text">
                  <udate to="ago" :date="item.snippet.publishedAt" />
                </span>
              </span>
              <div v-lozad class="background" :data-background-image="getThumbnailURL(item.snippet.thumbnails)" />
            </div>
            <h5 class="title">{{ item.snippet.title }}</h5>
            <div class="description">{{ item.snippet.description || '-' }}</div>
          </div>
        </template>
      </list-swiper>
    </template>
  </placeholder>
</template>

<style lang="scss" scoped>
  @import 'src/styles/variables.scss';
  @import 'src/styles/mixins.scss';

  .video {
    display: block;
    height: 166px;
    cursor: pointer;
    @include radius-box($sm-radius);
    @include common-bg-module();
    &:hover {
      .thumbnail {
        .mask {
          @include visible();
        }
      }

      .title {
        color: $link-color;
      }
    }

    .thumbnail {
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
        }
      }
    }

    .title,
    .description {
      padding: 0 0.7em;
    }

    .title {
      margin-top: $sm-gap;
      margin-bottom: 0.4em;
      font-weight: bold;
      color: $text;
      max-width: 90%;
      @include text-overflow();
    }

    .description {
      max-width: 95%;
      font-size: $font-size-h5 - 1;
      color: $text-secondary;
      @include text-overflow();
    }
  }
</style>
