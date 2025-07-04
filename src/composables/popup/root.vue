<script lang="ts" setup>
  import { watchEffect, ref } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { usePopupWithRoot } from './hook'

  const element = ref<HTMLElement>(null as any)
  const { isDarkTheme, globalState } = useEnhancer()
  const { state, image, hidden } = usePopupWithRoot(() => element.value)
  const handleWindowScroll = () => hidden()
  const handleMaskClick = () => {
    state.maskClose && hidden()
  }

  watchEffect(() => {
    state.visible && state.scrollClose
      ? // https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md#solution-the-passive-option
        window.addEventListener('scroll', handleWindowScroll, { passive: true })
      : window.removeEventListener('scroll', handleWindowScroll)
  })
</script>

<template>
  <div
    id="popup"
    class="popup"
    :class="{ dark: isDarkTheme, mobile: globalState.userAgent.isMobile }"
    v-disabled-wallflower
  >
    <transition name="module">
      <div class="mask" v-show="state.visible" @click.self="handleMaskClick">
        <div ref="element" class="wrapper" :class="{ border: state.border }">
          <img v-if="state.isImage" v-bind="image.attrs" :src="image.src || ''" />
        </div>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  #popup {
    &.dark {
      .mask {
        background-color: rgba($black, 0.5);
      }
    }
    &.mobile {
      .mask {
        .wrapper {
          & > ::v-deep(*) {
            min-width: 50vw;
            min-height: 4rem;
          }
        }
      }
    }

    .mask {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: $z-index-top;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      background-color: rgba($grey, 0.5);
      @include mix.visibility-transition();
      @include mix.backdrop-blur(5px);

      .wrapper {
        display: contents;
        position: relative;

        & > ::v-deep(*) {
          min-width: 24rem;
          min-height: 8rem;
          max-width: 90%;
          max-height: 90%;
          background-color: $module-bg;
        }

        &.border > ::v-deep(*) {
          border: $gap-sm solid $module-bg-darker-1;
          @include mix.radius-box($radius-sm);
        }
      }
    }
  }
</style>
