<template>
  <div id="app" v-cloak>
    <div id="app-aside" v-if="mobileLayout" :class="{ open: mobileSidebar }">
      <mobile-aside :class="{ open: mobileSidebar }"></mobile-aside>
    </div>
    <div id="app-main" :class="{ open: mobileSidebar }" @click="closeMobileSidebar">
      <canvas class="global-emoji" 
              ref="emoji"
              :class="{ active: emoji233333 && emoji233333.kichikuing }">
      </canvas>
      <background v-if="!mobileLayout"></background>
      <barrage v-if="!mobileLayout" v-cloak></barrage>
      <transition name="fade">
        <webrtc v-if="!mobileLayout && openWebrtc" v-cloak></webrtc>
      </transition>
      <header-view v-if="!mobileLayout"></header-view>
      <mobile-header v-if="mobileLayout"></mobile-header>
      <main id="main" :class="{ 'mobile': mobileLayout }">
        <transition name="module">
          <keep-alive>
            <nav-view v-if="!errorColumn && !mobileLayout"></nav-view>
          </keep-alive>
        </transition>
        <div id="main-content" 
             class="main-content" 
             :class="{ 
               'full-column': fullColumn, 
               'error-column': errorColumn,
               'mobile-layout': mobileLayout
              }">
          <keep-alive>
            <nuxt></nuxt>
          </keep-alive>
        </div>
        <transition name="aside">
          <keep-alive>
            <aside-view v-if="!fullColumn && !errorColumn && !mobileLayout"></aside-view>
          </keep-alive>
        </transition>
      </main>
      <tool-view v-if="!mobileLayout && !Object.is($route.name, 'music')"></tool-view>
      <share-view class="sidebar-share" v-if="!mobileLayout"></share-view>
      <footer-view v-if="!mobileLayout"></footer-view>
      <mobile-footer v-else></mobile-footer>
    </div>
  </div>
</template>

<script>
  import { Background, Barrage, Webrtc, Header, Footer, Aside, Share, Tool, Nav } from '~/components/layout'
  import { MobileHeader, MobileFooter, MobileAside } from '~/components/mobile'
  import EventBus from '~/utils/event-bus'
  export default {
    name: 'app',
    head() {
      return !this.mobileLayout ? {} : {
        bodyAttrs: {
          class: 'mobile' 
        }
      }
    },
    mounted() {
      this.watchTabActive()
      // this.watchFullScreen()
      if (!this.mobileLayout) {
        this.$store.dispatch('loadMuiscPlayerList')
      }
      if (process.browser) {
        const emojiBase = this.$refs.emoji
        emojiBase.width = document.documentElement.clientWidth || document.body.clientWidth
        emojiBase.height = document.documentElement.clientHeight || document.body.clientHeight
        const emoji233333 = new window.Emoji233333({
          base: emojiBase,
          scale: 0.7,
          speed: 12,
          increaseSpeed: 0.4,
          density: 5,
          staggered: true
        })
        EventBus.emoji233333 = emoji233333
        this.$root.$EventBus = EventBus
      }
      if (process.env.NODE_ENV === 'production') {
        console.clear()
        console.log("%cTalk is cheap. Show me the code %csurmon@foxmail.com", "color:#666;font-size:3em;","color:#666;font-size:13px;")
      }
    },
    components: {
      Webrtc,
      Barrage,
      Background,
      HeaderView: Header,
      FooterView: Footer,
      AsideView: Aside,
      ShareView: Share,
      ToolView: Tool,
      NavView: Nav,
      MobileHeader,
      MobileFooter,
      MobileAside
    },
    computed: {
      openWebrtc() {
        return this.$store.state.option.openWebrtc
      },
      emoji233333() {
        return EventBus.emoji233333
      },
      fullColumn () {
        return this.$store.state.option.fullColumn
      },
      errorColumn () {
        return this.$store.state.option.errorColumn
      },
      mobileLayout() {
        return this.$store.state.option.mobileLayout
      },
      mobileSidebar() {
        return this.$store.state.option.mobileSidebar
      }
    },
    methods: {
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
  @import '~assets/sass/mixins';
  @import '~assets/sass/variables';
  #app {

    &[v-cloak] {
      color: transparent;
      -webkit-text-fill-color: transparent;
    }

    #app-aside {
      width: 68%;
      position: fixed;
      top: 0;
      left: 0;
      height: 100%;
      z-index: 9999;
      background-color: $mobile-aside-bg;
      transform: translateX(-100%);
      transition: $mobile-aisde-transition;

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

      > .global-emoji {
        position: fixed;
        z-index: -1;
        top: 0;
        left: 0;

        &.active {
          z-index: 99999;
        }
      }

      main {
        position: relative;

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
        }
      }
    }
  }
</style>