<template>
  <div class="pc-main">
    <background />
    <client-only>
      <wallflower />
    </client-only>
    <template v-if="!layoutColumn.isFull">
      <share class="main-share" />
      <wallpaper />
      <toolbox />
      <client-only>
        <player />
      </client-only>
    </template>
    <header-view />
    <main
      :id="MAIN_ELEMENT_ID"
      class="main-container"
      :class="{ 'full-page': layoutColumn.isFull }"
    >
      <nav-view v-if="layoutColumn.isNormal" />
      <div
        :id="MAIN_CONTENT_ELEMENT_ID"
        class="main-content"
        :class="{
          'layout-normal': layoutColumn.isNormal,
          'layout-wide': layoutColumn.isWide,
          'layout-full': layoutColumn.isFull
        }"
      >
        <slot />
      </div>
      <aside-view v-if="layoutColumn.isNormal" />
    </main>
    <footer-view />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { useGlobalState } from '/@/app/state'
  import { MAIN_ELEMENT_ID, MAIN_CONTENT_ELEMENT_ID } from '/@/constants/anchor'
  import NavView from './nav.vue'
  import AsideView from './aside/index.vue'
  import HeaderView from './header.vue'
  import FooterView from './footer.vue'
  import Wallflower from '/@/components/widget/wallflower/garden.vue'
  import Wallpaper from '/@/components/widget/wallpaper/main.vue'
  import Background from '/@/components/widget/background.vue'
  import Player from '/@/components/widget/player.vue'
  import Share from '/@/components/widget/share.vue'
  import Toolbox from '/@/components/widget/toolbox.vue'

  export default defineComponent({
    name: 'PCMain',
    components: {
      Share,
      Wallpaper,
      Player,
      Toolbox,
      Wallflower,
      Background,
      HeaderView,
      FooterView,
      AsideView,
      NavView
    },
    setup() {
      const globalState = useGlobalState()
      return {
        MAIN_ELEMENT_ID,
        MAIN_CONTENT_ELEMENT_ID,
        layoutColumn: globalState.layoutColumn
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/init.scss';

  .pc-main {
    padding-top: $header-height + $lg-gap;

    @media screen and (max-width: 1200px) {
      #theme,
      #language,
      .main-share {
        display: none !important;
      }
    }

    .main-share {
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

      ::v-deep(.share-ejector) {
        $height: 2.1em;
        width: 3rem;
        height: $height;
        line-height: $height;
        font-size: $font-size-h4;
        border-top-right-radius: $xs-radius;
        border-bottom-right-radius: $xs-radius;
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

      &.full-page {
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

        &.layout-wide {
          width: 100%;
          margin: 0;
        }

        &.layout-full {
          width: 100%;
          margin: -$lg-gap 0;
        }
      }
    }
  }
</style>
