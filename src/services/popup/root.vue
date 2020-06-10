<template>
  <div id="popup" class="popup">
    <transition name="module">
      <div class="mask" v-show="state.visibility" @click.self="handleMaskClick">
        <div class="warpper" :class="{ border: state.border }" ref="element">
          <div class="close" v-if="state.closeButton" @click="handleCloseClick">
            <i class="iconfont icon-cancel"></i>
          </div>
          <img v-if="state.isImage" :src="image.src" v-bind="image.props">
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
  import { defineComponent, watchEffect, ref } from 'vue'
  import { usePopupWithRoot } from './'

  export default defineComponent({
    name: 'PopupRoot',
    setup() {
      const element = ref<HTMLElement>(null as any)
      const { state, image, hidden, visible } = usePopupWithRoot(() => element.value)

      const handleMaskClick = () => {
        state.maskClose && hidden()
      }

      watchEffect(() => {
        state.scrollClose
          ? window.addEventListener('scroll', hidden)
          : window.removeEventListener('scroll', hidden)
      })

      return {
        element,
        state,
        image,
        handleMaskClick,
        handleCloseClick: hidden
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
      @include visibility-transition();
      @include backdrop-blur();

      .warpper {
        position: relative;
        min-width: 24rem;
        min-height: 8rem;
        background-color: $module-bg;

        &.border {
          border: solid $sm-gap $module-hover-bg;
        }

        .close {
          $size: $lg-gap * 2;
          display: block;
          width: $size;
          height: $size;
          line-height: $size;
          text-align: center;
          position: absolute;
          right: $sm-gap;
          top: $sm-gap;
          z-index: $z-index-normal + 1;
          background-color: $module-bg;
          color: $text;
          @include background-transition();
          cursor: pointer;

          &:hover {
            background-color: $module-bg-opacity-9;
          }

          .iconfont {
            display: block;
          }
        }

        img {}
        video {}
        iframe {}
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
    }
  }
</style>
