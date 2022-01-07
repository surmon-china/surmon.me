<template>
  <div class="desktop-main">
    <background />
    <wallflower />
    <client-only>
      <popup :visible="isOnSponsorModal" :border="false" @close="handleSponsorModalClose">
        <iframe
          :style="{ width: '600px', height: '200px', borderRadius: '4px' }"
          :src="VALUABLE_LINKS.SPONSOR"
        />
      </popup>
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
        <!-- unuse suspense -> async route component -> can't extract style to css file -->
        <router-view v-slot="{ Component, route }">
          <div class="router-view">
            <transition name="page" mode="out-in" @before-enter="handlePageTransitionDone">
              <suspense>
                <component :is="Component" :key="route.name" />
              </suspense>
            </transition>
          </div>
        </router-view>
      </div>
      <aside-view v-if="layoutColumn.isNormal" />
    </main>
    <footer-view />
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { getLayoutByRouteMeta } from '/@/services/layout'
  import { MAIN_ELEMENT_ID, MAIN_CONTENT_ELEMENT_ID } from '/@/constants/anchor'
  import { VALUABLE_LINKS } from '/@/config/app.config'
  import NavView from './nav.vue'
  import AsideView from './aside/index.vue'
  import HeaderView from './header.vue'
  import FooterView from './footer.vue'
  import Wallflower from '/@/components/widget/wallflower/garden.vue'
  import Wallpaper from '/@/components/widget/wallpaper/switcher.vue'
  import Background from '/@/components/widget/background.vue'
  import Player from '/@/components/widget/player.vue'
  import Share from '/@/components/widget/share.vue'
  import Toolbox from '/@/components/widget/toolbox.vue'

  export default defineComponent({
    name: 'DesktopMain',
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
      const { route, globalState } = useEnhancer()
      const isOnSponsorModal = computed(() => globalState.switchBox.sponsorModal)
      const handleSponsorModalClose = () => {
        globalState.switchTogglers.sponsorModal()
      }
      const handlePageTransitionDone = () => {
        globalState.setLayoutColumn(getLayoutByRouteMeta(route.meta))
      }

      return {
        MAIN_ELEMENT_ID,
        MAIN_CONTENT_ELEMENT_ID,
        VALUABLE_LINKS,
        isOnSponsorModal,
        layoutColumn: globalState.layoutColumn,
        handlePageTransitionDone,
        handleSponsorModalClose
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/init.scss';

  .desktop-main {
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
