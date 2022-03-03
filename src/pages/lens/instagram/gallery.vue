<template>
  <popup :visible="visible" @close="handleGalleryClose">
    <div class="instagram-gallery">
      <div class="topbar">
        <div class="left">
          <span class="timestamp">
            <i class="iconfont icon-clock"></i>
            <span class="text">
              <udate to="YMDm" :date="galleryActiveMedia.timestamp" separator="/" />
            </span>
          </span>
        </div>
        <div class="center">
          <span class="pagination">{{ galleryActiveIndex + 1 }} / {{ medias.length }}</span>
        </div>
        <div class="right">
          <span class="caption" v-if="galleryActiveMedia.caption">
            <i class="iconfont icon-camera"></i>
            <span class="text">{{ galleryActiveMedia.caption }}</span>
            <divider type="vertical" />
          </span>
          <ulink class="link" :href="galleryActiveMedia.permalink">
            <i class="iconfont instagram icon-instagram"></i>
            <span class="text">On Instagram</span>
            <i class="iconfont window icon-new-window-s"></i>
          </ulink>
        </div>
      </div>
      <button
        class="navigation prev"
        :disabled="galleryActiveIndex === 0"
        @click="galleryPrevSlide"
      >
        <i class="iconfont icon-prev" />
      </button>
      <button
        class="navigation next"
        :disabled="galleryActiveIndex === medias.length - 1"
        @click="galleryNextSlide"
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
        <swiper-slide v-for="(media, i) in medias" :key="i">
          <div
            class="image swiper-lazy"
            :data-background="getInstagramImage(media)"
            :alt="media.caption"
          />
          <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
        </swiper-slide>
      </swiper>
    </div>
  </popup>
</template>

<script lang="ts">
  import { defineComponent, ref, computed, PropType } from 'vue'
  import type { InstagramMediaItem } from '/@/server/getters/instagram'
  import SwiperClass, { Swiper, SwiperSlide } from '/@/effects/swiper'
  import { getInstagramImage } from '/@/transforms/media'

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
  @import 'src/styles/init.scss';

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
    }

    .topbar {
      position: absolute;
      top: 0;
      left: 0;
      margin: 0;
      padding: 0;
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

      .timestamp {
        margin-left: $lg-gap;
        color: rgba($white, 0.6);
      }

      .caption {
        .text {
          font-weight: bold;
        }
      }

      .link {
        display: inline-flex;
        align-items: center;
        height: 28px;
        padding: 0 $sm-gap;
        margin-right: $gap;
        border-radius: $xs-radius;
        color: $white;
        background: $instagram-gradient;

        .instagram {
          margin-right: $sm-gap;
        }
        .text {
          font-size: $font-size-base;
          font-weight: bold;
        }
        .window {
          margin-left: $sm-gap;
        }
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
