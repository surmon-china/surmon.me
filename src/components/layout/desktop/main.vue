<script lang="ts" setup>
  import { onMounted } from 'vue'
  import { MAIN_ELEMENT_ID, MAIN_CONTENT_ELEMENT_ID } from '/@/constants/anchor'
  import { useEnhancer } from '/@/app/enhancer'
  import { useMusic } from '/@/composables/music'
  import { useWallpaperStore } from '/@/stores/wallpaper'
  import { getLayoutByRouteMeta } from '/@/transforms/layout'
  import logger from '/@/utils/logger'
  import MusicPlayerHandle from '/@/components/widget/music-player/handle.vue'
  import Wallflower from '/@/components/widget/wallflower/garden.vue'
  import Wallpaper from '/@/components/widget/wallpaper/switcher.vue'
  import Background from '/@/components/widget/background.vue'
  import { useSponsorState } from '/@/components/widget/sponsor/state'
  import SponsorTabs from '/@/components/widget/sponsor/tabs.vue'
  import SponsorProvider from '/@/components/widget/sponsor/provider.vue'
  import Share from '/@/components/widget/share.vue'
  import Toolbox from '/@/components/widget/toolbox.vue'
  import Feedback from '/@/components/widget/feedback.vue'
  import Statement from '/@/components/widget/statement.vue'
  import HeaderView from './header.vue'
  import FooterView from './footer.vue'
  import AsideView from './aside/index.vue'
  import NavView from './nav.vue'

  const sponsorState = useSponsorState()
  const wallpaperStore = useWallpaperStore()
  const { route, gState } = useEnhancer()
  const { switcher, layoutColumn } = gState
  const handlePageTransitionDone = () => {
    gState.setLayoutColumn(getLayoutByRouteMeta(route.meta))
  }
  const handleSponsorModalClose = () => {
    gState.toggleSwitcher('sponsor', false)
  }
  const handleFeedbackModalClose = () => {
    gState.toggleSwitcher('feedback', false)
  }
  const handleStatementModalClose = () => {
    gState.toggleSwitcher('statement', false)
  }

  onMounted(() => {
    // bing wallpaper
    wallpaperStore.fetch().catch((error) => {
      logger.failure('bing wallpaper fetch failed!', error)
    })
    // music player
    useMusic()
      .init()
      .catch((error) => {
        logger.failure('player init failed!', error)
      })
  })
</script>

<template>
  <div class="desktop-main">
    <background />
    <wallflower />
    <client-only>
      <popup :visible="switcher.sponsor" @close="handleSponsorModalClose">
        <div class="sponsor-modal">
          <div class="sponsor">
            <sponsor-tabs class="tabs" :state="sponsorState" :hide-title="true" />
            <sponsor-provider class="provider" :state="sponsorState" :max-sponsors="9" />
          </div>
        </div>
      </popup>
      <popup
        :visible="switcher.feedback"
        :mask-close="false"
        :scroll-close="false"
        @close="handleFeedbackModalClose"
      >
        <feedback @close="handleFeedbackModalClose" />
      </popup>
      <popup :visible="switcher.statement" :scroll-close="false" @close="handleStatementModalClose">
        <statement />
      </popup>
    </client-only>
    <template v-if="!layoutColumn.isFull">
      <share class="main-share" disabled-image-share />
      <wallpaper />
      <toolbox />
      <client-only>
        <music-player-handle />
      </client-only>
    </template>
    <header-view />
    <main :id="MAIN_ELEMENT_ID" class="main-container" :class="{ 'full-page': layoutColumn.isFull }">
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
        <router-view v-slot="{ Component, route: r }">
          <div class="router-view" v-disabled-wallflower>
            <transition name="page" mode="out-in" @before-enter="handlePageTransitionDone">
              <suspense>
                <component :is="Component" :key="r.name" />
              </suspense>
            </transition>
          </div>
        </router-view>
      </div>
    </main>
    <footer-view class="footer-view" />
  </div>
</template>

<style lang="scss" scoped>
  @import 'src/styles/variables.scss';
  @import 'src/styles/mixins.scss';

  .sponsor-modal {
    width: 50rem;
    height: 28rem;
    display: flex;
    flex-direction: column;
    background-color: $module-bg-lighter !important;

    .sponsor {
      flex-grow: 1;
      display: flex;
      flex-direction: column;

      .tabs {
        background-color: $module-bg-lighter;
        border-bottom: 1px solid $module-bg-darker-1;
      }

      .provider {
        flex: 1;
      }
    }
  }

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
