<script lang="ts" setup>
  import { shallowRef } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { isNil } from '/@/constants/value'
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
  const activeIndex = shallowRef(props.index)
  const setSwiper = (_swiper: SwiperClass) => {
    swiperRef.value = _swiper
    emit(AsideMammonEvent.Ready, swiperRef.value)
  }

  const handleSlideChange = () => {
    const realIndex = swiperRef.value?.realIndex
    emit(AsideMammonEvent.UpdateIndex, realIndex)
    emit(AsideMammonEvent.IndexChange, realIndex)
    if (!isNil(realIndex)) {
      activeIndex.value = realIndex
    }
  }
</script>

<template>
  <div class="mammon">
    <swiper
      class="swiper"
      direction="vertical"
      :style="{ '--slide-delay': `${2800}ms` }"
      :autoplay="{ delay: 2800, disableOnInteraction: false }"
      :loop="true"
      :simulate-touch="false"
      :set-wrapper-size="true"
      :auto-height="true"
      :mousewheel="true"
      :initial-slide="props.index"
      @slide-change="handleSlideChange"
      @swiper="setSwiper"
    >
      <swiper-slide class="swiper-slide" :key="_index" v-for="(ad, _index) in adConfig.PC_ASIDE_SWIPER">
        <ulink class="content" :href="ad.url">
          <uimage :src="ad.src" alt="aside-swiper-ad" />
          <i class="iconfont icon-ad"></i>
        </ulink>
      </swiper-slide>
      <template #container-end>
        <div class="swiper-pagination">
          <div
            v-for="(__, index) in adConfig.PC_ASIDE_SWIPER"
            :key="index"
            :aria-label="`Go to slide ${index}`"
            :class="{ active: index === activeIndex }"
            class="swiper-pagination-bullet"
            role="button"
          >
            <span class="bullet-progress"></span>
          </div>
        </div>
      </template>
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
      position: relative;
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
              bottom: $gap-sm;
              right: $gap-lg;
              color: $white;
            }
          }
        }
      }

      .swiper-pagination {
        z-index: $z-index-normal + 1;
        position: absolute;
        height: 100%;
        top: 0;
        right: $gap-sm;
        display: flex;
        flex-direction: column;
        padding: $gap-sm 0;

        .swiper-pagination-bullet {
          position: relative;
          display: inline-block;
          width: 3px;
          height: 1rem;
          border-radius: $radius-mini;
          overflow: hidden;
          margin: $gap-xs 0;
          background-color: rgba(white, 0.2);
          &.active {
            flex-grow: 1;
            background-color: rgba(white, 0.4);
            .bullet-progress {
              animation: bullet-progress var(--slide-delay) linear forwards;
              @keyframes bullet-progress {
                0% {
                  transform: scaleY(0);
                }
                100% {
                  transform: scaleY(1);
                }
              }
            }
          }

          .bullet-progress {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            background-color: rgba(white, 0.4);
            transform-origin: top;
            transform: scaleY(0);
          }
        }
      }
    }
  }
</style>
