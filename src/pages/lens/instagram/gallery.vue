<template>
  <popup :visible="visible" @close="handleGalleryClose">
    <div class="instagram-gallery">
      <swiper
        effect="fade"
        :initial-slide="index"
        :set-wrapper-size="true"
        :mousewheel="true"
        :observe-parents="true"
        :grab-cursor="false"
        :preload-images="false"
        :lazy="true"
        :simulate-touch="false"
        :pagination="{ type: 'fraction' }"
        @swiper="handleGallerySwiperReady"
        @transition-start="handleGallerySwiperTransitionStart"
      >
        <swiper-slide v-for="(media, index) in medias" :key="index">
          <div class="content">
            <div class="info">
              <div class="left">
                <span class="timestamp">
                  <i class="iconfont icon-clock"></i>
                  <span class="text">{{ humanlizeDate(media.timestamp) }}</span>
                </span>
              </div>
              <div class="right">
                <span class="caption" v-if="media.caption">
                  <i class="iconfont icon-camera"></i>
                  <span class="text">{{ media.caption }}</span>
                  <divider type="vertical" />
                </span>
                <ulink class="link" :href="media.permalink">
                  <i class="iconfont instagram icon-instagram"></i>
                  <span class="text">On Instagram</span>
                  <i class="iconfont window icon-new-window-s"></i>
                </ulink>
              </div>
            </div>
            <div
              class="image swiper-lazy"
              :data-background="getInstagramImage(media)"
              :alt="media.caption"
            />
          </div>
          <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
        </swiper-slide>
      </swiper>
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
    </div>
  </popup>
</template>

<script lang="ts">
  import { defineComponent, ref, watch, PropType } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import SwiperClass, { Swiper, SwiperSlide } from '/@/services/swiper'
  import { humanizeYMD } from '/@/transforms/moment'
  import { getInstagramImage } from '/@/transforms/media'
  import type { InstagramMediaItem } from '/@/server/getters/instagram'

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
      const { i18n } = useEnhancer()
      const humanlizeDate = (date: string) => {
        return humanizeYMD(date, i18n.language.value as any)
      }

      const galleryActiveIndex = ref<number>()
      const gallerySwiper = ref<SwiperClass>()
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
        humanlizeDate,
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
      ::v-deep(.swiper-pagination-fraction) {
        color: $white;
        bottom: $lg-gap;
      }
    }

    .content {
      height: 100%;

      .info {
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
          display: inline-block;
          padding: 2px $sm-gap;
          margin-right: $gap;
          border-radius: $sm-radius;
          color: $white;
          background: $instagram-gradient;
          .instagram {
            margin-right: $sm-gap;
          }
          .text {
            font-weight: bold;
          }
          .window {
            margin-left: $sm-gap;
          }
        }
      }

      .image {
        overflow: hidden;
        width: 100%;
        height: 100%;
        background-size: contain;
        background-position: center;
      }
    }

    .navigation {
      display: inline-block;
      position: absolute;
      top: 33%;
      height: 33%;
      width: 4rem;
      z-index: $z-index-normal + 1;
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
