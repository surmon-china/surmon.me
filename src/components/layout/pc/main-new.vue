<template>
  <div class="pc-main">
    <client-only>
      <figure class="widget">
        <background />
        <language />
        <theme />
        <wallpaper />
      </figure>
    </client-only>
    <header-view />
    <main
      id="main"
      class="main-container"
      :class="{ 'layout-full-page': isFullViewWidth }"
    >
      <nav-view v-if="!layoutColumn.isFullScreenLayout" />
      <div
        id="main-content"
        class="main-content"
        :class="{
          'layout-normal': layoutColumn.isNormalLayout,
          'layout-full-column': layoutColumn.isFullColumeLayout,
          'layout-full-page': layoutColumn.isFullScreenLayout
        }"
      >
        <slot />
      </div>
      <!-- <aside-view v-if="layoutColumn.isNormalLayout" key="aside" /> -->
    </main>
    <footer-view />
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { mapState } from 'vuex'
  import { isClient } from '/@/vuniversal/env'
  import NavView from './nav.vue'
  // import AsideView from './aside/main'
  import HeaderView from './header.vue'
  import FooterView from './footer.vue'
  // import Barrage from '/@/components/widget/barrage/main'
  // import Wallflower from '/@/components/widget/wallflower/garden'
  // import WallpaperWall from '/@/components/widget/wallpaper/wall'
  import Wallpaper from '/@/components/widget/wallpaper/main.vue'
  // import MyMap from '/@/components/widget/my-map'
  import Background from '/@/components/widget/background.vue'
  import Language from '/@/components/widget/language.vue'
  import Theme from '/@/components/widget/theme.vue'
  // import ToolBox from '/@/components/widget/toolbox'
  // import ShareBox from '/@/components/widget/share'
  import { useGlobalState } from '/@/state'

  export default defineComponent({
    name: 'PcMain',
    components: {
      // ToolBox,
      // ShareBox,
      Language,
      Wallpaper,
      Theme,
      // MyMap,
      // Wallflower,
      // WallpaperWall,
      Background,
      // Barrage,
      HeaderView,
      FooterView,
      // AsideView,
      NavView
    },
    setup() {
      const globalState = useGlobalState()
      return {
        layoutColumn: globalState.layoutColumn
      }
    }
  })
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

      &.layout-full-page {
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

        &.layout-normal {
          flex-grow: 1;
        }

        &.layout-full-column {
          width: 100%;
          margin: 0;
        }

        &.layout-full-page {
          width: 100%;
          margin: -$lg-gap 0;
        }
      }
    }
  }
</style>
