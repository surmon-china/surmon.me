<template>
  <div id="mobile-main">
    <div id="aside" :class="openedAsideClass">
      <aside-view :open="isOpenedSidebar" />
    </div>
    <div id="main" :class="openedAsideClass">
      <div v-if="isOpenedSidebar" class="close-mask" @click="closeMobileSidebar" />
      <header-view />
      <main class="main-container">
        <slot></slot>
      </main>
      <footer-view />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import HeaderView from './header.vue'
  import FooterView from './footer.vue'
  import AsideView from './aside.vue'

  export default defineComponent({
    name: 'MobileMain',
    components: {
      HeaderView,
      FooterView,
      AsideView
    },
    setup() {
      const { globalState } = useEnhancer()
      const isOpenedSidebar = computed(() => globalState.switchBox.mobileSidebar)
      const openedAsideClass = computed(() => ({ open: isOpenedSidebar.value }))
      const closeMobileSidebar = () => {
        globalState.switchTogglers.mobileSidebar(false)
      }

      return {
        isOpenedSidebar,
        openedAsideClass,
        closeMobileSidebar
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/init.scss';

  #mobile-main {
    color: $text;
    background-color: $module-bg-hover;
    $aside-width: 68%;

    #aside {
      width: $aside-width;
      position: fixed;
      top: 0;
      left: 0;
      height: 100%;
      background-color: $mobile-aside-bg;
      transform: translate3d(-100%, 0, 0);
      transition: $mobile-aside-transition;

      &.open {
        overflow: hidden;
        transform: translate3d(0, 0, 0);
        -webkit-overflow-scrolling: touch;
      }
    }

    #main {
      transition: $mobile-aside-transition;

      &.open {
        transform: translate3d($aside-width, 0, 0);
      }

      .close-mask {
        position: fixed;
        width: 100%;
        height: 100%;
        right: 0;
        bottom: 0;
        z-index: $z-index-top;
        background-color: $module-bg-translucent;
        @include backdrop-blur(3px);
      }

      .main-container {
        position: relative;
        overflow: hidden;
        width: 100%;
        margin: 0;
        padding: ($mobile-header-height + $lg-gap) $gap $gap;
        transition: width 0.35s;
      }
    }
  }
</style>
