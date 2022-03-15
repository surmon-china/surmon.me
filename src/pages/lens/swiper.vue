<template>
  <div class="list-swiper">
    <div class="navigation prev">
      <button class="button" :disabled="!listSwiperState.canPrev" @click="listPrevSlide">
        <i class="iconfont icon-prev" />
      </button>
    </div>
    <div class="navigation next">
      <button class="button" :disabled="!listSwiperState.canNext" @click="listNextSlide">
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
      @swiper="handleListSwiperReady"
      @slide-change="handleListSlideChange"
    >
      <swiper-slide class="slide-item" :key="index" v-for="(item, index) in data">
        <slot name="item" v-bind="{ item, index }"></slot>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, reactive, onMounted, onBeforeUnmount, PropType } from 'vue'
  import { LozadObserver, LOZAD_CLASS_NAME, LOADED_CLASS_NAME } from '/@/effects/lozad'
  import SwiperClass, { Swiper, SwiperSlide } from '/@/effects/swiper'

  export default defineComponent({
    name: 'LensListSwiper',
    components: {
      Swiper,
      SwiperSlide
    },
    props: {
      data: {
        type: Array as PropType<Array<any>>,
        required: true
      },
      rows: {
        type: Number,
        default: 2
      },
      columns: {
        type: Number,
        default: 5
      }
    },
    setup() {
      const lozadObserver = ref<LozadObserver | null>(null)
      const listSwiperState = reactive({ canPrev: false, canNext: true })
      const listSwiper = ref<SwiperClass>()
      const listPrevSlide = () => listSwiper.value?.slidePrev()
      const listNextSlide = () => listSwiper.value?.slideNext()
      const handleListSlideChange = (_swiper: SwiperClass) => {
        listSwiperState.canNext = !_swiper.isEnd
        listSwiperState.canPrev = !_swiper.isBeginning
      }
      const handleListSwiperReady = (_swiper: SwiperClass) => {
        listSwiper.value = _swiper
        handleListSlideChange(_swiper)
      }

      const observeLozad = () => {
        const lozadElements = listSwiper.value?.el.querySelectorAll(`.${LOZAD_CLASS_NAME}`)
        if (lozadElements?.length) {
          lozadObserver.value = window.$lozad(lozadElements, {
            loaded: (element) => element.classList.add(LOADED_CLASS_NAME)
          })
          lozadObserver.value.observe()
        }
      }

      onMounted(() => {
        observeLozad()
      })

      onBeforeUnmount(() => {
        lozadObserver.value?.observer.disconnect()
        lozadObserver.value = null
      })

      return {
        handleListSwiperReady,
        handleListSlideChange,
        listSwiperState,
        listPrevSlide,
        listNextSlide
      }
    }
  })
</script>

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
