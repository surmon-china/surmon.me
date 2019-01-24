<template>
  <div class="aside-ad">
    <div class="swiper aside" v-swiper:swiper="swiperOption" @slideChange="slideChange">
      <div class="swiper-wrapper">
        <div class="swiper-slide slide-item" v-for="(ad, index) in ads" :key="index">
          <div class="content">
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
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>

<script>
  import adConfig from '~/config/ad.config'
  export default {
    name: 'aside-ad',
    props: {
      initIndex: {
        type: Number,
        default: 0
      }
    },
    methods: {
      slideChange() {
        this.$emit('slideChange', this.swiper.realIndex)
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
          height: 1.2rem;
          border-radius: 10px;
        }
      }
    }
  }
</style>

<style lang="scss" scoped>
  .aside-ad {
    width: 100%;
    overflow: hidden;

    .swiper {
      height: 7.4rem;

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

