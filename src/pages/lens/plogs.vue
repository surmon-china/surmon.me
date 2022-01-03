<template>
  <div class="plog">
    <ul class="medias" ref="listElement">
      <li
        class="item"
        @click="handleOpenGallery(index)"
        :title="media.caption"
        :key="index"
        v-for="(media, index) in plogList"
      >
        <div class="mask">
          <span class="icon">
            <i class="iconfont icon-magnifier"></i>
          </span>
          <span class="caption" v-if="media.caption">{{ media.caption }}</span>
        </div>
        <div class="background lozad" :data-background-image="getInstagramImage(media, 'l')" />
      </li>
    </ul>
    <client-only>
      <popup :visible="isOnGallery" @close="handleCloseGallery">
        <div class="gallery">
          <swiper
            effect="fade"
            :initial-slide="galleryActiveIndex"
            :set-wrapper-size="true"
            :mousewheel="true"
            :observe-parents="true"
            :grab-cursor="false"
            :simulate-touch="false"
            :pagination="{ type: 'fraction' }"
            @swiper="handleSwiperReady"
            @transition-start="handleSwiperTransitionStart"
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
                  class="image"
                  :alt="media.caption"
                  :style="{ backgroundImage: `url(${getInstagramImage(media)})` }"
                />
              </div>
            </swiper-slide>
          </swiper>
          <button class="navigation prev" :disabled="galleryActiveIndex === 0" @click="prevSlide">
            <i class="iconfont icon-prev" />
          </button>
          <button
            class="navigation next"
            :disabled="galleryActiveIndex === plogList.length - 1"
            @click="nextSlide"
          >
            <i class="iconfont icon-next" />
          </button>
        </div>
      </popup>
    </client-only>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, computed, onMounted, onBeforeUnmount, PropType } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { getInstagramImage } from '/@/store/lens'
  import SwiperClass, { Swiper, SwiperSlide } from '/@/services/swiper'
  import { GAEventCategories } from '/@/constants/gtag'
  import { UNDEFINED } from '/@/constants/value'
  import { humanizeYMD } from '/@/transforms/moment'
  import type { InstagramMediaItem } from '/@/server/getters/instagram'
  import { LozadObserver, LOZAD_CLASS_NAME, LOADED_CLASS_NAME } from '/@/services/lozad'

  export default defineComponent({
    name: 'LensPlogs',
    components: {
      Swiper,
      SwiperSlide
    },
    props: {
      plogs: {
        type: Array as PropType<Array<InstagramMediaItem>>,
        required: true
      }
    },
    setup(props) {
      const { i18n, gtag } = useEnhancer()
      const lozadObserver = ref<LozadObserver | null>(null)
      const listElement = ref<HTMLElement>()
      const plogList = computed(() => {
        return props.plogs.filter((plog) => plog.media_type !== 'VIDEO').slice(0, 15)
      })
      const humanlizeDate = (date: string) => {
        return humanizeYMD(date, i18n.language.value as any)
      }

      const galleryActiveIndex = ref<number>()
      const isOnGallery = computed(() => galleryActiveIndex.value !== UNDEFINED)
      const swiper = ref<SwiperClass>()
      const handleSwiperReady = (_swiper: SwiperClass) => {
        swiper.value = _swiper
      }

      const prevSlide = () => swiper.value?.slidePrev()
      const nextSlide = () => swiper.value?.slideNext()
      const handleSwiperTransitionStart = () => {
        galleryActiveIndex.value = swiper.value?.activeIndex || 0
      }

      const handleCloseGallery = () => {
        galleryActiveIndex.value = UNDEFINED
      }
      const handleOpenGallery = (index: number) => {
        galleryActiveIndex.value = index
        gtag?.event('instagram_view', {
          event_category: GAEventCategories.Lens
        })
      }

      const observeLozad = () => {
        const lozadElements = listElement.value?.querySelectorAll(`.${LOZAD_CLASS_NAME}`)
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
        plogList,
        galleryActiveIndex,
        isOnGallery,
        listElement,
        humanlizeDate,
        getInstagramImage,
        handleOpenGallery,
        handleCloseGallery,
        handleSwiperReady,
        handleSwiperTransitionStart,
        prevSlide,
        nextSlide
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/init.scss';

  .medias {
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
      height: 334px;
      position: relative;
      overflow: hidden;
      background-color: $module-bg-darker-3;
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
          font-size: $font-size-h4;
        }
      }
    }
  }

  .gallery {
    width: 88vw;
    height: 70vh;
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
        background-color: $module-bg;
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
