<template>
  <popup :visible="visible" @close="handleGalleryClose">
    <div class="instagram-gallery">
      <div class="topbar">
        <div class="left">
          <span class="timestamp">
            <i class="iconfont icon-clock"></i>
            <udate to="YMDm" :date="galleryActiveMedia.timestamp" separator="/" />
          </span>
        </div>
        <div class="center">
          <span class="pagination">{{ galleryActiveIndex + 1 }} / {{ medias.length }}</span>
        </div>
        <div class="right">
          <span class="caption">
            <i class="iconfont icon-video" v-if="isVideoMediaIns(galleryActiveMedia)"></i>
            <i class="iconfont icon-camera" v-else></i>
            <template v-if="galleryActiveMedia.caption">{{ galleryActiveMedia.caption }}</template>
          </span>
        </div>
      </div>
      <ulink class="postlink" :href="galleryActiveMedia.permalink">
        <i class="iconfont icon-instagram"></i>
      </ulink>
      <button
        class="navigation prev"
        @click="galleryPrevSlide"
        :disabled="galleryActiveIndex === 0"
      >
        <i class="iconfont icon-prev" />
      </button>
      <button
        class="navigation next"
        @click="galleryNextSlide"
        :disabled="galleryActiveIndex === medias.length - 1"
      >
        <i class="iconfont icon-next" />
      </button>
      <swiper
        effect="fade"
        :fade-effect="{ crossFade: true }"
        :initial-slide="index"
        :mousewheel="true"
        :observe-parents="true"
        :grab-cursor="false"
        :preload-images="false"
        :lazy="true"
        :simulate-touch="false"
        @swiper="handleGallerySwiperReady"
        @transition-start="handleGallerySwiperTransitionStart"
      >
        <swiper-slide v-for="(media, i) in medias" :key="i" v-slot="{ isActive }">
          <div class="video" v-if="isVideoMediaIns(media)">
            <video v-if="isActive" class="player" :src="media.media_url" controls autoplay />
          </div>
          <template v-else>
            <div
              class="image swiper-lazy"
              :data-background="getInstagramImage(media)"
              :alt="media.caption"
            />
            <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
          </template>
        </swiper-slide>
      </swiper>
    </div>
  </popup>
</template>

<script lang="ts">
  import { defineComponent, ref, computed, PropType } from 'vue'
  import type { InstagramMediaItem } from '/@/server/getters/instagram'
  import SwiperClass, { Swiper, SwiperSlide } from '/@/effects/swiper'
  import { isVideoMediaIns, getInstagramImage } from '/@/transforms/media'

  enum GalleryEvents {
    Close = 'close'
  }

  export default defineComponent({
    name: 'LensInstagramGallery',
    components: {
      Swiper,
      SwiperSlide
    },
    props: {
      medias: {
        type: Array as PropType<Array<InstagramMediaItem>>,
        required: true
      },
      index: {
        type: Number,
        default: 0
      },
      visible: {
        type: Boolean,
        default: false
      }
    },
    emits: [GalleryEvents.Close],
    setup(props, context) {
      const galleryActiveIndex = ref<number>(props.index)
      const gallerySwiper = ref<SwiperClass>()
      const galleryActiveMedia = computed(() => props.medias[galleryActiveIndex.value])
      const galleryPrevSlide = () => gallerySwiper.value?.slidePrev()
      const galleryNextSlide = () => gallerySwiper.value?.slideNext()
      const handleGallerySwiperReady = (_swiper: SwiperClass) => {
        gallerySwiper.value = _swiper
      }
      const handleGallerySwiperTransitionStart = () => {
        galleryActiveIndex.value = gallerySwiper.value?.activeIndex || 0
      }
      const handleGalleryClose = () => {
        context.emit(GalleryEvents.Close)
      }

      return {
        galleryActiveIndex,
        galleryActiveMedia,
        isVideoMediaIns,
        getInstagramImage,
        handleGalleryClose,
        handleGallerySwiperReady,
        handleGallerySwiperTransitionStart,
        galleryPrevSlide,
        galleryNextSlide
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/variables.scss';
  @import 'src/styles/mixins.scss';

  .instagram-gallery {
    width: 88vw;
    height: 76vh;
    position: relative;
    background: $black !important;

    .swiper {
      height: 100%;

      .image {
        overflow: hidden;
        width: 100%;
        height: 100%;
        background-size: contain;
        background-position: center;
      }

      .video {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .player {
          height: 100%;
          max-width: 60%;
        }
      }
    }

    .topbar {
      position: absolute;
      top: 0;
      left: 0;
      margin: 0;
      padding: 0 1em;
      width: 100%;
      height: 4rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: $font-size-h4;
      background-color: rgba($black, 0.4);
      color: $white;
      z-index: $z-index-normal + 2;

      .left,
      .right,
      .center {
        display: inline-flex;
        align-items: center;
      }
      .left {
        width: 40%;
        justify-content: start;
      }
      .center {
        width: 20%;
        justify-content: center;
      }
      .right {
        width: 40%;
        justify-content: end;
      }

      .pagination {
        font-weight: bold;
      }

      .timestamp,
      .caption {
        .iconfont {
          margin-right: $sm-gap;
        }
      }

      .caption {
        @include text-overflow();
      }
    }

    .postlink {
      $size: 3rem;
      position: absolute;
      z-index: $z-index-normal + 2;
      bottom: 6rem;
      right: 6rem;
      width: $size;
      height: $size;
      line-height: $size;
      border-radius: 50%;
      text-align: center;
      font-size: $font-size-h4;
      background: $instagram-gradient;
      color: $white;
      opacity: 0.5;
      transition: opacity $transition-time-fast;
      &:hover {
        opacity: 1;
      }
    }

    .navigation {
      display: inline-block;
      position: absolute;
      top: 33%;
      height: 33%;
      width: 4rem;
      z-index: $z-index-normal + 2;
      font-size: $font-size-h1 * 2;
      color: $module-bg;
      &[disabled] {
        opacity: 0.4;
      }
      &:not([disabled]):hover {
        color: $module-bg-lighter;
      }

      &.prev {
        left: $gap;
      }
      &.next {
        right: $gap;
      }
    }
  }
</style>
