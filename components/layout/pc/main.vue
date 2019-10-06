<template>
  <div id="app-main">
    <header-view/>
    <client-only>
      <background/>
      <wall-flower v-if="!onPowerSavingMode" />
      <language-psm v-if="isNotServicePage" />
      <wallpaper-switch v-if="isNotServicePage" />
      <theme-switch v-if="!onPowerSavingMode && isNotServicePage" />
      <share-box v-if="isNotServicePage" class="sidebar" />
      <tool-box v-if="isNotFullColPage" />
    </client-only>
    <main id="main" :class="{ 'full-view': isFullViewWidth }">
      <transition name="module">
        <nav-view v-if="!isThreeColumns" />
      </transition>
      <div
        id="main-content"
        class="main-content"
        :class="{ 'full-column': isTwoColumns, 'error-column': isThreeColumns, 'full-view': isFullViewWidth }"
      >
        <nuxt :nuxtChildKey="$route.name" keep-alive />
      </div>
      <transition name="aside">
        <aside-view key="aside" v-if="!isTwoColumns && !isThreeColumns" />
      </transition>
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
      // const isHidden = document.hidden || document.webkitHidden || document.mozHidden
      // this.startAllEgg(isHidden)
      // this.watchFullScreen()
      this.watchTabActive()
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
      startAllEgg(isHidden) {
        if (isHidden) {
          startTitleEgg()
        } else {
          resetTitle()
        }
      },
      watchTabActive() {
        document.addEventListener('visibilitychange', event => {
          const isHidden = event.target.hidden || event.target.webkitHidden
          this.startAllEgg(isHidden)
        }, false)
      },
      watchFullScreen() {
        const fullscreenchange = event => {
          console.log('fullscreenchange', event)
        }
        document.addEventListener("fullscreenchange", fullscreenchange, false)
        document.addEventListener("mozfullscreenchange", fullscreenchange, false)
        document.addEventListener("webkitfullscreenchange", fullscreenchange, false)
        document.addEventListener("msfullscreenchange", fullscreenchange, false)
      }
    }
  }
</script>

<style lang="scss" scoped>
  #app-main {

    main {
      position: relative;

      &.full-view {
        width: 100%;
      }

      .main-content {
        float: left;
        width: 42.5em;
        margin: 0 0 0 12.5em;
        position: relative;
        overflow: hidden;
        @include css3-prefix(transition, width .35s);

        &:-moz-full-screen {
          overflow-y: auto;
        }
          
        &:-webkit-full-screen {
          overflow-y: auto;
        }
          
        &:fullscreen {
          overflow-y: auto;
        }

        &.full-column {
          width: 62.5em;
          @include css3-prefix(transition, width .35s);
        }

        &.error-column {
          width: 100%;
          margin: 0;
          @include css3-prefix(transition, width .35s);
        }

        &.full-view {
          width: 100%;
          margin: -1em 0;
        }
      }
    }
  }
</style>
