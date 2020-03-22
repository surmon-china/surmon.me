<template>
  <div class="aside-mammon">
    <swiper
      ref="swiper"
      class="swiper aside"
      :options="swiperOption"
      @slide-change="handleSwiperSlideChange"
    >
      <swiper-slide
        v-for="(ad, index) in ads"
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
      <div slot="pagination" class="swiper-pagination" />
    </swiper>
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
    computed: {
      ads: () => adConfig.asideSwiper,
      swiper: {
        cache: false,
        get() {
          return this.$refs.swiper?.$swiper
        }
      },
      currentSlideRealIndex: {
        cache: false,
        get() {
          return this.swiper?.realIndex
        }
      },
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
      handleSwiperSlideChange() {
        this.$emit('slide-change', this.currentSlideRealIndex)
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
      }
    }
  }
</style>
