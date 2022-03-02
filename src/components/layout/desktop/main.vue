<template>
  <div class="desktop-main">
    <background />
    <wallflower />
    <client-only>
      <popup :visible="switcher.sponsor" :border="false" @close="handleSponsorModalClose">
        <iframe
          :style="{ width: '600px', height: '200px', borderRadius: '4px' }"
          :src="VALUABLE_LINKS.SPONSOR"
        />
      </popup>
      <popup
        :visible="switcher.feedback"
        :mask-close="false"
        :scroll-close="false"
        @close="handleFeedbackModalClose"
      >
        <feedback @close="handleFeedbackModalClose" />
      </popup>
    </client-only>
    <template v-if="!layoutColumn.isFull">
      <share class="main-share" />
      <wallpaper />
      <toolbox />
      <client-only>
        <music-player-handle />
      </client-only>
    </template>
    <header-view />
    <main
      :id="MAIN_ELEMENT_ID"
      class="main-container"
      :class="{ 'full-page': layoutColumn.isFull }"
    >
      <!-- MARK: keep order > long content > flicker -->
      <nav-view class="nav-view" v-if="layoutColumn.isNormal" />
      <aside-view class="aside-view" v-if="layoutColumn.isNormal" />
      <div
        :id="MAIN_CONTENT_ELEMENT_ID"
        class="main-view"
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
    </main>
    <footer-view class="footer-view" />
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
  import MusicPlayerHandle from '/@/components/widget/music-player/handle.vue'
  import Wallflower from '/@/components/widget/wallflower/garden.vue'
  import Wallpaper from '/@/components/widget/wallpaper/switcher.vue'
  import Background from '/@/components/widget/background.vue'
  import Share from '/@/components/widget/share.vue'
  import Toolbox from '/@/components/widget/toolbox.vue'
  import Feedback from '/@/components/widget/feedback.vue'

  export default defineComponent({
    name: 'DesktopMain',
    components: {
      Share,
      Feedback,
      Wallpaper,
      MusicPlayerHandle,
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
      const handlePageTransitionDone = () => {
        globalState.setLayoutColumn(getLayoutByRouteMeta(route.meta))
      }
      const handleSponsorModalClose = () => {
        globalState.toggleSwitcher('sponsor', false)
      }
      const handleFeedbackModalClose = () => {
        globalState.toggleSwitcher('feedback', false)
      }

      return {
        MAIN_ELEMENT_ID,
        MAIN_CONTENT_ELEMENT_ID,
        VALUABLE_LINKS,
        switcher: globalState.switcher,
        layoutColumn: globalState.layoutColumn,
        handlePageTransitionDone,
        handleSponsorModalClose,
        handleFeedbackModalClose
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

      .nav-view {
        order: 1;
        flex-shrink: 0;
        margin-right: $lg-gap;
      }

      .aside-view {
        order: 3;
        flex-shrink: 0;
        margin-left: $lg-gap;
      }

      .main-view {
        order: 2;
        flex-grow: 1;
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
          /* flex-grow: 1; */
        }

        &.layout-wide {
          flex-grow: unset;
          width: 100%;
          margin: 0;
        }

        &.layout-full {
          flex-grow: unset;
          width: 100%;
          margin: -$lg-gap 0;
        }
      }
    }

    .footer-view {
      margin-top: $lg-gap;
    }
  }
</style>
