<template>
  <transition name="fade">
    <div id="popup" class="popup" v-if="state.visibility">
      <div class="mask" @click="hidden"></div>
      <popup v-bind="props" :stiff="false" />
    </div>
  </transition>
</template>

<script lang="ts">
  import { defineComponent, onMounted, ref, computed } from 'vue'
  import { usePopup, PopupType } from './'
  import Popup from './popup'

  export default defineComponent({
    name: 'PopupRoot',
    components: {
      Popup
    },
    setup() {
      const { state, hidden, visible } = usePopup()
      const props = computed(() => {
        const targetProps = state.props as object
        const targetType = state.type as string
        return targetType
          ? { ...targetProps, [targetType]: state.src }
          : targetProps
      })

      return {
        state,
        hidden,
        visible,
        props
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/assets/styles/init.scss';

  #popup {
    .mask {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: $z-index-top;
      user-select: none;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      background-color: rgba($black-light, 0.5);
      @include hidden();
      @include visibility-transition();
      // @include backdrop-blur();

      &.display {
        @include visible();
      }

      > img,
      > iframe {
        min-width: 10%;
        min-height: 10%;
        background-color: rgba($white, 0.3);
        border: $sm-gap solid rgba($grey, 0.3);

        &.sponsor {
          width: 600px;
          height: 200px;
          box-sizing: content-box;
          border: none;
          border-left: $gap solid $white;
          border-right: $gap solid $white;
        }
      }

      > img {
        max-width: 90%;
        max-height: 90%;
      }
      
      > iframe {
        width: 90%;
        height: 90%;
      }
    }

    img {}
    video {}
    iframe {}
  }
</style>
