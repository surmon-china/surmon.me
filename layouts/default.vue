<template>
  <div id="app">
    <div id="app-aside" v-if="mobileLayout" :class="{ open: mobileSidebar }">
      <mobile-aside :class="{ open: mobileSidebar }"></mobile-aside>
    </div>
    <div id="app-main" :class="{ open: mobileSidebar }" @click="closeMobileSidebar">
      <background v-if="!mobileLayout"></background>
      <header-view v-if="!mobileLayout"></header-view>
      <mobile-header v-if="mobileLayout"></mobile-header>
      <main id="main" :class="{ 'mobile': mobileLayout }">
        <transition name="module">
          <keep-alive>
            <nav-view v-if="!errorColumn && !mobileLayout"></nav-view>
          </keep-alive>
        </transition>
        <div class="main-content" 
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
      <tool-view v-if="!mobileLayout"></tool-view>
      <share-view class="sidebar-share" v-if="!mobileLayout"></share-view>
      <footer-view v-if="!mobileLayout"></footer-view>
      <mobile-footer v-if="mobileLayout"></mobile-footer>
    </div>
  </div>
</template>

<script>
  import { Background, Header, Footer, Aside, Share, Tool, Nav } from '~components/layout'
  import { MobileHeader, MobileFooter, MobileAside } from '~components/mobile'
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
      if (!this.mobileLayout) {
        this.$store.dispatch('loadMuiscPlayerList')
      }
      if (process.env.NODE_ENV === 'production') {
        console.clear()
        console.log("%cTalk is cheap. Show me the code %csurmon@foxmail.com", "color:#666;font-size:3em;","color:#666;font-size:13px;")
      }
    },
    components: {
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
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/sass/mixins';
  @import '~assets/sass/variables';

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

    main {
      position: relative;

      .main-content {
        float: left;
        width: 42.5em;
        margin: 0 0 0 12.5em;
        position: relative;
        overflow: hidden;
        @include css3-prefix(transition, width .35s);

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
  
</style>