<template>
  <div id="app" :class="theme" v-cloak>
    <div id="app-tools">
      <input type="text" v-model="clipboardText" class="clipboard-input" ref="clipboard" />
    </div>
    <div id="app-aside" v-if="mobileLayout" :class="mobileSidebarOpenClass">
      <mobile-aside :class="mobileSidebarOpenClass" />
    </div>
    <div id="app-main" :class="mobileSidebarOpenClass" @click="closeMobileSidebar">

      <!-- header -->
      <header-view v-if="!mobileLayout" />
      <mobile-header v-else />

      <!-- common pc full -->
      <template v-if="!mobileLayout">
        <no-ssr>
          <!-- <cursor-box /> -->
          <background />
          <barrage v-if="barrageMounted" v-cloak />
          <wall-flower-box v-if="!powerSavingMode" />
          <transition name="fade">
            <webrtc v-if="!powerSavingMode && openWebrtc" v-cloak />
          </transition>
        </no-ssr>
        <transition name="fade">
          <wallpaper-wall v-if="openWallpaper" v-cloak />
        </transition>
      </template>

      <!-- pc and mobile -->
      <emojo-rain v-if="!powerSavingMode" />

      <!-- main -->
      <main id="main" :class="{ 'mobile': mobileLayout, [$route.name]: true }">
        <transition name="module">
          <nav-view v-if="!errorColumn && !mobileLayout" keep-alive />
        </transition>
        <div id="main-content" 
             class="main-content" 
             :class="{
               'full-column': fullColumn,
               'error-column': errorColumn,
               'mobile-layout': mobileLayout,
               [$route.name]: true
              }">
          <nuxt />
        </div>
        <transition name="aside">
          <aside-view v-if="!fullColumn && !errorColumn && !mobileLayout" keep-alive />
        </transition>
      </main>

      <!-- common pc -->
      <template v-if="!mobileLayout">
        <theme-view v-if="!powerSavingMode" @theme="setTheme" />
        <share-view class="sidebar-share" v-if="isNotServicePage" />
        <language-psm v-if="isNotServicePage" />
        <wallpaper-switch v-if="isNotServicePage" />
        <tool-box v-if="isNotFullColPage" />
      </template>

      <!-- footer -->
      <footer-view v-if="!mobileLayout" />
      <mobile-footer v-else />
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import eventBus from '~/utils/event-bus'
  import * as utilsLocalStorage from '~/utils/local-storage'
  import { MobileHeader, MobileFooter, MobileAside } from '~/components/mobile'
  import {
    WallpaperSwitch,
    WallpaperWall,
    Background,
    EmojoRain,
    LanguagePsm,
    ToolBox,
    Barrage,
    Webrtc,
    Header,
    Footer,
    Aside,
    // Cursor,
    Share,
    Theme,
    Nav
  } from '~/components/layout'
  export default {
    name: 'app',
    head() {
      return !this.mobileLayout ? {} : {
        bodyAttrs: {
          class: 'mobile'
        }
      }
    },
    data() {
      return {
        theme: 'default',
        clipboardText: ''
      }
    },
    mounted() {
      if (!this.mobileLayout) {
        this.setHistoryTheme()
        this.$store.dispatch('loadWallpapers')
        this.$store.dispatch('loadWallpaperStory')
        this.$store.dispatch('loadMuiscPlayerList')
      }
      // this.watchFullScreen()
      this.watchTabActive()
      this.$root.$eventBus = eventBus
      this.$root.$copyToClipboard = this.copyToClipboard
    },
    components: {
      Webrtc,
      Barrage,
      ToolBox,
      EmojoRain,
      LanguagePsm,
      WallpaperWall,
      WallpaperSwitch,
      Background,
      // // CursorBox: Cursor,
      HeaderView: Header,
      FooterView: Footer,
      AsideView: Aside,
      ShareView: Share,
      ThemeView: Theme,
      NavView: Nav,
      MobileHeader,
      MobileFooter,
      MobileAside
    },
    computed: {
      ...mapState('option', [
        'openWebrtc',
        'openWallpaper',
        'powerSavingMode',
        'barrageMounted',
        'fullColumn',
        'errorColumn',
        'mobileLayout',
        'mobileSidebar'
      ]),
      mobileSidebarOpenClass() {
        return { open: this.mobileSidebar }
      },
      isPcAndNotPsm() {
        return !this.mobileLayout && !this.powerSavingMode
      },
      isNotServicePage() {
        return this.$route.name !== 'service'
      },
      isNotFullColPage() {
        return !['app', 'music', 'service'].includes(this.$route.name)
      }
    },
    methods: {
      setHistoryTheme() {
        const historyTheme = utilsLocalStorage.get('theme')
        const theme = historyTheme || this.theme
        this.setTheme(theme)
      },
      setTheme(theme) {
        this.theme = theme
        utilsLocalStorage.set('theme', theme)
      },
      copyToClipboard(text) {
        this.clipboardText = text
        // 维护中间量用于给拦截器做标识
        window.clickCopy = true
        setTimeout(() => {
          this.$refs.clipboard.select()
          document.execCommand('Copy')
          window.clickCopy = false
        })
      },
      closeMobileSidebar() {
        if (this.mobileLayout) {
          this.$store.commit('option/SET_MOBILE_SIDEBAR', false)
        }
      },
      watchTabActive() {
        let reallyDocumentTitle
        document.addEventListener('visibilitychange', event => {
          if (event.target.hidden || event.target.webkitHidden) {
            reallyDocumentTitle = document.title
            document.title = '皮皮虾，快回来！'
          } else {
            document.title = reallyDocumentTitle
          }
        }, false)
      },
      watchFullScreen() {
        const fullscreenchange = event => {
          // console.log('fullscreenchange', event)
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
  #app {
    color: $text;

    &[v-cloak] {
      color: transparent;
      -webkit-text-fill-color: transparent;
    }

    #app-tools {
      height: 0px;
      opacity: 0;
    }

    #app-aside {
      width: 68%;
      position: fixed;
      top: 0;
      left: 0;
      height: 100%;
      z-index: 9999;
      transform: translateX(-100%);
      transition: $mobile-aisde-transition;
      background-color: $mobile-aside-bg;

      &.open {
        overflow: hidden;
        transform: translateX(0);
        transition: $mobile-aisde-transition;
        -webkit-overflow-scrolling: touch;
      }
    }

    #app-main {
      transition: $mobile-aisde-transition;

      &.open {
        transition: $mobile-aisde-transition;
        transform: translateX(68%);
      }

      main {
        position: relative;

        &.service {
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

          &.mobile-layout {
            width: 100%;
            margin: 0;
            padding: 1rem;
            padding-top: $navbar-height + 1;
          }

          &.service {
            width: 100%;
            margin: -1em 0;

            &.mobile-layout {
              margin: 0;
            }
          }
        }
      }
    }
  }
</style>
