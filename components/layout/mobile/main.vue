<template>
  <div id="app-mobile">
    <div id="app-aside" :class="onMobileSidebarOpenClass">
      <aside-view :class="onMobileSidebarOpenClass" />
    </div>
    <div id="app-main" :class="onMobileSidebarOpenClass" ref="appMain">
      <header-view />
      <emoji-rain v-if="!onPowerSavingMode" />
      <main id="main">
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
      onMobileSidebarOpenClass() {
        return { open: this.onMobileSidebar }
      },
    },
    methods: {
      closeMobileSidebar(event) {
        if (this.onMobileSidebar) {
          this.$store.commit('global/updateMobileSidebarOnState', false)
          event.cancelBubble = true
          event.stopPropagation()
          event.preventDefault()
          return false
        }
      }
    },
    mounted() {
      this.$refs.appMain.addEventListener('click', this.closeMobileSidebar, true)
    },
  }
</script>

<style lang="scss" scoped>
  #app-mobile {
    color: $text;

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
        width: 100%;

        .main-content {
          position: relative;
          overflow: hidden;
          width: 100%;
          margin: 0;
          padding: $navbar-height + 1em 1rem 1rem;
          @include css3-prefix(transition, width .35s);
        }
      }
    }
  }
</style>
