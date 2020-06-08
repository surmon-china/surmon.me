<template>
  <transition name="fade">
    <div id="popup" class="popup" v-if="visible">
      <div class="mask" @click="hidden"></div>
      <popup v-bind="props" :stiff="false" />
    </div>
  </transition>
</template>

<script lang="ts">
  import { defineComponent, onMounted, ref, computed } from 'vue'
  import { usePopup, PopupType } from './'
  import Popup from './popup.vue'

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
      width: 100%;
      height: $header-height;
      z-index: $z-index-header;
      background-color: $module-bg;
      user-select: none;
    }

    img {}
    video {}
    iframe {}
  }
</style>
