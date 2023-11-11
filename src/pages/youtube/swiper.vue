<script lang="ts" setup>
  import { reactive, shallowRef } from 'vue'
  import SwiperClass, { Swiper, SwiperSlide } from '/@/effects/swiper'

  interface Props {
    data: Array<any>
    rows?: number
    columns?: number
  }

  withDefaults(defineProps<Props>(), {
    rows: 2,
    columns: 5
  })

  const swiperRef = shallowRef<SwiperClass>()
  const swiperState = reactive({ canPrev: false, canNext: true })

  const prevSlide = () => swiperRef.value?.slidePrev()
  const nextSlide = () => swiperRef.value?.slideNext()
  const handleSlideChange = (_swiper: SwiperClass) => {
    swiperState.canNext = !_swiper.isEnd
    swiperState.canPrev = !_swiper.isBeginning
  }
  const setSwiper = (_swiper: SwiperClass) => {
    swiperRef.value = _swiper
    handleSlideChange(_swiper)
  }
</script>

<template>
  <div class="list-swiper">
    <div class="navigation prev">
      <button class="button" :disabled="!swiperState.canPrev" @click="prevSlide">
        <i class="iconfont icon-prev" />
      </button>
    </div>
    <div class="navigation next">
      <button class="button" :disabled="!swiperState.canNext" @click="nextSlide">
        <i class="iconfont icon-next" />
      </button>
    </div>
    <swiper
      class="swiper"
      :autoplay="true"
      :mousewheel="false"
      :grab-cursor="false"
      :allow-touch-move="false"
      :slides-per-view="columns"
      :slides-per-group="columns"
      :grid="{ rows: rows, fill: 'row' }"
      :space-between="24"
      @slide-change="handleSlideChange"
      @swiper="setSwiper"
    >
      <swiper-slide class="slide-item" :key="index" v-for="(item, index) in data">
        <slot name="item" v-bind="{ item, index }"></slot>
      </swiper-slide>
    </swiper>
  </div>
</template>

<style lang="scss" scoped>
  @import 'src/styles/variables.scss';
  @import 'src/styles/mixins.scss';

  .list-swiper {
    position: relative;
    &:hover {
      .navigation {
        opacity: 1;
      }
    }

    .navigation {
      $size: 8rem;
      position: absolute;
      top: 0;
      height: 100%;
      width: $size;
      display: flex;
      align-items: center;
      opacity: 0;
      transition: all $transition-time-fast;
      &.prev {
        left: -$size;
        justify-content: start;
      }
      &.next {
        right: -$size;
        justify-content: end;
      }

      .button {
        font-size: $font-size-h2 * 2;
        color: $text-disabled;
        &[disabled] {
          color: $text-divider;
        }
        &:not([disabled]):hover {
          color: $text;
        }
      }
    }

    .swiper {
      padding: 0;
      margin: 0;
      list-style: none;
    }
  }
</style>
