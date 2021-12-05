<template>
  <div class="mammon">
    <swiper
      class="swiper"
      direction="vertical"
      :initial-slide="index"
      :loop="true"
      :simulate-touch="false"
      :autoplay="{ delay: 2800, disableOnInteraction: false }"
      :pagination="{ clickable: true }"
      :set-wrapper-size="true"
      :auto-height="true"
      :mousewheel="true"
      :observe-parents="true"
      :preload-images="false"
      :lazy="true"
      @swiper="updateSwiper"
      @slide-change-transition-end="handleSlideChange"
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
    </swiper>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import SwiperClass, { Swiper, SwiperSlide } from '/@/services/swiper'

  export enum AsideMammonEvent {
    Ready = 'ready',
    UpdateIndex = 'update:index',
    IndexChange = 'index-change'
  }
  export default defineComponent({
    name: 'PCAsideMammon',
    components: {
      Swiper,
      SwiperSlide
    },
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
      const { adConfig } = useEnhancer()
      const swiper = ref<SwiperClass>()
      const updateSwiper = (_swiper: SwiperClass) => {
        swiper.value = _swiper
        context.emit(AsideMammonEvent.Ready, swiper.value)
      }

      const handleSlideChange = () => {
        const realIndex = swiper.value?.realIndex
        context.emit(AsideMammonEvent.UpdateIndex, realIndex)
        context.emit(AsideMammonEvent.IndexChange, realIndex)
      }

      return {
        adConfig,
        updateSwiper,
        handleSlideChange
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/init.scss';

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
    }
  }
</style>
