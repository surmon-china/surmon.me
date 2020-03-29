<template>
  <div id="app-main">
    <client-only>
      <figure class="widget">
        <background />
        <wallflower />
        <barrage />
        <wallpaper-switch v-if="!isFullViewWidth" />
        <theme-switch v-if="!isFullViewWidth" />
        <language v-if="!isFullViewWidth" />
        <tool-box v-if="isNotFullColPage" />
        <share-box v-if="!isFullViewWidth" class="sidebar-share" />
        <transition name="fade">
          <MyMap v-if="onMyMap" key="my-map" />
        </transition>
        <transition name="fade">
          <wallpaper-wall v-if="onWallpaper" key="wallpaper-wall" />
        </transition>
      </figure>
    </client-only>
    <header-view />
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
        <nuxt :nuxt-child-key="$route.name" />
      </div>
      <aside-view v-if="!isTwoColumns && !isThreeColumns" key="aside" />
    </main>
    <footer-view />
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { isBrowser } from '~/environment'
  import NavView from './nav'
  import HeaderView from './header'
  import FooterView from './footer'
  import AsideView from './aside/main'
  import Barrage from '~/components/widget/barrage/main'
  import Wallflower from '~/components/widget/wallflower/garden'
  import WallpaperWall from '~/components/widget/wallpaper/wall'
  import WallpaperSwitch from '~/components/widget/wallpaper/switch'
  import MyMap from '~/components/widget/my-map'
  import Background from '~/components/widget/background'
  import Language from '~/components/widget/language'
  import ToolBox from '~/components/widget/toolbox'
  import ShareBox from '~/components/widget/share'
  import ThemeSwitch from '~/components/widget/theme'
  import musicPlayer from '~/services/music-player'
  import { startTitleEgg, resetTitle } from '~/services/title-egg'
  import { isServiceRoute } from '~/services/route-validator'
  import systemConstants from '~/constants/system'

  export default {
    name: 'PcMain',
    components: {
      // 部件/开关
      ToolBox,
      ShareBox,
      Language,
      WallpaperSwitch,
      ThemeSwitch,
      // 实体
      MyMap,
      Wallflower,
      WallpaperWall,
      Background,
      Barrage,
      // 布局
      HeaderView,
      FooterView,
      AsideView,
      NavView
    },
    computed: {
      ...mapState('global', [
        'onMyMap',
        'onWallpaper',
        'isTwoColumns',
        'isThreeColumns'
      ]),
      isEnLang() {
        return this.$store.getters['global/isEnLang']
      },
      isFullViewWidth() {
        return isServiceRoute(this.$route.name)
      },
      isNotFullColPage() {
        return ![
          systemConstants.Route.App,
          systemConstants.Route.Music,
          systemConstants.Route.Service
        ].includes(this.$route.name)
      }
    },
    methods: {
      autoEggWhenTabActive() {
        document.addEventListener(
          'visibilitychange',
          event => {
            event.target.hidden || event.target.webkitHidden
              ? startTitleEgg()
              : resetTitle()
          },
          false
        )
      }
    },
    watch: {
      isEnLang: {
        immediate: true,
        handler(isEnLang) {
          this.$store.dispatch('wallpaper/fetchPapers', isEnLang)
        }
      }
    },
    mounted() {
      if (isBrowser) {
        this.autoEggWhenTabActive()
        this.$store.commit('global/resetTheme')
        this.$root.$musicPlayer = musicPlayer
        musicPlayer.ready || musicPlayer.init()
      }
    }
  }
</script>

<style lang="scss" scoped>
  #app-main {
    padding-top: $mobile-header-height + $lg-gap;

    @media screen and (max-width: 1200px) {
      #theme,
      #language,
      .sidebar-share {
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
      opacity: 0.4;

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
