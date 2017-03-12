<template>
  <div id="app">
    <background v-if="!mobileLayout"></background>
    <header-view v-if="!mobileLayout"></header-view>
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
    <tool-view></tool-view>
    <share-view class="sidebar-share" v-if="!mobileLayout"></share-view>
    <footer-view></footer-view>
  </div>
</template>

<script>
  import { Background, Header, Footer, Aside, Share, Tool, Nav } from '~components/layout'
  export default {
    name: 'app',
    head() {
      return !this.mobileLayout ? {} : {
        bodyAttrs: {
          class: 'mobile' 
        }
      }
    },
    components: {
      Background,
      HeaderView: Header,
      FooterView: Footer,
      AsideView: Aside,
      ShareView: Share,
      ToolView: Tool,
      NavView: Nav
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
      }
    },
    mounted() {
      console.log(this)
      if (process.env.NODE_ENV === 'production') {
        console.clear()
        console.log("%cTalk is cheap. Show me the code %csurmon@foxmail.com", "color:#666;font-size:3em;","color:#666;font-size:13px;")
      }
    }
  }
</script>

<style lang="scss">
  @import '~assets/sass/mixins';
  @import '~assets/sass/variables';
  main {
    position: relative;

    .main-content {
      float: left;
      width: 42.5em;
      margin: 0 0 0 12.5em;
      position: relative;
      overflow: hidden;
      @include css3-prefix(transition, width .35s);

      &.mobile-layout {
        width: 100%;
        margin: 0;
        padding: 1rem;
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
    }
  }
</style>