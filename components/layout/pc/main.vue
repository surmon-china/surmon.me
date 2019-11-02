<template>
  <div id="app-main">
    <header-view/>
    <client-only>
      <background/>
      <wall-flower v-if="!onPowerSavingMode" />
      <language-psm v-if="isNotServicePage" />
      <wallpaper-switch v-if="isNotServicePage" />
      <theme-switch v-if="isNotServicePage && !onPowerSavingMode" />
      <share-box v-if="isNotServicePage" class="sidebar-share" />
      <tool-box v-if="isNotFullColPage" />
    </client-only>
    <main
      id="main"
      class="main-container"
      :class="{
        'full-view': isFullViewWidth
      }"
    >
      <nav-view v-if="!isThreeColumns" />
      <div
        id="main-content"
        class="main-content"
        :class="{
          'two-column': isTwoColumns,
          'three-column': isThreeColumns,
          'full-view': isFullViewWidth
        }"
      >
        <nuxt :nuxtChildKey="$route.name" keep-alive />
      </div>
      <aside-view key="aside" v-if="!isTwoColumns && !isThreeColumns" />
    </main>
    <client-only>
      <barrage v-if="isMountedBarrage" v-cloak/>
      <transition name="fade">
        <webrtc key="webrtc" v-if="!onPowerSavingMode && onWebrtc" v-cloak/>
      </transition>
      <transition name="fade">
        <wallpaper-wall key="wallpaper-wall" v-if="onWallpaper" v-cloak/>
      </transition>
      <emoji-rain v-if="!onPowerSavingMode" />
    </client-only>
    <footer-view/>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import NavView from './nav'
  import HeaderView from './header'
  import FooterView from './footer'
  import AsideView from './aside/main'
  import Barrage from '~/components/widget/barrage/main'
  import WallFlower from '~/components/widget/wall-flower/garden'
  import WallpaperWall from '~/components/widget/wallpaper/wall'
  import WallpaperSwitch from '~/components/widget/wallpaper/switch'
  import Webrtc from '~/components/widget/webrtc/main'
  import Background from '~/components/widget/background'
  import EmojiRain from '~/components/widget/emoji-rain'
  import LanguagePsm from '~/components/widget/language-psm'
  import ToolBox from '~/components/widget/tool-box'
  import ShareBox from '~/components/widget/share'
  import ThemeSwitch from '~/components/widget/theme'
  import music from '~/services/music'
  import { startTitleEgg, resetTitle } from '~/services/title-egg'
  import { isServiceRoute } from '~/services/route-validator'
  import systemConstants from '~/constants/system'

  export default {
    name: 'pc-main',
    components: {
      ToolBox, ShareBox, LanguagePsm, WallpaperSwitch, ThemeSwitch, // 部件/开关
      Webrtc, EmojiRain, WallFlower, WallpaperWall, Background, Barrage, // 实体
      HeaderView, FooterView, AsideView, NavView, // 布局
    },
    mounted() {
      this.autoEggWhenTabActive()
      this.$store.dispatch('wallpaper/fetchPapers')
      this.$root.$music = music
      this.$root.$music.state.ready || this.$root.$music.initPlayer()
    },
    computed: {
      ...mapState('global', [
        'onWebrtc', 'onWallpaper', 'onPowerSavingMode', 'isMountedBarrage', 'isTwoColumns', 'isThreeColumns'
      ]),
      isNotServicePage() {
        return !isServiceRoute(this.$route.name)
      },
      isFullViewWidth() {
        return isServiceRoute(this.$route.name)
      },
      isNotFullColPage() {
        return ![
          systemConstants.Route.App,
          systemConstants.Route.Music,
          systemConstants.Route.Service,
        ].includes(this.$route.name)
      }
    },
    methods: {
      autoEggWhenTabActive() {
        document.addEventListener('visibilitychange', event => {
          event.target.hidden || event.target.webkitHidden
            ? startTitleEgg()
            : resetTitle()
        }, false)
      }
    }
  }
</script>

<style lang="scss" scoped>
  #app-main {

    @media screen and (max-width: 1200px) {
      .sidebar-share, #theme {
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
      opacity: .4;

      &:hover {
        opacity: 1;
      }

      &::v-deep > .share-ejector {
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
