<template>
  <div class="aside-mammon">
    <div
      class="swiper aside"
      v-swiper:swiper="swiperOption"
      @slideChange="handleSwiperSlideChange"
      @transitionStart="handleSwiperTransitionStart"
      @transitionEnd="handleSwiperTransitionEnd"
    >
      <div class="swiper-wrapper">
        <div
          class="swiper-slide slide-item"
          v-for="(ad, index) in ads"
          :key="index"
        >
          <div
            class="content filter"
            :class="{ 'motion-blur-vertical-small': transitioning }"
          >
            <a
              :href="ad.url"
              rel="external nofollow noopener"
              target="_blank"
              class="ad-box"
            >
              <img :src="ad.src" alt="aliyun-ad" />
            </a>
          </div>
        </div>
      </div>
      <div class="swiper-pagination swiper-pagination-clickable swiper-pagination-bullets"></div>
    </div>
  </div>
</template>

<script>
  import adConfig from '~/config/ad.config'
  export default {
    name: 'aside-mammon',
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
    methods: {
      handleSwiperSlideChange() {
        this.$emit('slideChange', this.swiper.realIndex)
      },
      handleSwiperTransitionStart() {
        this.transitioning = true
      },
      handleSwiperTransitionEnd() {
        this.transitioning = false
      }
    },
    computed: {
      ads: () => adConfig.pc.asideSwiper,
      swiperOption() {
        return {
          initialSlide: this.initIndex,
          loop: true,
          simulateTouch: false,
          direction : 'vertical',
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
    }
  }
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

