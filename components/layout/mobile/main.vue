<template>
  <div id="app-mobile">
    <div id="app-aside" :class="asideOpenClass">
      <aside-view :open="onMobileSidebar" />
    </div>
    <div id="app-main" :class="asideOpenClass">
      <div
        v-if="onMobileSidebar"
        class="close-mask"
        @click="closeMobileSidebar"
      />
      <header-view />
      <main class="main-container">
        <div id="main-content" class="main-content">
          <nuxt :nuxt-child-key="$route.name" />
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
  export default {
    name: 'MobileApp',
    components: {
      HeaderView,
      FooterView,
      AsideView
    },
    computed: {
      ...mapState('global', ['onMobileSidebar']),
      asideOpenClass() {
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
    background-color: $module-hover-bg;
    $aside-width: 68%;

    #app-aside {
      width: $aside-width;
      position: fixed;
      top: 0;
      left: 0;
      height: 100%;
      background-color: $mobile-aside-bg;
      transform: translate3d(-100%, 0 ,0);
      transition: $mobile-aisde-transition;

      &.open {
        overflow: hidden;
        transform: translate3d(0, 0 ,0);
        -webkit-overflow-scrolling: touch;
      }
    }

    #app-main {
      transition: $mobile-aisde-transition;

      &.open {
        transform: translate3d($aside-width, 0 ,0);
      }

      .close-mask {
        position: fixed;
        width: 100%;
        height: 100%;
        right: 0;
        bottom: 0;
        z-index: $z-index-top;
        background-color: $module-bg-opacity-5;
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
