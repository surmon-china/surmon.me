<template>
  <div class="pc-main">
    <Teleport to="#popup" :disabled="disabled">
      <div>哈哈哈</div>
    </Teleport>
    <header-view />
    <figure class="widget">
      <language />
      <theme-switch />
    </figure>
    <main
      id="main"
      class="main-container"
      :class="{
        'full-view': isFullViewWidth
      }"
    >
      <!-- <nav-view v-if="!isThreeColumns" /> -->
      <div
        id="main-content"
        class="main-content"
        :class="{
          'two-column': isTwoColumns,
          'three-column': isThreeColumns,
          'full-view': isFullViewWidth
        }"
      >
        <slot></slot>
      </div>
      <!-- <aside-view v-if="!isTwoColumns && !isThreeColumns" key="aside" /> -->
    </main>
    <footer-view />
  </div>
</template>

<script lang="ts">
  import { Teleport, ref } from 'vue'
  import { mapState } from 'vuex'
  import { isClient } from '/@/vuniversal/env'
  // import NavView from './nav'
  import HeaderView from './header.vue'
  import FooterView from './footer.vue'
  // import AsideView from './aside/main'
  // import Barrage from '/@/components/widget/barrage/main'
  // import Wallflower from '/@/components/widget/wallflower/garden'
  // import WallpaperWall from '/@/components/widget/wallpaper/wall'
  // import WallpaperSwitch from '/@/components/widget/wallpaper/switch'
  // import MyMap from '/@/components/widget/my-map'
  // import Background from '/@/components/widget/background'
  import Language from '/@/components/widget/language.vue'
  import ThemeSwitch from '/@/components/widget/theme.vue'
  // import ToolBox from '/@/components/widget/toolbox'
  // import ShareBox from '/@/components/widget/share'
  // import { isServiceRoute } from '/@/services/route-validator'
  // import systemConstants from '/@/constants/system'

  export default {
    name: 'PcMain',
    components: {
      Teleport,
      // ToolBox,
      // ShareBox,
      Language,
      // WallpaperSwitch,
      ThemeSwitch,
      // MyMap,
      // Wallflower,
      // WallpaperWall,
      // Background,
      // Barrage,
      HeaderView,
      FooterView,
      // AsideView,
      // NavView
    },
    setup() {
      const disabled = ref(true)

      setTimeout(() => {
        disabled.value = false
      }, 1666)
      return {
        disabled
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import 'src/assets/styles/init.scss';

  .pc-main {
    padding-top: $mobile-header-height + $lg-gap;

    @media screen and (max-width: 1200px) {
      #theme,
      #language,
      .sidebar-share {
        display: none !important;
      }
    }

    .sidebar-share {
      position: fixed;
      top: 12%;
      left: 0;
      height: auto;
      max-width: 4rem;
      display: flex;
      flex-direction: column;
      opacity: 0.4;

      &:hover {
        opacity: 1;
      }

      &::v-deep(> .share-ejector) {
        width: 3rem;
        height: 3rem;
        line-height: 3rem;
        font-size: 18px;
        transition: width $transition-time-fast;

        &.renren,
        &.evernote,
        &.linkedin,
        &.mail {
          display: none;
        }

        &:hover {
          width: 120%;
        }
      }
    }

    .main-container {
      position: relative;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      width: $container-width;

      &.full-view {
        width: 100%;
      }

      .main-content {
        width: $main-width;
        position: relative;
        overflow: hidden;
        transition: none;

        &:-moz-full-screen {
          overflow-y: auto;
        }

        &:-webkit-full-screen {
          overflow-y: auto;
        }

        &:fullscreen {
          overflow-y: auto;
        }

        &.two-column {
          flex-grow: 1;
        }

        &.three-column {
          width: 100%;
          margin: 0;
        }

        &.full-view {
          width: 100%;
          margin: -$lg-gap 0;
        }
      }
    }
  }
</style>
