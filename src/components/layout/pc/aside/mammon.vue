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
        :key="_index"
        v-for="(ad, _index) in adConfig.PC_ASIDE_SWIPER"
      >
        <ulink class="content" :href="ad.url">
          <uimage :src="ad.src" alt="aliyun-ad" />
        </ulink>
      </swiper-slide>
      <template #pagination>
        <div class="swiper-pagination" />
      </template>
    </swiper>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, computed, onMounted } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import type { SwiperContext } from '/@/todo/swiper'

  export enum AsideMammonEvent {
    Ready = 'ready',
    UpdateIndex = 'update:index',
    IndexChange = 'index-change'
  }
  export default defineComponent({
    name: 'PCAsideMammon',
    props: {
      index: {
        type: Number,
        default: 0
      },
      ready: {
        type: Object
      }
    },
    emits: [AsideMammonEvent.Ready, AsideMammonEvent.UpdateIndex, AsideMammonEvent.IndexChange],
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

      const { adConfig } = useEnhancer()
      const swiperContext = ref<SwiperContext>()
      const swiperInstance = computed(() => swiperContext.value?.$swiper.value)
      const updateSwiperContext = (context: SwiperContext) => {
        swiperContext.value = context
      }

      const handleSwiperSlideChange = () => {
        const realIndex = swiperInstance.value?.realIndex
        context.emit(AsideMammonEvent.UpdateIndex, realIndex)
        context.emit(AsideMammonEvent.IndexChange, realIndex)
      }

      onMounted(() => context.emit(AsideMammonEvent.Ready, swiperInstance.value))

      return {
        adConfig,
        swiperOption,
        updateSwiperContext,
        handleSwiperSlideChange
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/init.scss';
  @import './variables.scss';

  .mammon {
    width: 100%;
    overflow: hidden;

    .swiper {
      height: 88px;

      .swiper-wrapper {
        &[style*='300ms'] {
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
