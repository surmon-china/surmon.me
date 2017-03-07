<template>
  <div id="app">
    <background></background>
    <header-view></header-view>
    <main id="main">
      <transition name="module">
        <keep-alive>
          <nav-view v-if="!errorColumn"></nav-view>
        </keep-alive>
      </transition>
      <div class="main-content" :class="{ 'full-column': fullColumn, 'error-column': errorColumn }">
        <keep-alive>
          <nuxt></nuxt>
        </keep-alive>
      </div>
      <transition name="aside">
        <keep-alive>
          <aside-view v-if="!fullColumn && !errorColumn"></aside-view>
        </keep-alive>
      </transition>
    </main>
    <tool-view></tool-view>
    <share-view class="sidebar-share"></share-view>
    <footer-view></footer-view>
  </div>
</template>

<script>
  import { Background, Header, Footer, Aside, Share, Tool, Nav } from '~components/layout'
  export default {
    name: 'app',
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
      }
    },
    mounted() {
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