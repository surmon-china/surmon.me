<script lang="ts" setup>
  import { shallowRef } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import SwiperClass, { Swiper, SwiperSlide } from '/@/effects/swiper'

  interface Props {
    index?: number
  }

  const props = withDefaults(defineProps<Props>(), {
    index: 0
  })

  enum AsideMammonEvent {
    Ready = 'ready',
    UpdateIndex = 'update:index',
    IndexChange = 'index-change'
  }

  const emit = defineEmits<{
    (e: AsideMammonEvent.Ready, swiper: SwiperClass): void
    (e: AsideMammonEvent.UpdateIndex, index: number | void): void
    (e: AsideMammonEvent.IndexChange, index: number | void): void
  }>()

  // emits: [AsideMammonEvent.Ready, AsideMammonEvent.UpdateIndex, AsideMammonEvent.IndexChange]
  const { adConfig } = useEnhancer()
  const swiperRef = shallowRef<SwiperClass>()
  const updateSwiper = (_swiper: SwiperClass) => {
    swiperRef.value = _swiper
    emit(AsideMammonEvent.Ready, swiperRef.value)
  }

  const handleSlideChange = () => {
    const realIndex = swiperRef.value?.realIndex
    emit(AsideMammonEvent.UpdateIndex, realIndex)
    emit(AsideMammonEvent.IndexChange, realIndex)
  }
</script>

<template>
  <div class="mammon">
    <swiper
      class="swiper"
      direction="vertical"
      :initial-slide="props.index"
      :loop="true"
      :simulate-touch="false"
      :autoplay="{ delay: 2800, disableOnInteraction: false }"
      :pagination="{ clickable: true }"
      :set-wrapper-size="true"
      :auto-height="true"
      :mousewheel="true"
      :observe-parents="true"
      @swiper="updateSwiper"
      @slide-change-transition-end="handleSlideChange"
    >
      <swiper-slide class="swiper-slide" :key="_index" v-for="(ad, _index) in adConfig.PC_ASIDE_SWIPER">
        <ulink class="content" :href="ad.url">
          <uimage :src="ad.src" alt="aside-swiper-ad" />
          <i class="iconfont icon-ad"></i>
        </ulink>
      </swiper-slide>
    </swiper>
  </div>
</template>

<style lang="scss" scoped>
  @import 'src/styles/variables.scss';
  @import 'src/styles/mixins.scss';

  .mammon {
    width: 100%;
    overflow: hidden;

    .swiper {
      height: 88px;

      .swiper-wrapper {
        &[style*='300ms'] {
          .swiper-slide-active {
            @include motion-blur-filter('vertical-small');
          }
        }

        .swiper-slide {
          .content {
            display: block;
            width: 100%;
            height: 100%;
            position: relative;

            img {
              width: 100%;
              height: auto;
            }

            .iconfont {
              position: absolute;
              bottom: $sm-gap;
              right: $gap;
              color: $white;
            }
          }
        }
      }
    }
  }
</style>
