<template>
  <div class="aside-mammon">
    <div
      v-swiper:swiper="swiperOption"
      class="swiper aside"
      @slideChange="handleSwiperSlideChange"
      @transitionStart="handleSwiperTransitionStart"
      @transitionEnd="handleSwiperTransitionEnd"
    >
      <div class="swiper-wrapper">
        <div
          v-for="(ad, index) in ads"
          :key="index"
          class="swiper-slide slide-item"
        >
          <div
            class="content filter"
            :class="{ 'motion-blur-vertical-small': isEnableFilterStyle(index) }"
          >
            <a
              :href="ad.url"
              rel="external nofollow noopener"
              target="_blank"
              class="ad-box"
            >
              <img :src="ad.src" alt="aliyun-ad" draggable="false">
            </a>
          </div>
        </div>
      </div>
      <div class="swiper-pagination swiper-pagination-clickable swiper-pagination-bullets" />
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import adConfig from '~/config/ad.config'

  export default Vue.extend({
    name: 'PcAsideMammon',
    props: {
      initIndex: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        transitioning: false
      }
    },
    computed: {
      ads: () => adConfig.asideSwiper,
      swiperOption() {
        return {
          initialSlide: this.initIndex,
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
      }
    },
    methods: {
      isEnableFilterStyle(index) {
        return this.transitioning && this.swiper && this.swiper.activeIndex === index
      },
      handleSwiperSlideChange() {
        this.$emit('slideChange', this.swiper.realIndex)
      },
      handleSwiperTransitionStart() {
        this.transitioning = true
      },
      handleSwiperTransitionEnd() {
        this.transitioning = false
      }
    }
  })
</script>

<style lang="scss">
  .aside.swiper {
    .swiper-pagination {
      .swiper-pagination-bullet {
        &.swiper-pagination-bullet-active {
          height: $font-size-base;
          border-radius: 10px;
        }
      }
    }
  }
</style>

<style lang="scss" scoped>
  .aside-mammon {
    width: 100%;
    overflow: hidden;

    .swiper {
      height: 88px;

      .swiper-wrapper {
        .swiper-slide {
          .content {
            .ad-box {
              width: 100%;
              height: 100%;

              img {
                width: 100%;
                height: auto;
              }
            }
          }
        }
      }
    }
  }
</style>
