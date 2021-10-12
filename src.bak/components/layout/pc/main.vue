<template>
  <div class="pc-main">
    <background />
    <template v-if="!layoutColumn.isFullPage">
      <language />
      <theme />
      <share class="main-share" />
      <wallpaper />
      <template v-if="!layoutColumn.isFullColumn">
        <toolbox />
      </template>
    </template>
    <client-only>
      <figure>
        <barrage />
        <wallflower />
      </figure>
    </client-only>
    <header-view />
    <main
      id="main"
      class="main-container"
      :class="{ 'full-page': layoutColumn.isFullPage }"
    >
      <nav-view v-if="layoutColumn.isNormal || layoutColumn.isWide" />
      <div
        id="main-content"
        class="main-content"
        :class="{
          'layout-normal': layoutColumn.isNormal,
          'layout-wide': layoutColumn.isWide,
          'layout-full-column': layoutColumn.isFullColumn,
          'layout-full-page': layoutColumn.isFullPage
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
  import { defineComponent, ref } from 'vue'
  import { mapState } from 'vuex'
  import { isClient } from '../../../../src/environment'
  import NavView from './nav.vue'
  import AsideView from './aside/index.vue'
  import HeaderView from './header.vue'
  import FooterView from './footer.vue'
  import Barrage from '/@/components/widget/barrage/main.vue'
  import Wallflower from '/@/components/widget/wallflower/garden.vue'
  import Wallpaper from '/@/components/widget/wallpaper/main.vue'
  import Background from '/@/components/widget/background.vue'
  import Language from '/@/components/widget/language.vue'
  import Theme from '/@/components/widget/theme.vue'
  import Share from '/@/components/widget/share.vue'
  import Toolbox from '/@/components/widget/toolbox.vue'
  import { useGlobalState } from '../../../../src/app/state'

  export default defineComponent({
    name: 'PcMain',
    components: {
      Share,
      Language,
      Wallpaper,
      Theme,
      Toolbox,
      Wallflower,
      Barrage,
      Background,
      HeaderView,
      FooterView,
      AsideView,
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
