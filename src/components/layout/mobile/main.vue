<template>
  <div id="mobile-main">
    <div id="aside" :class="openedAsideClass">
      <aside-view :open="isOpenedSidebar" />
    </div>
    <div id="main" :class="openedAsideClass">
      <div
        v-if="isOpenedSidebar"
        class="close-mask"
        @click="closeMobileSidebar"
      />
      <header-view />
      <main class="main-container">
        <div id="main-content" class="main-content">
          <slot></slot>
        </div>
      </main>
      <footer-view />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'
  import { useStore } from 'vuex'
  import { LANGUAGE_KEYS } from '/@/language/key'
  import { getFileCDNUrl } from '/@/transforms/url'
  import { useGlobalState } from '/@/state'
  import HeaderView from './header.vue'
  import FooterView from './footer.vue'
  import AsideView from './aside.vue'

  export default {
    name: 'MobileMain',
    components: {
      HeaderView,
      FooterView,
      AsideView
    },
    setup() {
      const globalState = useGlobalState()
      const isOpenedSidebar = globalState.switchBox.mobileSidebar
      const openedAsideClass = computed(() => ({ open: isOpenedSidebar }))

      return {
        isOpenedSidebar,
        openedAsideClass,
        closeMobileSidebar: globalState.switchTogglers.mobileSidebar
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import 'src/assets/styles/init.scss';

  #mobile-main {
    color: $text;
    background-color: $module-bg-hover;
    $aside-width: 68%;

    #app-aside {
      width: $aside-width;
      position: fixed;
      top: 0;
      left: 0;
      height: 100%;
      background-color: $mobile-aside-bg;
      transform: translate3d(-100%, 0 ,0);
      transition: $mobile-aside-transition;

      &.open {
        overflow: hidden;
        transform: translate3d(0, 0 ,0);
        -webkit-overflow-scrolling: touch;
      }
    }

    #app-main {
      transition: $mobile-aside-transition;

      &.open {
        transform: translate3d($aside-width, 0 ,0);
      }

      .close-mask {
        position: fixed;
        width: 100%;
        height: 100%;
        right: 0;
        bottom: 0;
        z-index: $z-index-top;
        background-color: $module-bg;
      }

      .main-container {
        position: relative;
        width: 100%;

        .main-content {
          position: relative;
          overflow: hidden;
          width: 100%;
          margin: 0;
          padding: ($mobile-header-height + $lg-gap) $gap $gap;
          transition: width .35s;
        }
      }
    }
  }
</style>
