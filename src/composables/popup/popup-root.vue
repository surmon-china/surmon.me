<script lang="ts" setup>
  import { watchEffect, ref, onMounted } from 'vue'
  import { usePopup } from './'
  import PopupMedia from './popup-media.vue'

  const { state, media, hidden, $setRootContainer: setRootContainer } = usePopup()

  const element = ref<HTMLElement>(null as any)

  const handleWindowScroll = () => hidden()
  const handleMaskClick = () => {
    if (state.maskClosable) {
      hidden()
    }
  }

  watchEffect(() => {
    state.visible && state.scrollClosable
      ? // https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md#solution-the-passive-option
        window.addEventListener('scroll', handleWindowScroll, { passive: true })
      : window.removeEventListener('scroll', handleWindowScroll)
  })

  onMounted(() => setRootContainer(element.value))
</script>

<template>
  <div id="popup" v-disabled-wallflower>
    <transition name="module">
      <div class="popup-mask" v-show="state.visible" @click.self="handleMaskClick">
        <div ref="element" class="popup-modal-container"></div>
        <popup-media v-bind="media as any" v-if="state.isMedia && !!media.src" />
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  #popup {
    .popup-mask {
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
      @include mix.visibility-transition();
      @include mix.backdrop-blur(5px);
      background-color: rgba($grey, 0.5);
      @include mix.dark-theme {
        background-color: rgba($black, 0.5);
      }

      .popup-modal-container {
        display: contents;
      }
    }
  }
</style>
