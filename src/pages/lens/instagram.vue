<template>
  <div class="plog">
    <list-swiper class="list-swiper" :data="plogList">
      <template #item="{ item, index }">
        <div class="media" :title="item.caption" @click="handleGalleryOpen(index)">
          <div class="mask">
            <span class="icon">
              <i class="iconfont icon-magnifier"></i>
            </span>
            <span class="caption" v-if="item.caption">{{ item.caption }}</span>
          </div>
          <div class="background lozad" :data-background-image="getInstagramImage(item, 'm')" />
        </div>
      </template>
    </list-swiper>
    <client-only>
      <popup :visible="isOnGallery" @close="handleGalleryClose">
        <div class="gallery">
          <swiper
            effect="fade"
            :initial-slide="galleryActiveIndex"
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
            <swiper-slide v-for="(media, index) in plogList" :key="index">
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
            :disabled="galleryActiveIndex === plogList.length - 1"
            @click="galleryNextSlide"
          >
            <i class="iconfont icon-next" />
          </button>
        </div>
      </popup>
    </client-only>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, computed, PropType } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import SwiperClass, { Swiper, SwiperSlide } from '/@/services/swiper'
  import { GAEventCategories } from '/@/constants/gtag'
  import { UNDEFINED } from '/@/constants/value'
  import { humanizeYMD } from '/@/transforms/moment'
  import { getInstagramImage } from '/@/transforms/media'
  import type { InstagramMediaItem } from '/@/server/getters/instagram'
  import ListSwiper from './swiper.vue'

  export default defineComponent({
    name: 'LensInstagram',
    components: {
      Swiper,
      SwiperSlide,
      ListSwiper
    },
    props: {
      medias: {
        type: Array as PropType<Array<InstagramMediaItem>>,
        required: true
      }
    },
    setup(props) {
      const { i18n, gtag } = useEnhancer()
      const plogList = computed(() => {
        return props.medias.filter((plog) => plog.media_type !== 'VIDEO').slice(0, 24)
      })
      const humanlizeDate = (date: string) => {
        return humanizeYMD(date, i18n.language.value as any)
      }

      const galleryActiveIndex = ref<number>()
      const isOnGallery = computed(() => galleryActiveIndex.value !== UNDEFINED)
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
        galleryActiveIndex.value = UNDEFINED
      }
      const handleGalleryOpen = (index: number) => {
        galleryActiveIndex.value = index
        gtag?.event('instagram_view', {
          event_category: GAEventCategories.Lens
        })
      }

      return {
        plogList,
        galleryActiveIndex,
        isOnGallery,
        humanlizeDate,
        getInstagramImage,
        handleGalleryOpen,
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

  .list-swiper {
    $size: 243px;
    /* height * 2 + 2rem gap */
    height: $size * 2 + 12 * 2;
    width: 100%;

    .media {
      position: relative;
      display: block;
      height: $size;
      overflow: hidden;
      cursor: pointer;
      @include radius-box($sm-radius);
      @include common-bg-module();
      &:hover {
        .background {
          transform: scale(1.15);
        }

        .mask {
          @include visible();
        }
      }

      .background {
        width: 100%;
        height: 100%;
        background-size: cover;
        background-position: center;
        transform: scale(1.05);
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
        background-color: $text-divider;
        color: $white;
      }

      .mask {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: $z-index-normal + 1;
        backdrop-filter: blur(2px);
        color: $white;
        background-color: rgba(#000, 0.3);
        @include hidden();
        @include visibility-transition();

        .icon {
          font-size: $font-size-h1 * 2;
        }

        .caption {
          margin-top: $gap;
          font-weight: bold;
        }
      }
    }
  }

  .gallery {
    width: 88vw;
    height: 76vh;
    position: relative;

    .swiper {
      height: 100%;
      ::v-deep(.swiper-pagination-fraction) {
        color: $white;
        bottom: $lg-gap;
      }
    }

    .content {
      height: 100%;
      background: $black;

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
