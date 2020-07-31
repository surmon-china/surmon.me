<template>
  <div class="mammon">
    <swiper
      class="swiper"
      :options="swiperOption"
      @ready="updateSwiperContext"
      @slide-change-transition-end="handleSwiperSlideChange"
    >
      <swiper-slide
        class="swiper-slide"
        :key="i"
        v-for="(ad, i) in AD_CONFIG.asideSwiper"
      >
        <a
          :href="ad.url"
          rel="external nofollow noopener"
          target="_blank"
          class="content"
        >
          <uimage :src="ad.src" alt="aliyun-ad" />
        </a>
      </swiper-slide>
      <template #pagination>
        <div class="swiper-pagination" />
      </template>
    </swiper>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed, onMounted } from 'vue'
  import { useSwiperRef, NameId } from '/@/todo/swiper'
  import AD_CONFIG from '/@/config/ad.config'

  export default defineComponent({
    name: 'PcAsideMammon',
    props: {
      index: {
        type: Number,
        default: 0
      },
      ready: {
        type: Object
      }
    },
    setup(props, context) {
      const swiperOption = {
        initialSlide: props.index,
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

      const [swiperContext, updateSwiperContext] = useSwiperRef()
      const swiperInstance = computed(() => swiperContext.value?.$swiper.value)
      const handleSwiperSlideChange = () => {
        const realIndex = swiperInstance.value?.realIndex
        context.emit('update:index', realIndex)
        context.emit('index-change', realIndex)
      }

      onMounted(() => context.emit('ready', swiperInstance.value))

      return {
        AD_CONFIG,
        swiperOption,
        updateSwiperContext,
        handleSwiperSlideChange
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
      }

      .swiper-pagination {
        ::v-deep(.swiper-pagination-bullet) {
          &.swiper-pagination-bullet-active {
            height: $font-size-base;
            border-radius: $lg-radius;
          }
        }
      }
    }
  }
</style>
