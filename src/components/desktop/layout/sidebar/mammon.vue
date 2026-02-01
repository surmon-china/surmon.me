<script lang="ts" setup>
  import _isNil from 'lodash-es/isNil'
  import { shallowRef } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import SwiperClass, { Swiper, SwiperSlide } from '/@/effects/swiper'

  interface Props {
    index?: number
  }

  const props = withDefaults(defineProps<Props>(), {
    index: 0
  })

  enum SidebarMammonEvent {
    Ready = 'ready',
    UpdateIndex = 'update:index',
    IndexChange = 'index-change'
  }

  const emit = defineEmits<{
    (e: SidebarMammonEvent.Ready, swiper: SwiperClass): void
    (e: SidebarMammonEvent.UpdateIndex, index: number | void): void
    (e: SidebarMammonEvent.IndexChange, index: number | void): void
  }>()

  // emits: [AsideMammonEvent.Ready, AsideMammonEvent.UpdateIndex, AsideMammonEvent.IndexChange]
  const { appConfig } = useEnhancer()
  const swiperRef = shallowRef<SwiperClass>()
  const activeIndex = shallowRef(props.index)
  const setSwiper = (_swiper: SwiperClass) => {
    swiperRef.value = _swiper
    emit(SidebarMammonEvent.Ready, swiperRef.value)
  }

  const handleSlideChange = () => {
    const realIndex = swiperRef.value?.realIndex
    emit(SidebarMammonEvent.UpdateIndex, realIndex)
    emit(SidebarMammonEvent.IndexChange, realIndex)
    if (!_isNil(realIndex)) {
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
      <swiper-slide class="swiper-slide" :key="_index" v-for="(ad, _index) in appConfig.AD_PC_SIDEBAR_SWIPER">
        <ulink class="content" :href="ad.url">
          <uimage :src="ad.src" alt="aside-swiper-ad" />
          <i class="iconfont icon-ad"></i>
        </ulink>
      </swiper-slide>
      <template #container-end>
        <div class="swiper-pagination">
          <div
            v-for="(__, _index) in appConfig.AD_PC_SIDEBAR_SWIPER"
            :key="_index"
            :aria-label="`Go to slide ${_index}`"
            :class="{ active: _index === activeIndex }"
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
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;

  .mammon {
    width: 100%;
    overflow: hidden;

    .swiper {
      position: relative;
      height: 88px;

      .swiper-wrapper {
        &[style*='300ms'] {
          .swiper-slide-active {
            @include global.motion-blur-filter('vertical-small');
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
              bottom: $gap-tiny;
              right: $gap;
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
        right: $gap-xs;
        display: flex;
        flex-direction: column;
        padding: $gap-xs 0;

        .swiper-pagination-bullet {
          position: relative;
          display: inline-block;
          width: 3px;
          height: 1rem;
          border-radius: $radius-tiny;
          overflow: hidden;
          margin: $gap-tiny 0;
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
