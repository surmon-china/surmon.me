<template>
  <div id="app-mobile">
    <div id="app-aside" :class="sidebarOpenClass">
      <aside-view :class="sidebarOpenClass" />
    </div>
    <div id="app-main" :class="sidebarOpenClass">
      <div
        class="close-mask"
        v-if="onMobileSidebar"
        @click="closeMobileSidebar"
      />
      <header-view />
      <emoji-rain v-if="!onPowerSavingMode" />
      <main class="main-container">
        <div id="main-content" class="main-content">
          <nuxt :nuxtChildKey="$route.name" keep-alive />
        </div>
      </main>
      <footer-view />
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import HeaderView from './header'
  import FooterView from './footer'
  import AsideView from './aside'
  import EmojiRain from '~/components/widget/emoji-rain'
  export default {
    name: 'mobile-app',
    components: {
      HeaderView,
      FooterView,
      AsideView,
      EmojiRain
    },
    computed: {
      ...mapState('global', ['onMobileSidebar', 'onPowerSavingMode']),
      sidebarOpenClass() {
        return { open: this.onMobileSidebar }
      },
    },
    methods: {
      closeMobileSidebar() {
        if (this.onMobileSidebar) {
          this.$store.commit('global/updateMobileSidebarOnState', false)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  #app-mobile {
    color: $text;
    $aside-width: 68%;

    #app-aside {
      width: $aside-width;
      position: fixed;
      top: 0;
      left: 0;
      height: 100%;
      z-index: 9999;
      transform: translate3d(-100%, 0 ,0);
      transition: $mobile-aisde-transition;
      background-color: $mobile-aside-bg;

      &.open {
        overflow: hidden;
        transform: translate3d(0, 0 ,0);
        transition: $mobile-aisde-transition;
        -webkit-overflow-scrolling: touch;
      }
    }

    #app-main {
      transition: $mobile-aisde-transition;

      .close-mask {
        position: fixed;
        width: 100%;
        height: 100%;
        right: 0;
        bottom: 0;
        z-index: 99999;
        background-color: $module-bg-opacity-5;
      }

      &.open {
        transition: $mobile-aisde-transition;
        transform: translate3d($aside-width, 0 ,0);
      }

      .main-container {
        position: relative;
        width: 100%;

        .main-content {
          position: relative;
          overflow: hidden;
          width: 100%;
          margin: 0;
          padding: ($mobile-header-height + $lg-gap) $gap $gap;
          transition: width .35s;
        }
      }
    }
  }
</style>
