<template>
  <div class="pc-main">
    <client-only>
      <figure class="widget">
        <barrage />
        <background />
        <wallflower />
        <template v-if="!layoutColumn.isFullScreenLayout">
          <language />
          <theme />
          <share />
          <wallpaper />
          <template v-if="!layoutColumn.isFullColumeLayout">
            <toolbox />
          </template>
        </template>
      </figure>
    </client-only>
    <header-view />
    <main
      id="main"
      class="main-container"
      :class="{ 'full-page': layoutColumn.isFullScreenLayout }"
    >
      <nav-view v-if="layoutColumn.isNormalLayout || layoutColumn.isWideLayout" />
      <div
        id="main-content"
        class="main-content"
        :class="{
          'layout-normal': layoutColumn.isNormalLayout,
          'layout-wide': layoutColumn.isWideLayout,
          'layout-full-column': layoutColumn.isFullColumeLayout,
          'layout-full-page': layoutColumn.isFullScreenLayout
        }"
      >
        <slot />
      </div>
      <aside-view v-if="layoutColumn.isNormalLayout" />
    </main>
    <footer-view />
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { mapState } from 'vuex'
  import { isClient } from '/@/vuniversal/env'
  import NavView from './nav.vue'
  import AsideView from './aside/main.vue'
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
  import { useGlobalState } from '/@/state'

  export default defineComponent({
    name: 'PcMain',
    components: {
      Share,
      Language,
      Wallpaper,
      Theme,
      Toolbox,
      Wallflower,
      Background,
      Barrage,
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
  @import 'src/assets/styles/init.scss';

  .pc-main {
    padding-top: $mobile-header-height + $lg-gap;

    @media screen and (max-width: 1200px) {
      #theme,
      #language,
      .main-share {
        display: none !important;
      }
    }

    &::v-deep(.share) {
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

      > .share-ejector {
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
