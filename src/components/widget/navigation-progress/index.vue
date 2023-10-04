<script lang="ts" setup>
  import { onBeforeUnmount } from 'vue'
  import { useRouter } from 'vue-router'
  import { UNDEFINED } from '/@/constants/value'
  import { createNavigationProgress } from './state'

  const props = defineProps({
    spin: Boolean,
    color: String,
    height: {
      type: Number,
      default: 3
    }
  })

  const router = useRouter()
  const state = createNavigationProgress()

  router.beforeEach((_, __, next) => {
    state.start()
    next()
  })

  router.afterEach(() => state.finish())
  router.onError(() => state.finish())

  onBeforeUnmount(() => {
    state.clear()
  })
</script>

<template>
  <div
    id="navigation-progress"
    :class="{ visible: state.isLoading.value }"
    :style="{ '--height': props.height + 'px' }"
  >
    <div
      class="progress"
      :style="{
        background: props.color || UNDEFINED,
        transform: `scaleX(${state.progress.value}%)`
      }"
    />
    <div v-if="props.spin" class="spin">
      <div class="spin-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import 'src/styles/variables.scss';
  @import 'src/styles/mixins.scss';

  #navigation-progress {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: var(--height);
    pointer-events: none;
    z-index: $z-index-navigation-progress;
    @include visibility-transition($transition-time-normal);
    @include hidden();
    &.visible {
      @include visible();
    }

    .progress {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: var(--height);
      width: auto;
      background-color: $primary;
      transform-origin: left;
      transition-property: transform;
      transition-duration: $transition-time-fast;
      transition-timing-function: ease;
    }

    .spin {
      position: absolute;
      top: $lg-gap;
      right: $lg-gap;

      .spin-ring {
        $size: 3rem;
        display: inline-block;
        position: relative;
        width: $size;
        height: $size;

        @keyframes spin-ring {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        div {
          $size: 2rem;
          $border: 3px;
          box-sizing: border-box;
          display: block;
          position: absolute;
          width: $size;
          height: $size;
          margin: $border;
          border: $border solid transparent;
          border-top-color: $primary;
          border-radius: 50%;
          animation: spin-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
          &:nth-child(1) {
            animation-delay: -0.45s;
          }
          &:nth-child(2) {
            animation-delay: -0.3s;
          }
          &:nth-child(3) {
            animation-delay: -0.15s;
          }
        }
      }
    }
  }
</style>
