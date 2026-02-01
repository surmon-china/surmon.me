<script lang="ts" setup>
  import { onMounted } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { useSponsorState } from '/@/components/desktop/widgets/sponsor/state'
  import { useGitHubSponsorsStore } from '/@/stores/sponsors'
  import { useWallpaperStore } from '/@/stores/wallpaper'
  import { resolvePageLayout } from '/@/constants/page-layout'
  import { isDev } from '/@/configs/app.env'
  import logger from '/@/utils/logger'
  import { MAIN_ELEMENT_ID, MAIN_CONTENT_ELEMENT_ID } from '/@/constants/element-anchor'
  import MusicPlayerEntry from '/@/components/desktop/widgets/music-player/index.vue'
  import Wallflower from '/@/components/desktop/widgets/wallflower/garden.vue'
  import Wallpaper from '/@/components/desktop/widgets/wallpaper/switcher.vue'
  import Background from '/@/components/desktop/widgets/background.vue'
  import EmojiRain from '/@/components/desktop/widgets/emoji-rain.vue'
  import SponsorTabs from '/@/components/desktop/widgets/sponsor/tabs.vue'
  import SponsorProvider from '/@/components/desktop/widgets/sponsor/provider.vue'
  import Share from '/@/components/common/shares.vue'
  import Toolbox from '/@/components/desktop/widgets/toolbox.vue'
  import Feedback from '/@/components/desktop/widgets/feedback.vue'
  import Statement from '/@/components/desktop/widgets/statement.vue'
  import SidebarView from './sidebar/index.vue'
  import HeaderView from './header.vue'
  import FooterView from './footer.vue'
  import NavView from './nav.vue'

  const { route, globalState, isCNUser } = useEnhancer()
  const { switcher, pageLayout } = globalState

  const sponsorState = useSponsorState()
  const gitHubSponsorsStore = useGitHubSponsorsStore()
  const wallpaperStore = useWallpaperStore()

  const handlePageTransitionDone = () => {
    globalState.setPageLayout(resolvePageLayout(route.meta.layout))
  }
  const handleSponsorModalClose = () => {
    globalState.toggleSwitcher('sponsor', false)
  }
  const handleFeedbackModalClose = () => {
    globalState.toggleSwitcher('feedback', false)
  }
  const handleStatementModalClose = () => {
    globalState.toggleSwitcher('statement', false)
  }

  onMounted(() => {
    // Bing wallpaper
    wallpaperStore.fetch().catch((error) => {
      logger.failure('bing wallpaper fetch failed!', error)
    })
    // GitHub sponsors
    gitHubSponsorsStore.fetch().catch((error) => {
      logger.failure('GitHub sponsors fetch failed!', error)
    })
  })
</script>

<template>
  <div class="desktop-layout">
    <background />
    <wallflower />
    <emoji-rain />
    <client-only>
      <popup :visible="switcher.sponsor" @close="handleSponsorModalClose">
        <div class="sponsor-modal">
          <div class="sponsor">
            <sponsor-tabs class="tabs" :state="sponsorState" :hide-title="true" />
            <sponsor-provider
              class="provider"
              :state="sponsorState"
              :github-sponsors-data="gitHubSponsorsStore.data"
              :github-sponsors-max-count="9"
            />
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
    <template v-if="!pageLayout.isFull">
      <share class="main-share" disabled-image-share />
      <wallpaper />
      <toolbox />
      <client-only>
        <!-- Music player (163) only for CN users -->
        <music-player-entry v-if="isCNUser || isDev" />
      </client-only>
    </template>
    <!-- Enable header nav bar when full page layout -->
    <header-view :enabled-nav="!pageLayout.isNormal" />
    <main :id="MAIN_ELEMENT_ID" class="main-container" :class="{ 'full-page': pageLayout.isFull }">
      <!-- MARK: keep order > long content > flicker -->
      <nav-view class="nav-view" v-if="pageLayout.isNormal" />
      <sidebar-view class="sidebar-view" v-if="pageLayout.isNormal" />
      <div
        :id="MAIN_CONTENT_ELEMENT_ID"
        class="main-view"
        :class="{
          'layout-normal': pageLayout.isNormal,
          'layout-wide': pageLayout.isWide,
          'layout-full': pageLayout.isFull
        }"
      >
        <!-- unuse suspense -> async route component -> can't extract style to css file -->
        <!-- https://vuejs.org/guide/built-ins/suspense#combining-with-other-components -->
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
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .sponsor-modal {
    width: 39rem;
    height: 23rem;
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

  .desktop-layout {
    padding-top: $header-height + $gap;

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
        $height: 2.2rem;
        width: 2.3rem;
        height: $height;
        line-height: $height;
        font-size: $font-size-h4;
        border-top-right-radius: $radius-xs;
        border-bottom-right-radius: $radius-xs;
        transition: width $motion-duration-fast;
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
        margin-right: $gap;
      }

      .sidebar-view {
        order: 3;
        flex-shrink: 0;
        margin-left: $gap;
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
          margin: -$gap 0;
        }
      }
    }

    .footer-view {
      margin-top: $gap;
    }
  }
</style>
