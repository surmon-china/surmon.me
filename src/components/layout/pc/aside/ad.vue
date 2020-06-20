<template>
  <div class="mammon">
    <swiper
      ref="swiperElement"
      class="swiper aside"
      :options="swiperOption"
      @slide-change="handleSwiperSlideChange"
    >
      <swiper-slide
        v-for="(ad, index) in AD_CONFIG.asideSwiper"
        :key="index"
        class="swiper-slide"
      >
        <a
          :href="ad.url"
          rel="external nofollow noopener"
          target="_blank"
          class="content"
        >
          <img :src="ad.src" alt="aliyun-ad" draggable="false">
        </a>
      </swiper-slide>
      <template #pagination>
        <div class="swiper-pagination" />
      </template>
    </swiper>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, computed } from 'vue'
  import Swiper from 'swiper'
  import AD_CONFIG from '/@/config/ad.config'

  export default defineComponent({
    name: 'PcAsideMammon',
    props: {
      initIndex: {
        type: Number,
        default: 0
      }
    },
    setup(props, context) {
      const swiperElement = ref<any>(null)
      const swiperInstance = computed<Swiper>(() => swiperElement.value?.$swiper)
      const currentSlideRealIndex = computed(() => swiperInstance.value?.realIndex)
      const handleSwiperSlideChange = () => {
        context.emit('slide-change', currentSlideRealIndex.value)
      }

      const swiperOption = {
        initialSlide: props.initIndex,
        loop: true,
        simulateTouch: false,
        direction: 'vertical',
        autoplay: {
          delay: 2960,
          disableOnInteraction: false
        },
        pagination: {
          clickable: true,
          el: '.swiper-pagination'
        },
        setWrapperSize: true,
        autoHeight: true,
        mousewheel: true,
        observeParents: true,
        preloadImages: false,
        lazy: true
      }

      return {
        swiperElement,
        swiperOption,
        currentSlideRealIndex,
        handleSwiperSlideChange,
        AD_CONFIG
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/assets/styles/init.scss';
  @import './variables.scss';

  .mammon {
    width: 100%;
    overflow: hidden;

    .swiper {
      height: 88px;

      .swiper-wrapper {
        &[style*="300ms"] {
          .swiper-slide-active {
            @include blur-filter('vertical-small');
          }
        }

        .swiper-slide {
          .content {
            width: 100%;
            height: 100%;

            img {
              width: 100%;
              height: auto;
            }
          }
        }

        &::v-deep(.swiper-pagination) {
          .swiper-pagination-bullet {
            &.swiper-pagination-bullet-active {
              height: $font-size-base;
              border-radius: 10px;
            }
          }
        }
      }
    }
  }
</style>
