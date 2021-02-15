<template>
  <div id="popup" class="popup">
    <transition name="module">
      <div
        class="mask"
        v-show="state.visibility"
        @click.self="handleMaskClick"
      >
        <div
          ref="element"
          class="warpper"
          :class="{ border: state.border }"
        >
          <img
            v-if="state.isImage"
            v-bind="image.attrs"
            :src="image.src"
          >
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
  import { defineComponent, watchEffect, ref } from 'vue'
  import { usePopupWithRoot } from './hook'
  export default defineComponent({
    name: 'PopupRoot',
    setup() {
      const element = ref<HTMLElement>(null as any)
      const { state, image, hidden, visible } = usePopupWithRoot(() => element.value)
      const handleWindowScroll = () => hidden()
      const handleMaskClick = () => {
        state.maskClose && hidden()
      }

      watchEffect(() => {
        state.scrollClose
          // https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md#solution-the-passive-option
          ? window.addEventListener('scroll', handleWindowScroll, { passive: true })
          : window.removeEventListener('scroll', handleWindowScroll)
      })

      return {
        element,
        state,
        image,
        handleMaskClick
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/init.scss';

  #popup {
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
      @include visibility-transition();
      @include backdrop-blur();

      .warpper {
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
          border: $sm-gap solid $module-bg-darker-1;
          @include radius-box($sm-radius);
        }
      }
    }
  }
</style>
